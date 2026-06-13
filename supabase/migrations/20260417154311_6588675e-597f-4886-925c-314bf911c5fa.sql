CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  owner_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','on_hold','in_review','completed','cancelled')),
  start_date DATE,
  deadline DATE,
  tags TEXT[] DEFAULT '{}',
  service_types TEXT[] DEFAULT '{}',
  budget NUMERIC,
  progress INTEGER NOT NULL DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "View projects" ON public.projects;
DROP POLICY IF EXISTS "Create projects" ON public.projects;
DROP POLICY IF EXISTS "Update projects" ON public.projects;
DROP POLICY IF EXISTS "Delete projects" ON public.projects;

CREATE POLICY "View projects" ON public.projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Create projects" ON public.projects FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'manager')));
CREATE POLICY "Update projects" ON public.projects FOR UPDATE TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'manager') OR auth.uid() = owner_id);
CREATE POLICY "Delete projects" ON public.projects FOR DELETE TO authenticated
  USING (has_role(auth.uid(),'admin'));

DROP TRIGGER IF EXISTS projects_updated_at ON public.projects;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);

ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "View project members" ON public.project_members;
DROP POLICY IF EXISTS "Manage project members" ON public.project_members;
CREATE POLICY "View project members" ON public.project_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage project members" ON public.project_members FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'manager'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'manager'));

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);

ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'info';
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS entity_id UUID;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS entity_type TEXT;
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read, created_at DESC);

CREATE OR REPLACE FUNCTION public.recalculate_project_progress()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  pid UUID;
  total INTEGER;
  done INTEGER;
BEGIN
  pid := COALESCE(NEW.project_id, OLD.project_id);
  IF pid IS NULL THEN RETURN COALESCE(NEW, OLD); END IF;
  SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'completed')
    INTO total, done FROM public.tasks WHERE project_id = pid AND is_archived = false;
  UPDATE public.projects
    SET progress = CASE WHEN total > 0 THEN ROUND((done::numeric / total::numeric) * 100) ELSE 0 END,
        updated_at = now()
    WHERE id = pid;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS tasks_recalc_project_progress ON public.tasks;
CREATE TRIGGER tasks_recalc_project_progress
  AFTER INSERT OR UPDATE OR DELETE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.recalculate_project_progress();

CREATE OR REPLACE FUNCTION public.log_project_activity()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, metadata)
    VALUES (NEW.created_by, 'project_created', 'project', NEW.id, jsonb_build_object('name', NEW.name));
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, metadata)
    VALUES (COALESCE(auth.uid(), NEW.owner_id), 'project_status_changed', 'project', NEW.id,
            jsonb_build_object('from', OLD.status, 'to', NEW.status));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS projects_activity_log ON public.projects;
CREATE TRIGGER projects_activity_log
  AFTER INSERT OR UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.log_project_activity();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'projects'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.projects';
  END IF;
END $$;