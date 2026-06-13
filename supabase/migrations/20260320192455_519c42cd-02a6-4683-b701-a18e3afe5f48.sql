
CREATE TABLE public.invite_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  email text,
  role app_role NOT NULL DEFAULT 'member',
  created_by uuid NOT NULL,
  used_by uuid,
  used_at timestamp with time zone,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.invite_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and managers create invites"
ON public.invite_tokens FOR INSERT TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);

CREATE POLICY "Admins and managers view invites"
ON public.invite_tokens FOR SELECT TO authenticated
USING (
  has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);

CREATE POLICY "Anyone can view invite by token"
ON public.invite_tokens FOR SELECT TO anon
USING (true);

CREATE POLICY "Update invite on use"
ON public.invite_tokens FOR UPDATE TO authenticated
USING (used_by IS NULL);
