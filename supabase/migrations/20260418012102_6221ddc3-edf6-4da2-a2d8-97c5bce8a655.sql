-- Brand Asset Workbook lead submissions
CREATE TABLE public.brand_workbook_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  practice_name TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  source TEXT DEFAULT 'brand_asset_workbook',
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.brand_workbook_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit the workbook
CREATE POLICY "Anyone can submit brand workbook"
ON public.brand_workbook_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view brand workbook submissions"
ON public.brand_workbook_submissions
FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM public.admin_users));

-- Block public reads explicitly
CREATE POLICY "Block public read access on brand workbook"
ON public.brand_workbook_submissions
FOR SELECT
USING (false);

-- Index on email for lookup
CREATE INDEX idx_brand_workbook_email ON public.brand_workbook_submissions(email);
CREATE INDEX idx_brand_workbook_created ON public.brand_workbook_submissions(created_at DESC);