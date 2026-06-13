
-- Create custom_roles table for fully custom RBAC
CREATE TABLE public.custom_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  permissions jsonb NOT NULL DEFAULT '[]'::jsonb,
  color text DEFAULT '#6b7280',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view custom roles" ON public.custom_roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins manage custom roles" ON public.custom_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add custom_role_id to profiles for display purposes
ALTER TABLE public.profiles ADD COLUMN custom_role_id uuid REFERENCES public.custom_roles(id) ON DELETE SET NULL;

-- Seed some default custom roles
INSERT INTO public.custom_roles (name, description, permissions, color, created_by) VALUES
  ('Designer', 'UI/UX design team member', '["view_tasks","edit_own_tasks","view_messages"]'::jsonb, '#8b5cf6', '00000000-0000-0000-0000-000000000000'),
  ('Developer', 'Engineering team member', '["view_tasks","edit_own_tasks","view_messages","manage_tasks"]'::jsonb, '#3b82f6', '00000000-0000-0000-0000-000000000000'),
  ('Copywriter', 'Content creation specialist', '["view_tasks","edit_own_tasks","view_messages"]'::jsonb, '#f59e0b', '00000000-0000-0000-0000-000000000000'),
  ('Strategist', 'Campaign strategy lead', '["view_tasks","edit_own_tasks","view_messages","manage_tasks","view_performance"]'::jsonb, '#10b981', '00000000-0000-0000-0000-000000000000'),
  ('Project Lead', 'Oversees project delivery', '["view_tasks","edit_own_tasks","manage_tasks","view_messages","view_performance","manage_onboarding"]'::jsonb, '#ef4444', '00000000-0000-0000-0000-000000000000');
