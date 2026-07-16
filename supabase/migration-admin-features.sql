-- Migration: admin panel features (project URL, blog SEO, services CMS)
-- Safe to run on an existing database — every statement is idempotent.
-- Run this in the Supabase SQL editor if you already ran schema.sql before.

-- 1) Projects: live project URL ------------------------------------------------
alter table projects add column if not exists project_url text;

-- 2) Blog posts: SEO meta fields -----------------------------------------------
alter table blog_posts add column if not exists meta_title text;
alter table blog_posts add column if not exists meta_description text;

-- 3) Services CMS table --------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  icon_key text not null default 'sparkles',
  link_url text,
  translations jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_services_updated_at on services;
create trigger trg_services_updated_at before update on services
  for each row execute function set_updated_at();

alter table services enable row level security;

drop policy if exists "public_read_published_services" on services;
create policy "public_read_published_services" on services
  for select using (status = 'published');

drop policy if exists "admin_all_services" on services;
create policy "admin_all_services" on services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
