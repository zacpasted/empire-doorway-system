-- Block public read access on lead magnet submissions
CREATE POLICY "Block public read access"
ON public.lead_magnet_submissions
FOR SELECT
USING (false);