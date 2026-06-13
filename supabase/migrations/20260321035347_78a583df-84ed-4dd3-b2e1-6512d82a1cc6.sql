
-- Add pinned message columns
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS pinned_at timestamp with time zone DEFAULT NULL;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS pinned_by uuid DEFAULT NULL;
