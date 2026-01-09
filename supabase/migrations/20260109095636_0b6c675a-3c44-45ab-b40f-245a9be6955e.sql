-- Create table for eligibility form submissions
CREATE TABLE public.eligibility_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Contact Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  -- Core Eligibility
  role_type TEXT,
  years_in_practice TEXT,
  real_cost TEXT[],
  real_cost_other TEXT,
  brand_maturity TEXT,
  visibility TEXT,
  alignment TEXT,
  friction TEXT,
  commitment TEXT,
  -- Future Direction
  career_horizon TEXT,
  important_areas TEXT[],
  readiness TEXT,
  -- Metadata
  is_partial BOOLEAN NOT NULL DEFAULT true,
  last_completed_step INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (public insert, no auth required for lead capture)
ALTER TABLE public.eligibility_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (lead capture form)
CREATE POLICY "Anyone can submit eligibility form" 
ON public.eligibility_submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update their own submission by email
CREATE POLICY "Anyone can update their submission by email" 
ON public.eligibility_submissions 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Create index on email for lookups
CREATE INDEX idx_eligibility_submissions_email ON public.eligibility_submissions(email);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_eligibility_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_eligibility_submissions_updated_at
BEFORE UPDATE ON public.eligibility_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_eligibility_updated_at();