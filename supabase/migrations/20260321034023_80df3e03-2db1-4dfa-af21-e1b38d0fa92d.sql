
-- Create junction table for multiple task assignees
CREATE TABLE public.task_assignees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(task_id, user_id)
);

ALTER TABLE public.task_assignees ENABLE ROW LEVEL SECURITY;

-- Everyone can view task assignees
CREATE POLICY "View task assignees" ON public.task_assignees FOR SELECT TO authenticated USING (true);

-- Task creator, admins, managers can manage assignees
CREATE POLICY "Manage task assignees" ON public.task_assignees FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_assignees.task_id AND tasks.created_by = auth.uid())
    OR has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'manager'::app_role)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.tasks WHERE tasks.id = task_assignees.task_id AND tasks.created_by = auth.uid())
    OR has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'manager'::app_role)
  );

-- Add encryption_key column to channels for E2E encryption
ALTER TABLE public.channels ADD COLUMN encryption_key text DEFAULT NULL;
