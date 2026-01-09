-- Create popup analytics table
CREATE TABLE public.popup_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL, -- 'impression', 'conversion', 'dismiss'
  trigger_type TEXT, -- 'exit_intent', 'scroll_depth', 'timer'
  session_id TEXT, -- anonymous session tracking
  page_url TEXT,
  user_agent TEXT,
  viewport_width INTEGER,
  scroll_depth_percent INTEGER
);

-- Enable RLS
ALTER TABLE public.popup_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for tracking
CREATE POLICY "Anyone can insert popup analytics"
ON public.popup_analytics
FOR INSERT
WITH CHECK (true);

-- Block public read (admin only via service role)
CREATE POLICY "Block public read access"
ON public.popup_analytics
FOR SELECT
USING (false);

-- Add index for querying by event type and date
CREATE INDEX idx_popup_analytics_event_date ON public.popup_analytics (event_type, created_at DESC);