
-- Add file attachment columns to messages
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS file_url text DEFAULT NULL;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS file_name text DEFAULT NULL;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS file_type text DEFAULT NULL;

-- Create storage bucket for channel files
INSERT INTO storage.buckets (id, name, public) VALUES ('channel-files', 'channel-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to channel-files bucket
CREATE POLICY "Authenticated users upload channel files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'channel-files');

-- Allow authenticated users to view channel files
CREATE POLICY "Authenticated users view channel files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'channel-files');

-- Allow users to delete their own uploads
CREATE POLICY "Users delete own channel files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'channel-files' AND (storage.foldername(name))[1] = auth.uid()::text);
