# Audit e upgrade “WOW / light luxury” — HŪBIA marketing site

## 1. Elenco file modificati / nuovi

### A) i18n — stringhe hardcoded rimosse (single source of truth)

| File | Modifica |
|------|----------|
| `messages/it.json` | Aggiunto `home.reliability.subtitle` (“Nessun claim magico…”) + 6 bullet (b1title/b1desc … b6title/b6desc) |
| `messages/en.json` | Stesso blocco in inglese (“No magic claims: only verifiable behaviours…”) |
| `messages/de.json` | Stesso blocco in tedesco |
| `messages/es.json` | Stesso blocco in spagnolo |
| `messages/fr.json` | Stesso blocco in francese |
| `components/ReliabilitySection.tsx` | Refactor: riceve `title`, `subtitle`, `bullets` come props (niente più stringhe hardcoded) |
| `app/[locale]/page.tsx` | Passa a `ReliabilitySection` le stringhe da `getTranslations('home')` (reliability.*) |

**Evidenza:** Su `/en` la sezione “Reliability by design” e il blocco “Nessun claim magico…” ora sono tradotti (EN: “No magic claims: only verifiable behaviours already in production.”). Single source of truth: `messages/{locale}.json`.

### B) i18n — come aggiungere una nuova lingua

1. Aggiungi il locale in `i18n/routing.ts`: `locales: ['it', 'en', 'de', 'es', 'fr', 'xx']`.
2. Crea `messages/xx.json` copiando la struttura di `messages/en.json` e traducendo tutte le chiavi.
3. Aggiungi la label nello switcher in `components/LanguageSwitcher.tsx`: `{ code: 'xx' as const, label: 'XX' }`.
4. Riavvia / rebuild. Il middleware next-intl reindirizza `/xx` e carica i messaggi.

### C) Founder / Admin — conferma “non accessibile pubblicamente”

- **Route in apps/hubia:** Nessuna route `/admin`, `/dashboard`, `/founder` nel progetto hubia (marketing). Controllato: solo `app/[locale]/...` e `app/api/lead`.
- **“Pannello amministrazione” in home:** È solo copy marketing nelle proof cards (titolo + descrizione). Non c’è alcun link a una route interna; il testo viene da `home.proof.adminPanel` / `adminPanelDesc`.
- **Test steps:**  
  1. Apri `/it`, `/en`, ecc. → nessun link a “admin” o “founder”.  
  2. Prova direttamente `/it/admin`, `/it/dashboard`, `/it/founder` → 404 (route inesistenti).  
  3. Cerca in repo “href=.*admin”, “href=.*founder” in apps/hubia → nessun match.

**Conferma:** Nessun accesso pubblico a dashboard/founder; “Pannello amministrazione” è solo testo marketing.

### D) Lead capture — Supabase (hubia-marketing, esterno a barbiere/pizzeria)

| File | Modifica |
|------|----------|
| `supabase/migrations/20260129200000_leads_utm.sql` | **Nuovo.** Aggiunge a `leads`: `utm_source`, `utm_medium`, `utm_campaign`, `page_path`, `user_agent_hash`. |
| `app/api/lead/route.ts` | Accetta e salva `page_path`, `utm_source`, `utm_medium`, `utm_campaign`, `user_agent` (hashato con SHA-256, salvato in `user_agent_hash`). Nessun log di PII. |
| `app/[locale]/contact/page.tsx` + `components/ContactForm.tsx` | Il form (client) invia `page_path`, `utm_source`/`utm_medium`/`utm_campaign` (da `window.location.search`), `user_agent` (da `navigator.userAgent`). |
| `docs/VERCEL_SUPABASE_SETUP.md` | Aggiunta sezione 1.2b per migration UTM; aggiornata verifica con query esempio. |

**Dove mettere le ENV su Vercel:**  
Project → Settings → Environment Variables: `SUPABASE_URL` (Project URL del progetto Supabase HŪBIA), `SUPABASE_SERVICE_ROLE_KEY` (chiave service_role). Solo server-side; non esporre la service_role al client.

**Verifica che i record arrivano:**  
1. Invia un lead dal form (es. `/it/contact` o `/en/contact?utm_source=test`).  
2. Supabase (progetto HŪBIA) → Table Editor → `leads`: nuova riga con `name`, `email`, `locale`, `source_page`, `page_path`, e se hai eseguito la migration UTM: `utm_source`, `utm_medium`, `utm_campaign`, `user_agent_hash`.  
3. Query esempio: `select id, created_at, name, email, locale, page_path, utm_source from public.leads order by created_at desc limit 10;`

### E) Logo e look “wow”

| File | Modifica |
|------|----------|
| `app/layout.tsx` | `metadata.icons`: favicon `/favicon.ico`, icon 192/512 e apple-touch da `/brand/hubia-logo.png`; `openGraph.images` con url e dimensioni. `<head>`: `link rel="icon"` → `/favicon.ico`, `link rel="apple-touch-icon"` → `/brand/hubia-logo.png`. |

**Favicon / icon / og:image:**  
- `favicon.ico` in `public/` (già presente).  
- Apple-touch e icon 192/512: per ora puntano a `hubia-logo.png`; quando hai versioni trasparenti (logoMark, icon-192, icon-512, apple-touch-icon), sostituisci i path in `layout.tsx` e aggiungi i file in `public/brand/` (vedi `public/brand/README.md`).

**Hero “light luxury”:** Già impostato (background #FAFAFA, accento #C8A65A, gradient sottile, glow controllato, noise) in `tailwind.config.ts` e `globals.css`; nessuna modifica in questo audit.

---

## 2. Checklist test

- [ ] **Lingue:** Apri `/it`, `/en`, `/de`, `/es`, `/fr`. Verifica che la sezione “Reliability by design” (e sottotitolo / bullet) sia nella lingua corretta; nessun blocco in italiano su `/en`.
- [ ] **Language switcher:** Cambia lingua dall’header → la pagina resta la stessa (es. da `/en/pricing` a `/it/pricing`).
- [ ] **Accesso admin:** Prova `/it/admin`, `/it/dashboard`, `/it/founder` → 404. In home nessun link a admin/founder.
- [ ] **Invio lead:** Compila il form su `/it/contact` (e opzionale con `?utm_source=test`); verifica in Supabase tabella `leads` la nuova riga e, se hai la migration UTM, i campi `page_path`, `utm_source`, `user_agent_hash`.
- [ ] **Favicon / icon:** Controlla in browser che favicon e apple-touch-icon si carichino (tab e “Aggiungi a Home” su iOS).

---

## 3. Rischi residui e come evitarli

| Rischio | Mitigazione |
|---------|-------------|
| **Lockfile / npm ci su Vercel** | Usare **Install Command** = `npm install` (non `npm ci`) in Vercel; vedi `docs/VERCEL_SUPABASE_SETUP.md`. |
| **Dati sensibili in log** | API lead: nessun log di email, nome, messaggio, user-agent in chiaro; solo `user_agent_hash` opzionale in DB. In caso di errori loggare solo “Supabase insert error” / “Lead API error” senza body. |
| **Supabase barbiere/pizzeria** | Usare **solo** il progetto Supabase dedicato (hubia-marketing / HŪBIA) per `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` in Vercel per hubia; non usare le stesse env di barbiere o pizzeria. |
| **Nuove stringhe hardcoded** | Ogni nuova stringa UI va in `messages/{locale}.json` e usata con `useTranslations` / `getTranslations`; nessun testo in italiano/inglese direttamente in JSX. |
| **Link a admin/founder** | Non aggiungere in hubia link a `/admin` o `/founder`; “Pannello amministrazione” resta solo copy. Se in futuro servisse una route protetta, metterla dietro middleware + auth (es. Basic Auth o Supabase Auth) e non linkarla dal marketing. |

---

## 4. Riepilogo requisiti

| Requisito | Stato |
|-----------|--------|
| A) Audit stringhe hardcoded; single source i18n; /en senza italiano | ✅ |
| B) i18n serio; /it default; switcher mantiene pagina; doc “aggiungere lingua” | ✅ |
| C) Founder/Admin non accessibili; “Pannello” solo marketing | ✅ |
| D) Lead su Supabase dedicato; tabella leads + UTM; RLS service_role; honeypot + rate limit; ENV e verifica documentate | ✅ |
| E) Favicon, apple-touch, icon 192/512, og:image; hero light luxury | ✅ |
