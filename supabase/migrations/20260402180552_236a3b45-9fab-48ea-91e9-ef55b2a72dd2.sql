
-- 1. Create secure RPC for invite token lookup (replaces anon full-table access)
CREATE OR REPLACE FUNCTION public.check_invite_token(p_token text)
RETURNS TABLE(valid boolean, invite_role text, invite_email text, expired boolean, used boolean)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT
    true,
    role::text,
    email,
    expires_at < now(),
    used_by IS NOT NULL
  FROM invite_tokens WHERE token = p_token LIMIT 1;
$$;

-- 2. Drop dangerous anon policy on invite_tokens
DROP POLICY IF EXISTS "Anyone can view invite by token" ON invite_tokens;

-- 3. Add CHECK constraint on performance_ratings
ALTER TABLE performance_ratings ADD CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 10);

-- 4. Restrict activity_logs: only own logs or admin
DROP POLICY IF EXISTS "View activity logs" ON activity_logs;
CREATE POLICY "View own or admin activity logs" ON activity_logs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- 5. Make channel-files bucket private
UPDATE storage.buckets SET public = false WHERE id = 'channel-files';
