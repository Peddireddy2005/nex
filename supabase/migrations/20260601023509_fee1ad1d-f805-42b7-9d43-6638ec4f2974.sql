
-- 1. employee_id on profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS employee_id TEXT UNIQUE;

-- per-year sequence helper table
CREATE TABLE IF NOT EXISTS public.employee_id_counters (
  year INTEGER PRIMARY KEY,
  last_value INTEGER NOT NULL DEFAULT 0
);
GRANT SELECT ON public.employee_id_counters TO authenticated;
GRANT ALL ON public.employee_id_counters TO service_role;
ALTER TABLE public.employee_id_counters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View counters" ON public.employee_id_counters FOR SELECT TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.generate_employee_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  yr INTEGER := EXTRACT(YEAR FROM now())::INTEGER;
  nxt INTEGER;
BEGIN
  INSERT INTO public.employee_id_counters(year, last_value)
    VALUES (yr, 1)
    ON CONFLICT (year) DO UPDATE SET last_value = employee_id_counters.last_value + 1
    RETURNING last_value INTO nxt;
  RETURN 'NEX-EMP-' || yr::text || '-' || lpad(nxt::text, 3, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.assign_employee_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.employee_id IS NULL THEN
    NEW.employee_id := public.generate_employee_id();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assign_employee_id ON public.profiles;
CREATE TRIGGER trg_assign_employee_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.assign_employee_id();

-- protect employee_id from being changed
CREATE OR REPLACE FUNCTION public.protect_employee_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.employee_id IS NOT NULL AND NEW.employee_id IS DISTINCT FROM OLD.employee_id THEN
    RAISE EXCEPTION 'employee_id cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_employee_id ON public.profiles;
CREATE TRIGGER trg_protect_employee_id
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_employee_id();

-- Backfill existing profiles ordered by created_at for stable numbering
DO $$
DECLARE r RECORD; new_id TEXT;
BEGIN
  FOR r IN SELECT id FROM public.profiles WHERE employee_id IS NULL ORDER BY created_at ASC LOOP
    new_id := public.generate_employee_id();
    UPDATE public.profiles SET employee_id = new_id WHERE id = r.id;
  END LOOP;
END $$;

-- 2. profile_edit_logs
CREATE TABLE IF NOT EXISTS public.profile_edit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL,
  edited_by UUID NOT NULL,
  changes JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.profile_edit_logs TO authenticated;
GRANT ALL ON public.profile_edit_logs TO service_role;
ALTER TABLE public.profile_edit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view profile edit logs" ON public.profile_edit_logs
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins insert profile edit logs" ON public.profile_edit_logs
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND edited_by = auth.uid());
CREATE INDEX IF NOT EXISTS idx_profile_edit_logs_profile ON public.profile_edit_logs(profile_id, created_at DESC);

-- 3. app_settings key/value
CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID
);
GRANT SELECT ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View app settings" ON public.app_settings
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins insert app settings" ON public.app_settings
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update app settings" ON public.app_settings
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. default_status on onboarding_steps
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='onboarding_steps' AND column_name='default_status') THEN
    ALTER TABLE public.onboarding_steps ADD COLUMN default_status onboarding_status NOT NULL DEFAULT 'pending';
  END IF;
END $$;

-- 5. Tighten clients RLS — admins only for write/delete
DROP POLICY IF EXISTS "Manage clients" ON public.clients;
DROP POLICY IF EXISTS "Update clients" ON public.clients;
DROP POLICY IF EXISTS "Delete clients" ON public.clients;

CREATE POLICY "Admins insert clients" ON public.clients
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update clients" ON public.clients
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete clients" ON public.clients
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
