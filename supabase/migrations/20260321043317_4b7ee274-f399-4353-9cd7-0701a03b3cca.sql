
-- Message reactions table
CREATE TABLE public.message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

ALTER TABLE public.message_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View reactions in accessible channels" ON public.message_reactions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.messages m
    JOIN public.channel_members cm ON cm.channel_id = m.channel_id
    WHERE m.id = message_reactions.message_id AND cm.user_id = auth.uid()
  ));

CREATE POLICY "Add reactions" ON public.message_reactions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Remove own reactions" ON public.message_reactions
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Allow admins to update channels (for description/settings)
CREATE POLICY "Admins update channels" ON public.channels
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete channels
CREATE POLICY "Admins delete channels" ON public.channels
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for reactions
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reactions;
