-- Create admin_users table to track authorized admins
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can see admin_users table
CREATE POLICY "Admins can view admin list" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Create RLS policy for eligibility_submissions to allow admin reads
CREATE POLICY "Admins can view all submissions" 
ON public.eligibility_submissions 
FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Allow admins to update submissions (for marking as reviewed, etc.)
CREATE POLICY "Admins can update submissions" 
ON public.eligibility_submissions 
FOR UPDATE 
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Allow admins to delete submissions
CREATE POLICY "Admins can delete submissions" 
ON public.eligibility_submissions 
FOR DELETE 
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Also allow admins to view lead_magnet_submissions
CREATE POLICY "Admins can view lead magnet submissions" 
ON public.lead_magnet_submissions 
FOR SELECT 
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));