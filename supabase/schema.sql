-- Portfolio website schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

do $$ begin
  create type service_category as enum (
    'web_development',
    'mobile_app_development',
    'ai_business_automation',
    'digital_marketing'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type content_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- projects / case studies
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category service_category not null,
  summary text,
  problem text,
  solution text,
  outcome text,
  tech_stack text[] not null default '{}',
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  -- per-locale overrides, e.g. {"ne": {"title": "...", "summary": "...", "problem": "...", "solution": "...", "outcome": "..."}}
  translations jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- blog posts
-- ---------------------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  translations jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  translations jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- pricing packages
-- ---------------------------------------------------------------------------
create table if not exists pricing_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_label text not null,
  engagement_model text,
  features text[] not null default '{}',
  translations jsonb not null default '{}'::jsonb,
  status content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contact submissions
-- ---------------------------------------------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  service_interest service_category,
  status text not null default 'new' check (status in ('new', 'read', 'responded')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site settings (resume file url, misc singleton config)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at before update on projects
  for each row execute function set_updated_at();

drop trigger if exists trg_blog_posts_updated_at on blog_posts;
create trigger trg_blog_posts_updated_at before update on blog_posts
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table pricing_packages enable row level security;
alter table contact_submissions enable row level security;
alter table site_settings enable row level security;

-- Public (anon) read access to published content only
drop policy if exists "public_read_published_projects" on projects;
create policy "public_read_published_projects" on projects
  for select using (status = 'published');

drop policy if exists "public_read_published_blog_posts" on blog_posts;
create policy "public_read_published_blog_posts" on blog_posts
  for select using (status = 'published');

drop policy if exists "public_read_published_testimonials" on testimonials;
create policy "public_read_published_testimonials" on testimonials
  for select using (status = 'published');

drop policy if exists "public_read_published_pricing" on pricing_packages;
create policy "public_read_published_pricing" on pricing_packages
  for select using (status = 'published');

drop policy if exists "public_read_site_settings" on site_settings;
create policy "public_read_site_settings" on site_settings
  for select using (true);

-- Authenticated admin: full read/write on every table
drop policy if exists "admin_all_projects" on projects;
create policy "admin_all_projects" on projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_blog_posts" on blog_posts;
create policy "admin_all_blog_posts" on blog_posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_testimonials" on testimonials;
create policy "admin_all_testimonials" on testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_pricing" on pricing_packages;
create policy "admin_all_pricing" on pricing_packages
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_site_settings" on site_settings;
create policy "admin_all_site_settings" on site_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Contact submissions: anyone can insert (the public contact form),
-- only the authenticated admin can read or update.
drop policy if exists "public_insert_contact" on contact_submissions;
create policy "public_insert_contact" on contact_submissions
  for insert with check (true);

drop policy if exists "admin_read_contact" on contact_submissions;
create policy "admin_read_contact" on contact_submissions
  for select using (auth.role() = 'authenticated');

drop policy if exists "admin_update_contact" on contact_submissions;
create policy "admin_update_contact" on contact_submissions
  for update using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage buckets (run once — Supabase Storage API, not plain SQL, but the
-- SQL below works via the storage extension's helper tables)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('blog-images', 'blog-images', true),
  ('testimonial-avatars', 'testimonial-avatars', true),
  ('resume', 'resume', true)
on conflict (id) do nothing;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media" on storage.objects
  for select using (bucket_id in ('project-images', 'blog-images', 'testimonial-avatars', 'resume'));

drop policy if exists "admin_write_media" on storage.objects;
create policy "admin_write_media" on storage.objects
  for insert with check (
    bucket_id in ('project-images', 'blog-images', 'testimonial-avatars', 'resume')
    and auth.role() = 'authenticated'
  );

drop policy if exists "admin_update_media" on storage.objects;
create policy "admin_update_media" on storage.objects
  for update using (
    bucket_id in ('project-images', 'blog-images', 'testimonial-avatars', 'resume')
    and auth.role() = 'authenticated'
  );

drop policy if exists "admin_delete_media" on storage.objects;
create policy "admin_delete_media" on storage.objects
  for delete using (
    bucket_id in ('project-images', 'blog-images', 'testimonial-avatars', 'resume')
    and auth.role() = 'authenticated'
  );

-- ---------------------------------------------------------------------------
-- Seed data — editable later from the admin Settings page
-- ---------------------------------------------------------------------------
insert into site_settings (key, value)
values
  ('contact', '{"location":"Kathmandu, Nepal","phone":"+977-9705515425","whatsapp":"9779705515425","email":"lazyshane333@gmail.com"}'::jsonb),
  ('socials', '{"linkedin":"https://www.linkedin.com/in/nishanyonjan"}'::jsonb)
on conflict (key) do nothing;
