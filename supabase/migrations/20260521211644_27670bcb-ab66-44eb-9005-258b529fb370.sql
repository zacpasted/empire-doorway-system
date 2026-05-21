
-- Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  practice_name text not null,
  role text not null check (role in ('owner', 'associate', 'building')),
  why_now text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  card_no bigint generated always as identity,
  submitted_at timestamptz not null default now(),
  approved_at timestamptz,
  invited_at timestamptz
);

alter table public.applications enable row level security;

create policy "Anyone can apply"
  on public.applications for insert
  to anon, authenticated
  with check (true);

create policy "Members can read own application"
  on public.applications for select
  to authenticated
  using (email = (auth.jwt() ->> 'email'));

create policy "Admins can read all applications"
  on public.applications for select
  to authenticated
  using (auth.uid() in (select user_id from public.admin_users));

create policy "Admins can update applications"
  on public.applications for update
  to authenticated
  using (auth.uid() in (select user_id from public.admin_users));

-- Enable extensions for scheduled invocation
create extension if not exists pg_cron;
create extension if not exists pg_net;
