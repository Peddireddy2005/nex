export interface Profile {
  id: string;
  business_name: string | null;
  business_size: string | null;
  industry: string | null;
  category: string | null;
  onboarding_complete: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'starter' | 'pro';
  status: 'active' | 'inactive';
  created_at: string;
}

export type BusinessSize = 'Solo' | 'Small (2-10)' | 'Medium (11-50)' | 'Enterprise (50+)';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
