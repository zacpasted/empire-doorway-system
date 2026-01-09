-- Drop the overly permissive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update their submission by email" ON public.eligibility_submissions;

-- Remove SELECT policy if exists (submissions should not be publicly readable)
DROP POLICY IF EXISTS "Submissions are viewable by authenticated users" ON public.eligibility_submissions;