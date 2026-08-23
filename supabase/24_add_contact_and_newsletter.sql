-- ============================================================================
-- NovaCart — Contact messages & newsletter subscribers
-- Run this in the Supabase SQL Editor. Safe to re-run.
--
-- Backs two new public-facing forms: the /contact page and the footer
-- newsletter signup. Both are anonymous-writable (no login required) with
-- read access restricted to admins.
-- ============================================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Anyone (including signed-out visitors) can submit — this is a public form.
drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

drop policy if exists "Anyone can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

-- Only admins can read submissions back.
drop policy if exists "Admins can view contact messages" on public.contact_messages;
create policy "Admins can view contact messages"
  on public.contact_messages for select
  using (public.is_admin());

drop policy if exists "Admins can view newsletter subscribers" on public.newsletter_subscribers;
create policy "Admins can view newsletter subscribers"
  on public.newsletter_subscribers for select
  using (public.is_admin());