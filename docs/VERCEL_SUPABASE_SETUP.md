# Configurazione Vercel + Supabase per HŪBIA

Guida per deploy del sito marketing HŪBIA su Vercel con lead salvati su Supabase.

---

## 1. Supabase (nuovo progetto HŪBIA)

### 1.1 Hai già creato il progetto
- Vai su [Supabase Dashboard](https://supabase.com/dashboard) e apri il progetto **HŪBIA** (non barbiere/pizzeria).

### 1.2 Esegui UNA sola migration: la tabella `leads`

L’app usa la tabella **`leads`** (non `marketing_leads`). In Supabase:

1. **Project Settings** (icona ingranaggio) → **SQL Editor**.
2. Crea una **New query** e incolla il contenuto del file:
   ```
   supabase/migrations/20260129100000_leads_table.sql
   ```
3. Esegui la query (**Run**).

Contenuto da eseguire (copia-incolla):

```sql
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

create policy "Service role full access to leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);
```

**Nota:** Non usare la migration `20260129000000_marketing_leads.sql`: quella crea `marketing_leads` e non è usata dall’API attuale.

### 1.2b Migration UTM e page_path (opzionale ma consigliata)

Dopo la tabella `leads`, esegui anche la migration che aggiunge colonne per UTM e page_path:

1. SQL Editor → New query → incolla il contenuto di `supabase/migrations/20260129200000_leads_utm.sql`.
2. Run.

Cosa aggiunge: `utm_source`, `utm_medium`, `utm_campaign`, `page_path`, `user_agent_hash`. Se non la esegui, l'API ignora questi campi e salva comunque i lead (le colonne mancanti restano null).

### 1.3 Chiavi da usare in Vercel

Sempre nel progetto Supabase HŪBIA:

1. **Project Settings** → **API**.
2. Copia:
   - **Project URL** (es. `https://xxxxx.supabase.co`) → servirà come `SUPABASE_URL` e opzionale `NEXT_PUBLIC_SUPABASE_URL`.
   - **Project API keys** → **service_role** (secret, “Reveal” e copia) → servirà come `SUPABASE_SERVICE_ROLE_KEY`.

Non usare la chiave `anon` per i lead: l’API scrive solo con **service_role** (lato server).

---

## 2. Vercel

### 2.1 Collega il repository

1. [Vercel Dashboard](https://vercel.com/dashboard) → **Add New** → **Project**.
2. Importa questo **repository** (repo standalone del sito HŪBIA).
3. Configura così:
   - **Root Directory:** (lascia vuoto — root del repo).
   - **Framework Preset:** Next.js (rilevato in automatico).
   - **Build Command:** `npm run build` (default, ok).
   - **Output Directory:** `.next` (default, ok).
   - **Install Command:** `npm install` (o `npm ci` se usi lockfile in repo).  
     Nel monorepo il lockfile è spesso alla root; con `npm install` si evita l’errore “Missing from lock file” che dà `npm ci`.

### 2.2 Variabili d’ambiente

In **Project** → **Settings** → **Environment Variables** aggiungi:

| Nome | Valore | Note |
|------|--------|------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | Project URL del progetto Supabase HŪBIA |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` (chiave service_role) | Solo server-side, non esporre al client |

Opzionali:

| Nome | Valore | Note |
|------|--------|------|
| `NEXT_PUBLIC_BASE_URL` | `https://tuodominio.com` | Per metadata / canonical URL |
| `NEXT_PUBLIC_SUPABASE_URL` | come `SUPABASE_URL` | Solo se in futuro usi Supabase dal client |

Salva e **redeploy** il progetto (Deployments → ⋮ → Redeploy) così le variabili vengono applicate.

### 2.3 Build e deploy

- **Build:** Vercel esegue dalla root del repo: `npm install` e poi `npm run build`.
- Dopo il deploy, il form contatti invia a `/api/lead`, che scrive sulla tabella **`leads`** del progetto Supabase HŪBIA usando la **service_role**.

---

## 3. Riepilogo

| Cosa | Dove | Cosa fare |
|------|------|-----------|
| **Tabella lead** | Supabase progetto HŪBIA | Esegui solo `20260129100000_leads_table.sql` (tabella `leads`) |
| **Project URL** | Supabase → Settings → API | Copia in `SUPABASE_URL` (e opz. `NEXT_PUBLIC_SUPABASE_URL`) |
| **Service role key** | Supabase → Settings → API | Copia in `SUPABASE_SERVICE_ROLE_KEY` |
| **Root directory** | Vercel | (vuoto — root del repo) |
| **Install command** | Vercel | `npm install` |
| **Env in Vercel** | Settings → Environment Variables | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |

---

## 4. Verifica

1. **Supabase:** Table Editor → progetto HŪBIA → tabella `leads` presente e vuota (o con i lead dopo i test).
2. **Sito:** Apri il form contatti (es. `/it/contact` o `/en/contact?utm_source=test`), invia un messaggio di test.
3. **Supabase:** Ricarica `leads`: deve comparire la nuova riga con `name`, `email`, `phone`, `message`, `locale`, `source_page`, `page_path`, e se hai eseguito la migration UTM: `utm_source`, `utm_medium`, `utm_campaign`, `user_agent_hash`.
4. **Query di verifica:** In SQL Editor: `select id, created_at, name, email, locale, page_path, utm_source from public.leads order by created_at desc limit 10;`

Se i lead non compaiono: controlla che in Vercel siano impostate `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` del **progetto Supabase HŪBIA** (non barbiere/pizzeria) e che la migration `leads` sia stata eseguita in quel progetto.
