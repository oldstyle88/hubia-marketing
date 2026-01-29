-- marketing_leads: table for HŪBIA marketing site lead form
-- RLS: allow anonymous insert only; deny select/update/delete for anon

create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Index for listing by date (admin may use service role)
create index if not exists marketing_leads_created_at_idx on public.marketing_leads (created_at desc);

-- RLS
alter table public.marketing_leads enable row level security;

-- Allow anonymous insert only
create policy "Allow anon insert"
  on public.marketing_leads
  for insert
  to anon
  with check (true);

-- Deny select/update/delete for anon (only service role / authenticated can read)
create policy "Deny anon select"
  on public.marketing_leads
  for select
  to anon
  using (false);

create policy "Deny anon update"
  on public.marketing_leads
  for update
  to anon
  using (false);

create policy "Deny anon delete"
  on public.marketing_leads
  for delete
  to anon
  using (false);

-- Optional: allow authenticated or service_role to read (for admin)
create policy "Allow service role all"
  on public.marketing_leads
  for all
  to service_role
  using (true)
  with check (true);
