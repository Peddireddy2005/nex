
-- 1) Track last fire time on rules
ALTER TABLE public.automation_rules
  ADD COLUMN IF NOT EXISTS last_triggered_at TIMESTAMPTZ;

-- 2) Task attachments table
CREATE TABLE IF NOT EXISTS public.task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.task_attachments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "View task attachments" ON public.task_attachments;
CREATE POLICY "View task attachments" ON public.task_attachments
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Upload task attachments" ON public.task_attachments;
CREATE POLICY "Upload task attachments" ON public.task_attachments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);

DROP POLICY IF EXISTS "Delete own task attachments" ON public.task_attachments;
CREATE POLICY "Delete own task attachments" ON public.task_attachments
  FOR DELETE TO authenticated USING (
    auth.uid() = uploaded_by OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 3) Storage bucket for task files
INSERT INTO storage.buckets (id, name, public)
VALUES ('task-files', 'task-files', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read task files" ON storage.objects;
CREATE POLICY "Public read task files" ON storage.objects
  FOR SELECT USING (bucket_id = 'task-files');

DROP POLICY IF EXISTS "Authenticated upload task files" ON storage.objects;
CREATE POLICY "Authenticated upload task files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'task-files');

DROP POLICY IF EXISTS "Owner delete task files" ON storage.objects;
CREATE POLICY "Owner delete task files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'task-files' AND owner = auth.uid());

-- 4) Notification trigger on task INSERT/UPDATE: assignment + status change + deadline-soon
CREATE OR REPLACE FUNCTION public.notify_task_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  task_link TEXT;
BEGIN
  task_link := '/projects/' || COALESCE(NEW.project_id::text, '') || '?task=' || NEW.id::text;

  -- Assignment notification (insert with assignee, OR change of assignee)
  IF (TG_OP = 'INSERT' AND NEW.assigned_to IS NOT NULL AND NEW.assigned_to <> NEW.created_by) THEN
    INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
    VALUES (NEW.assigned_to, 'New task assigned', NEW.title, 'task_assigned', 'task', NEW.id, task_link);
  ELSIF (TG_OP = 'UPDATE' AND NEW.assigned_to IS DISTINCT FROM OLD.assigned_to AND NEW.assigned_to IS NOT NULL) THEN
    INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
    VALUES (NEW.assigned_to, 'Task assigned to you', NEW.title, 'task_assigned', 'task', NEW.id, task_link);
  END IF;

  -- Status change notification (assignee + creator if different from actor)
  IF (TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status) THEN
    IF NEW.assigned_to IS NOT NULL AND NEW.assigned_to <> COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid) THEN
      INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
      VALUES (NEW.assigned_to, 'Task status updated',
              NEW.title || ' → ' || NEW.status::text,
              'task_status', 'task', NEW.id, task_link);
    END IF;
    IF NEW.created_by <> COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid)
       AND NEW.created_by <> COALESCE(NEW.assigned_to, '00000000-0000-0000-0000-000000000000'::uuid) THEN
      INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
      VALUES (NEW.created_by, 'Task status updated',
              NEW.title || ' → ' || NEW.status::text,
              'task_status', 'task', NEW.id, task_link);
    END IF;
  END IF;

  -- Deadline approaching (within 24h) — fire on update when deadline first becomes near
  IF NEW.deadline IS NOT NULL
     AND NEW.assigned_to IS NOT NULL
     AND NEW.status <> 'completed'
     AND NEW.deadline <= now() + INTERVAL '24 hours'
     AND NEW.deadline > now()
     AND (TG_OP = 'INSERT' OR OLD.deadline IS DISTINCT FROM NEW.deadline OR OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
    VALUES (NEW.assigned_to, 'Deadline approaching',
            NEW.title || ' is due within 24 hours',
            'deadline_soon', 'task', NEW.id, task_link);
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_task_changes ON public.tasks;
CREATE TRIGGER trg_notify_task_changes
  AFTER INSERT OR UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.notify_task_changes();

-- 5) @mention notifications from task_comments
CREATE OR REPLACE FUNCTION public.notify_comment_mentions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  m TEXT;
  mentioned_user UUID;
  task_row RECORD;
  link TEXT;
BEGIN
  SELECT id, title, project_id INTO task_row FROM public.tasks WHERE id = NEW.task_id;
  IF NOT FOUND THEN RETURN NEW; END IF;
  link := '/projects/' || COALESCE(task_row.project_id::text, '') || '?task=' || task_row.id::text;

  FOR m IN
    SELECT DISTINCT (regexp_matches(NEW.content, '@([a-zA-Z0-9_\-]{2,40})', 'g'))[1]
  LOOP
    SELECT id INTO mentioned_user FROM public.profiles
      WHERE lower(replace(coalesce(full_name,''), ' ', '_')) = lower(m)
      LIMIT 1;
    IF mentioned_user IS NOT NULL AND mentioned_user <> NEW.user_id THEN
      INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
      VALUES (mentioned_user, 'You were mentioned',
              left(NEW.content, 140), 'mention', 'task', task_row.id, link);
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_comment_mentions ON public.task_comments;
CREATE TRIGGER trg_notify_comment_mentions
  AFTER INSERT ON public.task_comments
  FOR EACH ROW EXECUTE FUNCTION public.notify_comment_mentions();

-- 6) Automation execution engine
CREATE OR REPLACE FUNCTION public.run_task_automations()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rule RECORD;
  act JSONB;
  trigger_match BOOLEAN;
  cfg JSONB;
  link TEXT;
BEGIN
  IF NEW.project_id IS NULL THEN RETURN NEW; END IF;
  link := '/projects/' || NEW.project_id::text || '?task=' || NEW.id::text;

  FOR rule IN
    SELECT * FROM public.automation_rules
    WHERE enabled = true
      AND (trigger_config->>'project_id')::uuid = NEW.project_id
  LOOP
    trigger_match := false;

    IF rule.trigger_type = 'task_created' AND TG_OP = 'INSERT' THEN
      trigger_match := true;
    ELSIF rule.trigger_type = 'task_status_change' AND TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
      trigger_match := true;
    ELSIF rule.trigger_type = 'task_priority_urgent' AND NEW.priority = 'urgent'
          AND (TG_OP = 'INSERT' OR OLD.priority IS DISTINCT FROM NEW.priority) THEN
      trigger_match := true;
    END IF;

    IF NOT trigger_match THEN CONTINUE; END IF;

    -- Execute each action
    FOR act IN SELECT * FROM jsonb_array_elements(rule.actions) LOOP
      cfg := act;
      BEGIN
        IF act->>'type' = 'send_notification' THEN
          INSERT INTO public.notifications (user_id, title, message, type, entity_type, entity_id, link)
          VALUES (
            COALESCE(NEW.assigned_to, NEW.created_by),
            rule.name,
            COALESCE(act->>'config', 'Automation triggered'),
            'automation', 'task', NEW.id, link
          );
        ELSIF act->>'type' = 'change_status' AND TG_OP = 'INSERT' THEN
          -- Only safe on insert to avoid recursion loops
          UPDATE public.tasks SET status = (act->>'config')::task_status WHERE id = NEW.id;
        ELSIF act->>'type' = 'add_comment' THEN
          INSERT INTO public.task_comments (task_id, user_id, content)
          VALUES (NEW.id, NEW.created_by, COALESCE(act->>'config', '[Automation comment]'));
        ELSIF act->>'type' = 'create_task' THEN
          INSERT INTO public.tasks (title, created_by, project_id, status, priority)
          VALUES (COALESCE(act->>'config', 'Follow-up: ' || NEW.title),
                  NEW.created_by, NEW.project_id, 'todo', 'medium');
        END IF;

        INSERT INTO public.automation_logs (rule_id, status, trigger_data, result)
        VALUES (rule.id, 'success',
                jsonb_build_object('task_id', NEW.id, 'op', TG_OP),
                act);
      EXCEPTION WHEN OTHERS THEN
        INSERT INTO public.automation_logs (rule_id, status, trigger_data, error_message)
        VALUES (rule.id, 'error',
                jsonb_build_object('task_id', NEW.id, 'op', TG_OP),
                SQLERRM);
      END;
    END LOOP;

    UPDATE public.automation_rules SET last_triggered_at = now() WHERE id = rule.id;
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_run_task_automations ON public.tasks;
CREATE TRIGGER trg_run_task_automations
  AFTER INSERT OR UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.run_task_automations();
