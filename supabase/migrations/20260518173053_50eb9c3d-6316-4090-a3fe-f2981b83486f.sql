
ALTER TABLE public.members
  ADD COLUMN IF NOT EXISTS last_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS location text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS career_stage text NOT NULL DEFAULT '';

CREATE OR REPLACE FUNCTION public.handle_new_member()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.members (id, email, first_name, last_name, location, career_stage)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'location', ''),
    COALESCE(NEW.raw_user_meta_data->>'career_stage', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_member();
