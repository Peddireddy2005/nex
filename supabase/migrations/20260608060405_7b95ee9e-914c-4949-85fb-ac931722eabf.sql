
-- 1. Channels SELECT: restrict to members or admins (protects encryption_key)
DROP POLICY IF EXISTS "View channels" ON public.channels;
CREATE POLICY "View channels" ON public.channels
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR EXISTS (SELECT 1 FROM public.channel_members cm WHERE cm.channel_id = channels.id AND cm.user_id = auth.uid())
  );

-- 2. channel_members SELECT: restrict to members of the same channel + admins
DROP POLICY IF EXISTS "View channel members" ON public.channel_members;
CREATE POLICY "View channel members" ON public.channel_members
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    OR user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.channel_members cm2 WHERE cm2.channel_id = channel_members.channel_id AND cm2.user_id = auth.uid())
  );

-- 3. Performance ratings SELECT: only the rated user, admins, managers
DROP POLICY IF EXISTS "View ratings" ON public.performance_ratings;
CREATE POLICY "View ratings" ON public.performance_ratings
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'manager'::app_role)
  );

-- 4. Performance ratings: enforce 1..10 range
ALTER TABLE public.performance_ratings DROP CONSTRAINT IF EXISTS performance_ratings_rating_range;
ALTER TABLE public.performance_ratings
  ADD CONSTRAINT performance_ratings_rating_range CHECK (rating >= 1 AND rating <= 10);

-- 5. Task completion history SELECT: only own + admins/managers
DROP POLICY IF EXISTS "View task history" ON public.task_completion_history;
CREATE POLICY "View task history" ON public.task_completion_history
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR has_role(auth.uid(), 'admin'::app_role)
    OR has_role(auth.uid(), 'manager'::app_role)
  );

-- 6. Error logs INSERT: must match own user_id (admins exempt for system logging)
DROP POLICY IF EXISTS "Insert error logs" ON public.error_logs;
CREATE POLICY "Insert error logs" ON public.error_logs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- 7. Invite tokens UPDATE: only the user claiming it can mark it used
DROP POLICY IF EXISTS "Update invite on use" ON public.invite_tokens;
CREATE POLICY "Update invite on use" ON public.invite_tokens
  FOR UPDATE TO authenticated
  USING (used_by IS NULL)
  WITH CHECK (used_by = auth.uid());

-- 8. Channel files storage: enforce channel membership via path {user_id}/{channel_id}/...
DROP POLICY IF EXISTS "Authenticated users view channel files" ON storage.objects;
CREATE POLICY "Channel members view channel files" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'channel-files'
    AND (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (
        SELECT 1 FROM public.channel_members cm
        WHERE cm.user_id = auth.uid()
          AND cm.channel_id::text = (storage.foldername(name))[2]
      )
    )
  );

DROP POLICY IF EXISTS "Authenticated users upload channel files" ON storage.objects;
CREATE POLICY "Channel members upload channel files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'channel-files'
    AND (storage.foldername(name))[1] = (auth.uid())::text
    AND EXISTS (
      SELECT 1 FROM public.channel_members cm
      WHERE cm.user_id = auth.uid()
        AND cm.channel_id::text = (storage.foldername(name))[2]
    )
  );
