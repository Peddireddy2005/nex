
-- Add edited_at column to messages
ALTER TABLE public.messages ADD COLUMN edited_at timestamp with time zone DEFAULT NULL;

-- Add reply_to column for reply feature
ALTER TABLE public.messages ADD COLUMN reply_to uuid REFERENCES public.messages(id) ON DELETE SET NULL DEFAULT NULL;

-- Allow users to update their own messages
CREATE POLICY "Update own messages" ON public.messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own messages, admins can delete any
CREATE POLICY "Delete own messages" ON public.messages FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Drop the old insert policy first then recreate to allow admin to add others
DROP POLICY IF EXISTS "Join channels" ON public.channel_members;
CREATE POLICY "Join or admin add channel members" ON public.channel_members FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR auth.uid() = user_id);

-- Drop old delete policy then recreate
DROP POLICY IF EXISTS "Leave channels" ON public.channel_members;
CREATE POLICY "Leave or admin remove channel members" ON public.channel_members FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));
