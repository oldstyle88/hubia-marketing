-- leads: table for HŪBIA marketing site lead form
-- No filesystem; insert only via service_role (API server-side). No public read.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  locale text,
  source_page text,
  business text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- No policy for anon: anon cannot insert or select. API uses service_role.
create policy "Service role full access to leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- Optional: allow authenticated admin to read (if you add auth later)
-- create policy "Authenticated read leads" on public.leads for select to authenticated using (true);
