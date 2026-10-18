create table if not exists public.wholesale_applications (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  business_type text not null,
  email text,
  phone text,
  preferred_contact text not null check (preferred_contact in ('email', 'phone')),
  business_location text not null,
  websites text[] not null default '{}',
  social_profiles jsonb not null default '[]'::jsonb,
  wholesale_interest text,
  review_status text not null default 'new' check (review_status in ('new', 'reviewing', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.wholesale_applications enable row level security;

drop policy if exists "admins read wholesale applications" on public.wholesale_applications;
create policy "admins read wholesale applications"
on public.wholesale_applications for select
using (public.is_admin());

drop policy if exists "admins update wholesale applications" on public.wholesale_applications;
create policy "admins update wholesale applications"
on public.wholesale_applications for update
using (public.is_admin())
with check (public.is_admin());

create index if not exists wholesale_applications_status_created_idx
on public.wholesale_applications (review_status, created_at desc);
