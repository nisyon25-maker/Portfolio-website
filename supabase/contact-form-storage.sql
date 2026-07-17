-- Contact form storage setup for Supabase
-- Run this in the Supabase SQL Editor.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  service_interest text,
  status text not null default 'new' check (status in ('new', 'read', 'responded')),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

drop policy if exists "public_insert_contact" on public.contact_submissions;
create policy "public_insert_contact"
  on public.contact_submissions for insert
  with check (true);

drop policy if exists "admin_read_contact" on public.contact_submissions;
create policy "admin_read_contact"
  on public.contact_submissions for select
  using (auth.role() = 'authenticated');

drop policy if exists "admin_update_contact" on public.contact_submissions;
create policy "admin_update_contact"
  on public.contact_submissions for update
  using (auth.role() = 'authenticated');
