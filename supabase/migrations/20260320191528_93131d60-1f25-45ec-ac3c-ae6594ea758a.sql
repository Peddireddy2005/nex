-- Create storage bucket for task attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('task-attachments', 'task-attachments', true);

-- Storage RLS: authenticated users can upload
CREATE POLICY "Authenticated upload task attachments" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'task-attachments');

-- Storage RLS: anyone can view
CREATE POLICY "Public view task attachments" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'task-attachments');

-- Storage RLS: owner can delete
CREATE POLICY "Owner delete task attachments" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'task-attachments' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Activity logs table
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View activity logs" ON public.activity_logs
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Insert activity logs" ON public.activity_logs
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Enable realtime for activity_logs
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;