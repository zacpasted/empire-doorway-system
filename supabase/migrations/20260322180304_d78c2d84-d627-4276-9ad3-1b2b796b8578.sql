CREATE TABLE public.quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT,
  email TEXT,
  score INTEGER NOT NULL,
  score_label TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  session_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  viewport_width INTEGER
);

ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous quiz inserts" ON public.quiz_submissions
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can view quiz submissions" ON public.quiz_submissions
  FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid()));