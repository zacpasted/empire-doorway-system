-- Members table
CREATE TABLE public.members (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  member_number INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_signed_in_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SEQUENCE IF NOT EXISTS public.members_member_number_seq START 1;
ALTER TABLE public.members ALTER COLUMN member_number SET DEFAULT nextval('public.members_member_number_seq');
ALTER SEQUENCE public.members_member_number_seq OWNED BY public.members.member_number;

ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their own record"
  ON public.members FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Members can update their own record"
  ON public.members FOR UPDATE
  USING (auth.uid() = id);

-- Assets sections enum
CREATE TYPE public.asset_section AS ENUM ('frameworks', 'scripts', 'playbooks', 'decks', 'tools');

-- Assets table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  case_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  section public.asset_section NOT NULL,
  file_url TEXT,
  file_format TEXT,
  file_meta TEXT,
  hero_image_url TEXT,
  published_at TIMESTAMPTZ,
  is_live BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated members can view live assets"
  ON public.assets FOR SELECT
  TO authenticated
  USING (is_live = true);

-- Checkouts table
CREATE TABLE public.checkouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  asset_id UUID NOT NULL REFERENCES public.assets(id) ON DELETE CASCADE,
  checked_out_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.checkouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated members can record their own checkouts"
  ON public.checkouts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = member_id);

-- Trigger: create member row on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.members (id, email, first_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_member
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_member();

-- Update last_signed_in_at trigger function (called from client)
CREATE OR REPLACE FUNCTION public.touch_member_signed_in()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.members
    SET last_signed_in_at = now()
    WHERE id = auth.uid();
END;
$$;