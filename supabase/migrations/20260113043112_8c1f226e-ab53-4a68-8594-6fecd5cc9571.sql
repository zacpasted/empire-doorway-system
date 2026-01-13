-- Create table for CTA click analytics
CREATE TABLE public.cta_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL DEFAULT 'click',
  cta_id TEXT NOT NULL,
  cta_text TEXT,
  page_url TEXT,
  section TEXT,
  session_id TEXT,
  user_agent TEXT,
  viewport_width INTEGER
);

-- Enable RLS
ALTER TABLE public.cta_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" 
ON public.cta_analytics 
FOR INSERT 
WITH CHECK (true);

-- Allow admins to view analytics
CREATE POLICY "Admins can view analytics" 
ON public.cta_analytics 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = auth.uid()
  )
);