create extension if not exists "pgcrypto";

create type public.product_category as enum (
  'REPTILE',
  'LANDSCAPING',
  'TAXIDERMY',
  'SCULPTURAL_RELICS',
  'NANO_RANDOM'
);

create type public.inventory_status as enum (
  'draft',
  'ready_for_review',
  'published',
  'reserved',
  'sold',
  'archived'
);

create type public.media_type as enum ('image', 'video');
create type public.profile_role as enum ('customer', 'wholesale_pending', 'wholesale_approved', 'admin');
create type public.sourcing_request_status as enum ('new', 'reviewed', 'hunting', 'found', 'closed');

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  title text not null,
  slug text not null unique,
  category public.product_category not null,
  story text,
  description text not null default '',
  dimensions jsonb not null default '{}'::jsonb,
  wood_type text,
  treatment_details text,
  price_cents integer not null default 0 check (price_cents >= 0),
  inventory_status public.inventory_status not null default 'draft',
  is_featured_global boolean not null default false,
  is_featured_category boolean not null default false,
  featured_category_target public.product_category,
  hero_image_url text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  type public.media_type not null,
  url text not null,
  storage_path text,
  sort_order integer not null default 0,
  is_private boolean not null default false,
  alt_text text,
  caption text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  birthday date,
  business_name text,
  business_address text,
  business_phone text,
  avatar_url text,
  newsletter_opt_out boolean not null default false,
  role public.profile_role not null default 'customer',
  business_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.inventory_reservations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  checkout_session_id text,
  active boolean not null default true,
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  created_at timestamptz not null default now()
);

create unique index one_active_reservation_per_product
  on public.inventory_reservations(product_id)
  where active = true;

create table public.sourcing_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  wood_specs jsonb not null default '{}'::jsonb,
  status public.sourcing_request_status not null default 'new',
  internal_synced boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.profiles enable row level security;
alter table public.inventory_reservations enable row level security;
alter table public.sourcing_requests enable row level security;

create policy "published products are public"
on public.products for select
using (inventory_status = 'published');

create policy "admins manage products"
on public.products for all
using (public.is_admin())
with check (public.is_admin());

create policy "published media is public"
on public.product_media for select
using (
  is_private = false and exists (
    select 1 from public.products
    where products.id = product_media.product_id
      and products.inventory_status = 'published'
  )
);

create policy "admins manage media"
on public.product_media for all
using (public.is_admin())
with check (public.is_admin());

create policy "users read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "users update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "admins manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage reservations"
on public.inventory_reservations for all
using (public.is_admin())
with check (public.is_admin());

create policy "public may submit sourcing requests"
on public.sourcing_requests for insert
with check (user_id is null or user_id = auth.uid());

create policy "admins read sourcing requests"
on public.sourcing_requests for select
using (public.is_admin());

create policy "admins manage sourcing requests"
on public.sourcing_requests for update
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values
  ('product-media-public', 'product-media-public', true),
  ('product-media-private', 'product-media-private', false)
on conflict (id) do nothing;

create policy "published media files are public"
on storage.objects for select
using (bucket_id = 'product-media-public');

create policy "admins manage public media files"
on storage.objects for all
using (bucket_id = 'product-media-public' and public.is_admin())
with check (bucket_id = 'product-media-public' and public.is_admin());

create policy "admins manage private media files"
on storage.objects for all
using (bucket_id = 'product-media-private' and public.is_admin())
with check (bucket_id = 'product-media-private' and public.is_admin());
