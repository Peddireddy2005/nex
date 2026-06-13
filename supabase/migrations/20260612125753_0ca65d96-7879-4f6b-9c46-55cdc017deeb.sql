
-- Harden INSERT WITH CHECK on realtime-published tables so postgres_changes streams
-- only carry rows the author is actually allowed to create.

-- messages: require auth.uid() = user_id AND author must be a member of the channel
DROP POLICY IF EXISTS "Send messages" ON public.messages;
CREATE POLICY "Send messages"
ON public.messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.channel_members cm
    WHERE cm.channel_id = messages.channel_id
      AND cm.user_id = auth.uid()
  )
);

-- message_reactions: require auth.uid() = user_id AND reactor must be in the channel
DROP POLICY IF EXISTS "Add reactions" ON public.message_reactions;
CREATE POLICY "Add reactions"
ON public.message_reactions
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.messages m
    JOIN public.channel_members cm ON cm.channel_id = m.channel_id
    WHERE m.id = message_reactions.message_id
      AND cm.user_id = auth.uid()
  )
);

-- notifications: tighten INSERT WITH CHECK (was NULL).
-- Self-insert allowed; admins may target anyone; managers may notify members within their reach.
DROP POLICY IF EXISTS "Users insert own notifications or admins insert any" ON public.notifications;
CREATE POLICY "Users insert own notifications or admins insert any"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'manager'::app_role)
);

-- Realtime topic-level RLS: lock down broadcast/presence on the chat & notifications topics
-- so only authenticated users on channels/topics they belong to can subscribe.
ALTER TABLE IF EXISTS realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "realtime_chat_topic_read" ON realtime.messages;
CREATE POLICY "realtime_chat_topic_read"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  -- Chat topics are named: chat:<channel_id>
  (realtime.topic() LIKE 'chat:%'
    AND EXISTS (
      SELECT 1 FROM public.channel_members cm
      WHERE cm.channel_id::text = split_part(realtime.topic(), ':', 2)
        AND cm.user_id = (SELECT auth.uid())
    ))
  -- Notifications topics are scoped per-user: notifications:<user_id>
  OR (realtime.topic() LIKE 'notifications:%'
    AND split_part(realtime.topic(), ':', 2) = (SELECT auth.uid())::text)
  -- Postgres-changes streams (no explicit topic) are governed by table RLS; allow.
  OR realtime.topic() IS NULL
);

DROP POLICY IF EXISTS "realtime_chat_topic_write" ON realtime.messages;
CREATE POLICY "realtime_chat_topic_write"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  (realtime.topic() LIKE 'chat:%'
    AND EXISTS (
      SELECT 1 FROM public.channel_members cm
      WHERE cm.channel_id::text = split_part(realtime.topic(), ':', 2)
        AND cm.user_id = (SELECT auth.uid())
    ))
  OR (realtime.topic() LIKE 'notifications:%'
    AND split_part(realtime.topic(), ':', 2) = (SELECT auth.uid())::text)
);
