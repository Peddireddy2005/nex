
-- ============================================
-- WORKSPACE HIERARCHY
-- ============================================
CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid NOT NULL,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  color text DEFAULT '#3b82f6',
  icon text DEFAULT 'folder',
  order_index integer NOT NULL DEFAULT 0,
  is_archived boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_archived boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id uuid REFERENCES public.folders(id) ON DELETE CASCADE,
  space_id uuid NOT NULL REFERENCES public.spaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_archived boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;

-- ============================================
-- EXTEND TASKS TABLE
-- ============================================
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS list_id uuid REFERENCES public.lists(id) ON DELETE SET NULL;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS parent_task_id uuid REFERENCES public.tasks(id) ON DELETE CASCADE;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS start_date timestamptz;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS recurring_config jsonb;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS time_estimate integer;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS custom_status text;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS is_archived boolean NOT NULL DEFAULT false;

-- ============================================
-- TAGS
-- ============================================
CREATE TABLE public.tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text DEFAULT '#6b7280',
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.task_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  UNIQUE(task_id, tag_id)
);
ALTER TABLE public.task_tags ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CHECKLISTS
-- ============================================
CREATE TABLE public.checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Checklist',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id uuid NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  assignee_id uuid,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TASK DEPENDENCIES
-- ============================================
CREATE TABLE public.task_dependencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  depends_on_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  dependency_type text NOT NULL DEFAULT 'blocks',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(task_id, depends_on_id)
);
ALTER TABLE public.task_dependencies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- TIME TRACKING
-- ============================================
CREATE TABLE public.time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  user_id uuid NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  duration_minutes integer,
  billable boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- GOALS & OKRs
-- ============================================
CREATE TABLE public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  target_value numeric NOT NULL DEFAULT 100,
  current_value numeric NOT NULL DEFAULT 0,
  unit text DEFAULT 'percent',
  due_date timestamptz,
  status text NOT NULL DEFAULT 'on_track',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.goal_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  UNIQUE(goal_id, task_id)
);
ALTER TABLE public.goal_tasks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DOCUMENTS / KNOWLEDGE BASE
-- ============================================
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text DEFAULT '',
  parent_id uuid REFERENCES public.documents(id) ON DELETE CASCADE,
  is_template boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CLIENTS / CRM
-- ============================================
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  company text,
  status text NOT NULL DEFAULT 'active',
  notes text,
  avatar_url text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.client_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  budget numeric,
  start_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ERROR LOGGING
-- ============================================
CREATE TABLE public.error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  error_message text NOT NULL,
  stack_trace text,
  user_id uuid,
  action text,
  component text,
  severity text NOT NULL DEFAULT 'error',
  resolved boolean NOT NULL DEFAULT false,
  resolved_by uuid,
  resolved_at timestamptz,
  ai_suggestion text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- AUTOMATION ENGINE
-- ============================================
CREATE TABLE public.automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  trigger_type text NOT NULL,
  trigger_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  conditions jsonb NOT NULL DEFAULT '[]'::jsonb,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  enabled boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id uuid NOT NULL REFERENCES public.automation_rules(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'success',
  trigger_data jsonb,
  result jsonb,
  error_message text,
  executed_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SAVED VIEWS
-- ============================================
CREATE TABLE public.saved_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  view_type text NOT NULL,
  filters jsonb DEFAULT '{}'::jsonb,
  sort_config jsonb DEFAULT '{}'::jsonb,
  columns jsonb DEFAULT '[]'::jsonb,
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.saved_views ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Workspaces
CREATE POLICY "View workspaces" ON public.workspaces FOR SELECT TO authenticated USING (
  owner_id = auth.uid() OR EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = workspaces.id AND user_id = auth.uid())
);
CREATE POLICY "Create workspaces" ON public.workspaces FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Update workspaces" ON public.workspaces FOR UPDATE TO authenticated USING (owner_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Delete workspaces" ON public.workspaces FOR DELETE TO authenticated USING (owner_id = auth.uid());

-- Workspace members
CREATE POLICY "View workspace members" ON public.workspace_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Insert workspace members" ON public.workspace_members FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR EXISTS (SELECT 1 FROM public.workspaces WHERE id = workspace_members.workspace_id AND owner_id = auth.uid())
);
CREATE POLICY "Delete workspace members" ON public.workspace_members FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR user_id = auth.uid()
);

-- Spaces
CREATE POLICY "View spaces" ON public.spaces FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage spaces" ON public.spaces FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update spaces" ON public.spaces FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete spaces" ON public.spaces FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Folders
CREATE POLICY "View folders" ON public.folders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage folders" ON public.folders FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update folders" ON public.folders FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete folders" ON public.folders FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Lists
CREATE POLICY "View lists" ON public.lists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage lists" ON public.lists FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update lists" ON public.lists FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete lists" ON public.lists FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Tags
CREATE POLICY "View tags" ON public.tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage tags" ON public.tags FOR ALL TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
) WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Task tags
CREATE POLICY "View task tags" ON public.task_tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage task tags" ON public.task_tags FOR ALL TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = task_tags.task_id AND created_by = auth.uid())
) WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR
  EXISTS (SELECT 1 FROM public.tasks WHERE id = task_tags.task_id AND created_by = auth.uid())
);

-- Checklists
CREATE POLICY "View checklists" ON public.checklists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage checklists" ON public.checklists FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Checklist items
CREATE POLICY "View checklist items" ON public.checklist_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage checklist items" ON public.checklist_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Dependencies
CREATE POLICY "View dependencies" ON public.task_dependencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage dependencies" ON public.task_dependencies FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Time entries
CREATE POLICY "View time entries" ON public.time_entries FOR SELECT TO authenticated USING (
  auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Create time entries" ON public.time_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update time entries" ON public.time_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Delete time entries" ON public.time_entries FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Goals
CREATE POLICY "View goals" ON public.goals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Create goals" ON public.goals FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR auth.uid() = created_by
);
CREATE POLICY "Update goals" ON public.goals FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role) OR auth.uid() = created_by
);
CREATE POLICY "Delete goals" ON public.goals FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR auth.uid() = created_by
);

-- Goal tasks
CREATE POLICY "View goal tasks" ON public.goal_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Manage goal tasks" ON public.goal_tasks FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Documents
CREATE POLICY "View documents" ON public.documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Create documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Update documents" ON public.documents FOR UPDATE TO authenticated USING (
  auth.uid() = created_by OR has_role(auth.uid(), 'admin'::app_role)
);
CREATE POLICY "Delete documents" ON public.documents FOR DELETE TO authenticated USING (
  auth.uid() = created_by OR has_role(auth.uid(), 'admin'::app_role)
);

-- Clients
CREATE POLICY "View clients" ON public.clients FOR SELECT TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Manage clients" ON public.clients FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update clients" ON public.clients FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete clients" ON public.clients FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Client projects
CREATE POLICY "View client projects" ON public.client_projects FOR SELECT TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Manage client projects" ON public.client_projects FOR INSERT TO authenticated WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Update client projects" ON public.client_projects FOR UPDATE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Delete client projects" ON public.client_projects FOR DELETE TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Error logs
CREATE POLICY "View error logs" ON public.error_logs FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Insert error logs" ON public.error_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Update error logs" ON public.error_logs FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Automation rules
CREATE POLICY "View automation rules" ON public.automation_rules FOR SELECT TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);
CREATE POLICY "Manage automation rules" ON public.automation_rules FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Update automation rules" ON public.automation_rules FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Delete automation rules" ON public.automation_rules FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Automation logs
CREATE POLICY "View automation logs" ON public.automation_logs FOR SELECT TO authenticated USING (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role)
);

-- Saved views
CREATE POLICY "View saved views" ON public.saved_views FOR SELECT TO authenticated USING (
  auth.uid() = created_by OR has_role(auth.uid(), 'admin'::app_role)
);
CREATE POLICY "Manage saved views" ON public.saved_views FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Update saved views" ON public.saved_views FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Delete saved views" ON public.saved_views FOR DELETE TO authenticated USING (auth.uid() = created_by);
