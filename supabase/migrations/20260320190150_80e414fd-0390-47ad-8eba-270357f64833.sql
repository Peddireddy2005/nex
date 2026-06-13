-- Fix overly permissive policies
DROP POLICY "System inserts profiles" ON public.profiles;
DROP POLICY "System creates notifications" ON public.notifications;
DROP POLICY "Insert onboarding" ON public.user_onboarding;

-- Profiles insert: only the user themselves or via trigger
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Notifications: only admins/managers can create for others
CREATE POLICY "Authenticated create notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

-- Onboarding: admins assign, users can insert own
CREATE POLICY "Insert own onboarding" ON public.user_onboarding FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));