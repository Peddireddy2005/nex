
-- 1. Profiles: restrict phone & employee_id columns
REVOKE SELECT (phone, employee_id) ON public.profiles FROM authenticated;
REVOKE SELECT (phone, employee_id) ON public.profiles FROM anon;

CREATE OR REPLACE FUNCTION public.get_member_contact(p_user_id uuid)
RETURNS TABLE(phone text, employee_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.phone, p.employee_id
  FROM public.profiles p
  WHERE p.id = p_user_id
    AND (
      auth.uid() = p_user_id
      OR public.has_role(auth.uid(), 'admin'::app_role)
      OR public.has_role(auth.uid(), 'manager'::app_role)
    )
$$;

REVOKE EXECUTE ON FUNCTION public.get_member_contact(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_member_contact(uuid) TO authenticated;

-- 2. Notifications: restrict INSERT — self or admin only
DROP POLICY IF EXISTS "Authenticated create notifications" ON public.notifications;
CREATE POLICY "Users insert own notifications or admins insert any"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- 3. Storage: task-attachments INSERT requires folder = auth.uid()
DROP POLICY IF EXISTS "Authenticated upload task attachments" ON storage.objects;
CREATE POLICY "Authenticated upload task attachments"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'task-attachments'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. Storage: task-files INSERT requires folder = auth.uid(); SELECT requires authenticated
DROP POLICY IF EXISTS "Authenticated upload task files" ON storage.objects;
CREATE POLICY "Authenticated upload task files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'task-files'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "Public read task files" ON storage.objects;
CREATE POLICY "Authenticated read task files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'task-files');

DROP POLICY IF EXISTS "Public view task attachments" ON storage.objects;
CREATE POLICY "Authenticated view task attachments"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'task-attachments');

-- 5. Add fixed search_path to helpers
CREATE OR REPLACE FUNCTION public.protect_employee_id()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  IF OLD.employee_id IS NOT NULL AND NEW.employee_id IS DISTINCT FROM OLD.employee_id THEN
    RAISE EXCEPTION 'employee_id cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_user_handle()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  IF NEW.user_handle IS NOT NULL THEN
    NEW.user_handle := lower(NEW.user_handle);
    IF NEW.user_handle !~ '^[a-z0-9_-]{3,30}$' THEN
      RAISE EXCEPTION 'Handle must be 3-30 chars, lowercase a-z, 0-9, _ or -';
    END IF;
  END IF;
  RETURN NEW;
END $function$;

-- 6. Revoke EXECUTE on SECURITY DEFINER helpers from anon
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_employee_id() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.assign_employee_id() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_comment_mentions() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_task_changes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.recalculate_project_progress() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_project_activity() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.run_task_automations() FROM anon, authenticated, PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
