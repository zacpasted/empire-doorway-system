ALTER TABLE public.lead_magnet_submissions
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS dream_destination text;