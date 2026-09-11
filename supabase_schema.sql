-- Create Voice Agents Table
CREATE TABLE IF NOT EXISTS voice_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  voice_id TEXT DEFAULT 'alloy',
  phone_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE voice_agents ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own voice agents"
  ON voice_agents
  FOR ALL
  USING (auth.uid() = user_id);

-- Create Workflows Table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  action_type TEXT NOT NULL,
  trigger_config JSONB DEFAULT '{}'::jsonb,
  action_config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own workflows"
  ON workflows
  FOR ALL
  USING (auth.uid() = user_id);

-- Create Spin Leads Table
CREATE TABLE IF NOT EXISTS spin_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  services TEXT[],
  prize TEXT,
  coupon_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE spin_leads ENABLE ROW LEVEL SECURITY;

-- Policy: allow anyone (anonymous visitors) to insert a lead
CREATE POLICY "Anyone can submit a spin lead"
  ON spin_leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: only authenticated admins/staff can view leads
CREATE POLICY "Authenticated users can view spin leads"
  ON spin_leads
  FOR SELECT
  USING (auth.role() = 'authenticated');
