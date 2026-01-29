-- Add UTM, page_path, user_agent_hash to leads (hubia-marketing Supabase)
-- Run this on the same project where 20260129100000_leads_table.sql was run.

alter table public.leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists page_path text,
  add column if not exists user_agent_hash text;

comment on column public.leads.page_path is 'Path of the page where form was submitted (e.g. /contact)';
comment on column public.leads.user_agent_hash is 'Optional hash of user-agent for spam/analytics (no PII)';
