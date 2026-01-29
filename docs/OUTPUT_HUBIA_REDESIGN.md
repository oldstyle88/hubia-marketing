# Output upgrade “light luxury premium WOW” — HŪBIA

## Elenco file modificati / nuovi

### Nuovi
- `messages/it.json`, `messages/en.json`, `messages/de.json`, `messages/es.json`, `messages/fr.json` — i18n
- `middleware.ts` — next-intl middleware (locale redirect)
- `app/[locale]/layout.tsx` — layout con NextIntlClientProvider
- `app/[locale]/page.tsx` — Home tradotta
- `app/[locale]/pricing/page.tsx` — Prezzi (PRO + Elite)
- `app/[locale]/contact/page.tsx` — Contatti (con honeypot, phone, locale, source_page)
- `app/[locale]/privacy/page.tsx` — Privacy Policy
- `app/[locale]/terms/page.tsx` — Termini di Servizio
- `components/LanguageSwitcher.tsx` — switcher lingua in header (IT, EN, DE, ES, FR)
- `supabase/migrations/20260129100000_leads_table.sql` — tabella `leads` (no filesystem, RLS service_role)
- `public/brand/logoMark.png` — copia di hubia-logo per uso mark (opzionale sostituire con variante trasparente)

### Modificati
- `next.config.js` — plugin `createNextIntlPlugin('./i18n/request.ts')`
- `app/layout.tsx` — invariato (metadata, font, favicon)
- `i18n/request.ts` — già configurato per messaggi
- `i18n/routing.ts` — già configurato (locales: it, en, de, es, fr; defaultLocale: it)
- `components/Header.tsx` — next-intl Link, useTranslations, LanguageSwitcher, logoMark/hubia fallback
- `components/Footer.tsx` — next-intl Link, getTranslations (async), label tradotte
- `components/Hero.tsx` — props tradotte, light luxury (#FAFAFA), gold signature, product mock placeholder, “Pannello amministrazione”
- `components/Button.tsx` — next-intl Link, primary = gradient gold
- `components/PricingTable.tsx` — label tradotte (perMonth, setupOneTime, requestDemo)
- `components/PwaOnlyBlock.tsx` — props title/body tradotte
- `app/api/lead/route.ts` — Supabase `leads` con service_role, honeypot, phone, locale, source_page, cooldown, rate limit
- `tailwind.config.ts` — hero #FAFAFA, gold #C8A65A, gradient-gold, glow-gold
- `app/globals.css` — hero orbit/shimmer gold, logo-glow gold, hero-noise
- `public/brand/README.md` — logoMark, logoWordmark, favicon e fallback

### Rimossi
- `app/page.tsx`, `app/pricing/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` — sostituiti da `app/[locale]/...`

---

## Cosa è cambiato

- **Lingua:** Default italiano; i18n IT, EN, DE, ES, FR con next-intl. Routing `/it`, `/en`, `/de`, `/es`, `/fr`. Language switcher in header (discreto). Tutte le pagine (Home, Pricing, Contact, Privacy, Terms) tradotte.
- **Pricing:** Solo 2 piani — PRO (singolo locale) e Elite (multi-locale + priorità + setup avanzato). Niente Basic/Starter. CTA “Richiedi demo”. Founder Dashboard rinominata in “Pannello amministrazione” ovunque.
- **Founder Dashboard:** Non compare come feature; sostituita da “Pannello amministrazione” nei testi. Nessuna route founder/admin esposta.
- **Hero “light luxury”:** Sfondo #FAFAFA, accento oro #C8A65A (gradient, glow, orbit/shimmer gold). Product mock placeholder in hero. Effetto signature: gradient subtle + noise (CSS).
- **Logo e branding:** Supporto logoMark, logoWordmark, favicon; fallback a hubia-logo e poi testo “HŪBIA” se mancano asset. Build non dipende dalla presenza dei file.
- **Lead capture:** Niente filesystem. Tabella Supabase `leads` (created_at, name, email, phone, message, locale, source_page, business). RLS: nessuna lettura pubblica; insert solo con service_role (API server-side). Rate limit (5 req/min), cooldown 30s, honeypot (campo `website`).

---

## Checklist manuale

- [ ] **Lingua:** Apri `/it`, `/en`, `/de`, `/es`, `/fr` — contenuti nella lingua corretta. Switcher in header cambia lingua mantenendo path (es. /it/pricing → /en/pricing).
- [ ] **Pricing:** Solo PRO e Elite in Home e in /pricing. Nessun “Basic/Starter”. Testi “Pannello amministrazione” (no “Founder Dashboard”).
- [ ] **Form contatti:** Invia da /contact; verifica record in Supabase tabella `leads`. Campi: name, email, phone (opzionale), message, locale, source_page. Honeypot: se compili “website” la richiesta non viene salvata. Rate limit: >5 invii/min da stesso IP → 429. Cooldown: secondo invio entro 30s → 429.
- [ ] **Performance / build:** Esegui `npm install` (da root monorepo o da `apps/hubia`) poi `npm run build` in `apps/hubia`. Build deve passare. Su Vercel: impostare `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` per l’API lead; opzionale `NEXT_PUBLIC_SUPABASE_URL` se usi client Supabase altrove.

---

## Build Vercel

- **Install:** Da root monorepo `npm install` (o da `apps/hubia`). Il plugin next-intl è in `next-intl/plugin`; se il build fallisce con “Cannot find module 'next-intl/plugin'”, assicurarsi che le dipendenze siano installate (es. da root: `npm install`).
- **Env:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` per l’API `/api/lead`. Opzionale: `NEXT_PUBLIC_BASE_URL` per metadata.
- **Migrazione:** Eseguire le migration Supabase (in particolare `20260129100000_leads_table.sql`) per creare la tabella `leads` prima di usare il form.

---

## Riepilogo requisiti P0

| Requisito | Stato |
|-----------|--------|
| 1. Lingua IT default, i18n IT/EN/DE/ES/FR, routing locale, switcher | ✅ |
| 2. Pricing solo Pro + Elite, CTA “Richiedi demo”, benefit concreti | ✅ |
| 3. Founder Dashboard non visibile; “Pannello amministrazione” | ✅ |
| 4. Hero light luxury #FAFAFA, #C8A65A, signature effect, product mock | ✅ |
| 5. Logo logoMark/logoWordmark/favicon con fallback | ✅ |
| 6. Lead su Supabase `leads`, no filesystem, RLS service_role, honeypot, rate limit | ✅ |
