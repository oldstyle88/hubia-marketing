# Report tecnico: struttura e routing Next.js — HUBIA

Analisi basata sul codice attuale del repository (App Router, next-intl, Vercel).

---

## 1. Tipo di router utilizzato

| Domanda | Risposta |
|--------|-----------|
| **Usa App Router (`/app`)?** | **Sì.** Tutte le route applicative sono sotto `app/`. |
| **Usa Pages Router (`/pages`)?** | **No.** La cartella `pages/` non esiste. |
| **Entrambi?** | No. Solo App Router. |
| **Quali route da chi?** | N/A. |

**Conclusione:** Il progetto è **solo App Router**. Nessun conflitto App vs Pages a livello di file system.

---

## 2. Struttura routing

### 2.1 Route generate (effettive in produzione)

Dopo **Vercel redirects/rewrites** e **Next.js**:

| URL richiesto | Chi risponde | Cosa viene servito |
|---------------|--------------|--------------------|
| `/` | Vercel redirect | 302 → `/it` |
| `/landing.html` | Vercel redirect | 302 → `/it` |
| `/it` | Vercel rewrite | **File statico** `public/landing.html` (HTML/CSS/JS inline, single page “bianca”) |
| `/it/` | Vercel rewrite | Come `/it` → `public/landing.html` |
| `/en`, `/en/`, `/en/privacy`, `/en/contact`, ecc. | Next.js App Router | App React (layout + page sotto `app/[locale]/...`) |
| `/de`, `/es`, `/fr` (+ sottopagine) | Next.js App Router | Idem |
| `/api/lead` | Next.js App Router | Route handler POST in `app/api/lead/route.ts` |

Le route **Next.js** (quelle non riscritte da Vercel) sono:

- `/[locale]` → home (`app/[locale]/page.tsx`)
- `/[locale]/privacy` → privacy
- `/[locale]/contact` → contatti
- `/[locale]/terms` → termini
- `/[locale]/pricing` → prezzi
- `/[locale]` con `locale ∈ { it, en, de, es, fr }` (definito in `i18n/routing.ts`).

**Nota:** La richiesta **`/it`** (e `/it/`) **non arriva mai a Next.js**: Vercel la riscrive a `/landing.html`, quindi viene servito il file statico. Le altre lingue (`/en`, `/de`, `/es`, `/fr`) sono gestite interamente dall’App Router.

### 2.2 Layout per route

| Route (Next.js) | Layout root | Layout `[locale]` |
|------------------|-------------|-------------------|
| `/[locale]`, `/[locale]/privacy`, `/[locale]/contact`, `/[locale]/terms`, `/[locale]/pricing` | `app/layout.tsx` | `app/[locale]/layout.tsx` |

- **Layout root** (`app/layout.tsx`): `<html>`, font (Inter), `globals.css`, metadata, favicon. Non ha segmenti condivisi oltre body.
- **Layout locale** (`app/[locale]/layout.tsx`): wrappa i figli in `NextIntlClientProvider` (locale + messages). Usato da tutte le page sotto `[locale]`.

Nessun altro layout annidato (es. nessun `app/[locale]/dashboard/layout.tsx`).

### 2.3 Route dinamiche

- **`[locale]`**: unica route dinamica. Valori ammessi: `it`, `en`, `de`, `es`, `fr` (da `i18n/routing.ts`).
- Nessun `[slug]`, `[id]`, `[...rest]` nel progetto.

### 2.4 Route parallele / intercepting

- Nessuna cartella `@folder` (parallel routes).
- Nessuna cartella `(.)`, `(..)` (intercepting routes).

---

## 3. Middleware (proxy.ts in Next.js 16)

- **File:** `proxy.ts` in root (Next.js 16 usa `proxy.ts` al posto di `middleware.ts`).
- **Contenuto:**  
  `import createMiddleware from 'next-intl/middleware'` + `export default createMiddleware(routing)`  
  con `routing` da `i18n/routing.ts` (locales: it, en, de, es, fr; defaultLocale: it; localePrefix: 'always').
- **Matcher:**  
  `['/((?!api|_next|_vercel|.*\\..*).*)']` → esegue su tutte le richieste **eccetto** `/api/*`, `_next`, `_vercel`, e richieste con estensione (file statici).

**Cosa fa (next-intl):**

- Normalizza/redirect per locale (es. default locale, prefisso sempre presente).
- **Non** modifica header custom, **non** gestisce tenant/dominio, **non** fa auth: solo i18n.

**Nota:** Le richieste a `/it` e `/it/` su Vercel sono **riscritte** a `/landing.html` **prima** del middleware Next.js, quindi il proxy next-intl non vede mai la richiesta “/it” come path Next.js; vede solo le richieste che arrivano effettivamente a Next (es. `/en`, `/de`, ecc.).

---

## 4. Configurazione next.config.js

- **next.config.js:**  
  - `output: 'standalone'`  
  - `reactStrictMode: true`  
  - `turbopack.root`  
  - Plugin `withNextIntl` (punta a `./i18n/request.ts`).  
  - **Nessun** `rewrites`, `redirects`, `basePath`, `assetPrefix`, `experimental.*` nel file.

- **vercel.json** (sovrascrive/estende a livello di hosting):
  - **redirects:**  
    - `/` → `/it` (permanent: false)  
    - `/landing.html` → `/it` (permanent: false)
  - **rewrites:**  
    - `/it` → `/landing.html`  
    - `/it/` → `/landing.html`

Quindi: **rewrites e redirects sono solo in Vercel**, non in `next.config.js`.

---

## 5. Variabili d’ambiente

Usate nel codice:

| Variabile | Dove | Uso |
|-----------|------|-----|
| `NEXT_PUBLIC_BASE_URL` | `app/layout.tsx` | `metadataBase` (fallback `https://hubia.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` o `SUPABASE_URL` | `app/api/lead/route.ts` | Client Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `app/api/lead/route.ts` | Scrittura lead (obbligatoria in prod) |
| `RESEND_API_KEY` | `app/api/lead/route.ts` | Invio email notifica lead (opzionale) |
| `LEAD_NOTIFICATION_EMAIL` | `app/api/lead/route.ts` | Destinatario notifica (opzionale) |
| `RESEND_FROM_EMAIL` | `app/api/lead/route.ts` | Mittente email (opzionale) |
| `NODE_ENV` | `app/[locale]/pricing/page.tsx` | Solo `development`: log warning per chiavi i18n non risolte |

`.env.example` documenta Supabase + Resend. Nessuna logica condizionale per dominio o env oltre a `NODE_ENV` per il warning in pricing.

---

## 6. Rendering (per route principali)

Tutte le page sotto `app/[locale]` sono **Server Components** di default (nessun `'use client'` nelle page).

| Route | SSG/SSR/ISR | Note |
|-------|-------------|------|
| `app/[locale]/page.tsx` | **SSG** | `generateStaticParams` in `app/[locale]/layout.tsx` → pregenera per it, en, de, es, fr. Nessun `dynamic` o `revalidate`. |
| `app/[locale]/privacy/page.tsx` | **SSG** | Stesso layout, nessun `dynamic`. |
| `app/[locale]/terms/page.tsx` | **SSG** | Idem. |
| `app/[locale]/pricing/page.tsx` | **SSG** | Idem. |
| `app/[locale]/contact/page.tsx` | **SSG** | Idem (page è server; `ContactForm` è client). |
| `app/api/lead/route.ts` | N/A | Route handler; esecuzione on-request (lato server). |

- **Nessun** `export const dynamic = 'force-dynamic'` o `'force-static'` nelle page.
- **Nessun** `revalidate` (ISR) nel codice.
- Componenti con **`'use client'`** (hydration lato client): Header, Hero, Footer (via componenti), ContactForm, FAQAccordion, LanguageSwitcher, varie landing (BenefitsSection, PricingSection, CTASection, PlaceholderDemo), Logo/HubiaLogo, ecc. (elenco completo da `grep 'use client'`).

Riassunto: **tutte le page sono SSG**; le parti interattive sono Client Components importate dalle page.

---

## 7. Multi-tenant / dominio

- **Nessun** comportamento multi-tenant nel codice.
- **Nessuna** lettura di `host` o dominio per cambiare layout, tenant o contenuti.
- **Nessun** subdomain routing.
- La sola “variante” per path è il **locale** (`[locale]`), non il dominio.

---

## 8. Layout principali

- **Layout root:** `app/layout.tsx` (unico root). Fornisce `<html>`, font, CSS globale, metadata.
- **Un solo layout root;** nessun layout root alternativo (es. per dominio).
- **Layout “secondario”:** `app/[locale]/layout.tsx` (NextIntlClientProvider). Usato per tutte le page marketing (home, privacy, contact, terms, pricing). Nessun layout separato per “dashboard” o altre aree (non esistono).

---

## 9. Perché due “pagine” possono risultare completamente diverse

Causa principale nel setup attuale:

- **`/it` (e `/it/`)**: servite da **Vercel rewrite** → `public/landing.html`. È un **file HTML statico** (single page con stile/script inline), **non** l’app Next.js. Quindi: nessun React, nessun layout `app/`, nessun next-intl lato app.
- **`/en`, `/de`, `/es`, `/fr`** (e sottopagine): servite da **Next.js** → `app/[locale]/*`. Sono **React** con layout, next-intl, componenti condivisi.

Quindi:

- **Italiano:** una landing statica (design “bianco”, single page).
- **Altre lingue:** app Next.js con design e componenti React.

Altre cause possibili (secondarie):

- **Cache:** browser o CDN che servono una versione vecchia per una delle due (es. solo per `/it` o solo per le altre).
- **Build:** `public/landing.html` aggiornato a mano (o da script) mentre le page Next sono da build; se non si aggiorna `landing.html` dopo cambi alla landing, le due “versioni” divergono.

---

## 10. Diagramma sintetico

```
                    [Richiesta utente]
                            │
                            ▼
                    ┌───────────────┐
                    │   Vercel      │
                    │ redirects/    │
                    │ rewrites      │
                    └───────┬───────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
      path === /      path === /it      path === /en|de|es|fr
      path === /landing.html   /it/            (o sottopagine)
         │                  │                  │
         │  redirect 302    │  rewrite          │  passa a Next.js
         ▼                  ▼                  ▼
      destination: /it   destination:     ┌─────────────────┐
                        /landing.html     │ Next.js         │
                                │         │ proxy.ts        │
                                │         │ (next-intl)     │
                                ▼         └────────┬────────┘
                        ┌───────────────┐          │
                        │ Static file   │          │  matcher: non api/_next/static/file
                        │ public/       │          ▼
                        │ landing.html  │     ┌─────────────────┐
                        └───────────────┘     │ App Router      │
                                              │ app/layout.tsx   │
                                              │   └ app/[locale]/layout.tsx
                                              │        └ page.tsx (o privacy|contact|terms|pricing)
                                              └─────────────────┘
```

Flusso in parole:

1. **Vercel** fa redirect `/` e `/landing.html` → `/it`, e rewrite `/it`, `/it/` → `/landing.html`.
2. **`/it`** → sempre **statico** `public/landing.html` (nessun Next.js).
3. **Altre lingue** → richiesta arriva a **Next.js** → **proxy.ts** (next-intl) → **App Router** → **layout root** → **layout [locale]** → **page**.

---

## 11. Conflitti e rischi (analisi aggressiva)

### 11.1 App Router vs Pages Router

- **Nessun conflitto:** non esiste `pages/`. Solo `app/`.

### 11.2 Route “duplicate” (stesso path, contenuto diverso)

- **`/it`** è “duplicata” in senso logico:
  - **Vercel:** `/it` → `landing.html` (statico).
  - **Next.js:** esisterebbe anche `app/[locale]/page.tsx` per `locale === 'it'`, ma **non viene mai usata** per `/it` perché Vercel riscrive prima. Quindi non c’è duplicato effettivo a runtime: `/it` è sempre la landing statica.

### 11.3 Layout che sovrascrivono altri layout

- Un solo layout root e un solo layout sotto `[locale]`. Nessuna override tra layout (nessun layout alternativo per stesso segmento).

### 11.4 Rendering condizionale per dominio o env

- **Dominio:** nessuna logica.
- **Env:** solo `NODE_ENV === 'development'` in `pricing/page.tsx` per un `console.warn` su chiavi i18n; non cambia layout né contenuto visibile.

### 11.5 Altri punti di attenzione

- **proxy.ts:** in Next.js 16 la convenzione è `proxy.ts` con export della funzione proxy; il progetto ha `export default createMiddleware(routing)`. Se la piattaforma si aspetta un named export `proxy`, potrebbe essere da verificare (es. `export const proxy = createMiddleware(routing)` o equivalente secondo docs Next 16).
- **Standalone + public:** con `output: 'standalone'`, la cartella `public/` non è sempre copiata nel build standalone; su Vercel di solito gli asset in `public/` sono comunque serviti. Se in produzione `landing.html` o altri file in `public/` non fossero trovati, andrebbe verificata la configurazione di deploy (Vercel gestisce spesso `public` a parte).
- **Locale “it” solo static:** se in futuro si volesse che anche `/it` sia la stessa app React delle altre lingue, andrebbe rimossa la rewrite da `/it` a `/landing.html` in `vercel.json` (e eventualmente spostare la landing statica su un altro path, es. `/landing` o `/lp`).

---

*Report generato dall’analisi del codice in repo (Next.js App Router, next-intl, Vercel).*
