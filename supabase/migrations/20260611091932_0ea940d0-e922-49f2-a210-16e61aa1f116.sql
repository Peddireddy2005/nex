
CREATE OR REPLACE FUNCTION public.list_member_contacts()
RETURNS TABLE(id uuid, phone text, employee_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.phone, p.employee_id
  FROM public.profiles p
  WHERE
    public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'manager'::app_role)
    OR p.id = auth.uid()
$$;

REVOKE EXECUTE ON FUNCTION public.list_member_contacts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_member_contacts() TO authenticated;
