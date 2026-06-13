
-- 1) USER HANDLE
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_handle TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_profiles_user_handle ON public.profiles(lower(user_handle));

CREATE OR REPLACE FUNCTION public.validate_user_handle()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.user_handle IS NOT NULL THEN
    NEW.user_handle := lower(NEW.user_handle);
    IF NEW.user_handle !~ '^[a-z0-9_-]{3,30}$' THEN
      RAISE EXCEPTION 'Handle must be 3-30 chars, lowercase a-z, 0-9, _ or -';
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_validate_user_handle ON public.profiles;
CREATE TRIGGER trg_validate_user_handle BEFORE INSERT OR UPDATE OF user_handle ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.validate_user_handle();

-- Restrict who can update user_handle. Replace existing update policy with split policies.
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;

CREATE POLICY "Users update own profile (no handle)"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (user_handle IS NOT DISTINCT FROM (SELECT user_handle FROM public.profiles p2 WHERE p2.id = profiles.id))
);

CREATE POLICY "Admins update any profile"
ON public.profiles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Resolve handle to email (security definer; auth schema requires elevated rights)
CREATE OR REPLACE FUNCTION public.resolve_handle_to_email(p_handle TEXT)
RETURNS TEXT LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT u.email::text
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE lower(p.user_handle) = lower(p_handle)
  LIMIT 1
$$;

-- 2) PINNED ITEMS
CREATE TABLE IF NOT EXISTS public.pinned_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, entity_type, entity_id)
);
ALTER TABLE public.pinned_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Manage own pins" ON public.pinned_items FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3) ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT,
  severity TEXT NOT NULL DEFAULT 'info',
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ends_at TIMESTAMPTZ,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View active announcements" ON public.announcements FOR SELECT TO authenticated
USING (true);
CREATE POLICY "Admins manage announcements" ON public.announcements FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4) RECENT VIEWS
CREATE TABLE IF NOT EXISTS public.recent_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  label TEXT,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, entity_type, entity_id)
);
ALTER TABLE public.recent_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Manage own recents" ON public.recent_views FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_recent_views_user_time ON public.recent_views(user_id, viewed_at DESC);
