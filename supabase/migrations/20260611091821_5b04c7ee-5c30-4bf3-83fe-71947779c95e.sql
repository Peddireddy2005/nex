
-- task-attachments INSERT: must be creator or assignee of the task in folder[1]
DROP POLICY IF EXISTS "Authenticated upload task attachments" ON storage.objects;
CREATE POLICY "Authenticated upload task attachments"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'task-attachments'
  AND EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id::text = (storage.foldername(name))[1]
      AND (
        t.created_by = auth.uid()
        OR t.assigned_to = auth.uid()
        OR EXISTS (SELECT 1 FROM public.task_assignees ta WHERE ta.task_id = t.id AND ta.user_id = auth.uid())
        OR public.has_role(auth.uid(), 'admin'::app_role)
      )
  )
);

-- task-files INSERT: same task-membership check
DROP POLICY IF EXISTS "Authenticated upload task files" ON storage.objects;
CREATE POLICY "Authenticated upload task files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'task-files'
  AND EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id::text = (storage.foldername(name))[1]
      AND (
        t.created_by = auth.uid()
        OR t.assigned_to = auth.uid()
        OR EXISTS (SELECT 1 FROM public.task_assignees ta WHERE ta.task_id = t.id AND ta.user_id = auth.uid())
        OR public.has_role(auth.uid(), 'admin'::app_role)
      )
  )
);
