
-- Fix checklists: require task ownership or admin/manager for writes
DROP POLICY "Manage checklists" ON public.checklists;
CREATE POLICY "Manage checklists" ON public.checklists FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = checklists.task_id AND (created_by = auth.uid() OR assigned_to = auth.uid()))
);
CREATE POLICY "Update checklists" ON public.checklists FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = checklists.task_id AND (created_by = auth.uid() OR assigned_to = auth.uid()))
);
CREATE POLICY "Delete checklists" ON public.checklists FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = checklists.task_id AND (created_by = auth.uid() OR assigned_to = auth.uid()))
);

-- Fix checklist items
DROP POLICY "Manage checklist items" ON public.checklist_items;
CREATE POLICY "Manage checklist items" ON public.checklist_items FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.checklists cl JOIN public.tasks t ON t.id = cl.task_id WHERE cl.id = checklist_items.checklist_id AND (t.created_by = auth.uid() OR t.assigned_to = auth.uid()))
  OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update checklist items" ON public.checklist_items FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.checklists cl JOIN public.tasks t ON t.id = cl.task_id WHERE cl.id = checklist_items.checklist_id AND (t.created_by = auth.uid() OR t.assigned_to = auth.uid()))
  OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete checklist items" ON public.checklist_items FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.checklists cl JOIN public.tasks t ON t.id = cl.task_id WHERE cl.id = checklist_items.checklist_id AND (t.created_by = auth.uid() OR t.assigned_to = auth.uid()))
  OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Fix dependencies
DROP POLICY "Manage dependencies" ON public.task_dependencies;
CREATE POLICY "Manage dependencies" ON public.task_dependencies FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = task_dependencies.task_id AND created_by = auth.uid())
);
CREATE POLICY "Update dependencies" ON public.task_dependencies FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = task_dependencies.task_id AND created_by = auth.uid())
);
CREATE POLICY "Delete dependencies" ON public.task_dependencies FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = task_dependencies.task_id AND created_by = auth.uid())
);
