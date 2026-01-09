-- Create table for lead magnet submissions
CREATE TABLE public.lead_magnet_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'mini_series_popup',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lead_magnet_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (lead capture)
CREATE POLICY "Anyone can submit lead magnet form" 
ON public.lead_magnet_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create index on email
CREATE INDEX idx_lead_magnet_email ON public.lead_magnet_submissions(email);