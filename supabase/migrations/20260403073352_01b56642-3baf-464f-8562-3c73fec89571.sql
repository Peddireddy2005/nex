
CREATE POLICY "Admins delete ratings" ON performance_ratings FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.task_completion_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL,
  task_title text NOT NULL,
  task_description text,
  task_priority text NOT NULL DEFAULT 'medium',
  user_id uuid NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  was_group_task boolean NOT NULL DEFAULT false,
  group_members uuid[] DEFAULT '{}'
);

ALTER TABLE public.task_completion_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View task history" ON task_completion_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "Insert task history" ON task_completion_history FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR auth.uid() = user_id
);
