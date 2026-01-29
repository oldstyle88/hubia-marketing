# HUBIA marketing — upgrade WOW light-luxury

Obiettivi P0 affrontati: separazione totale da Founder Dashboard, i18n IT default, 2 piani PRO+MAX, fix prerender/build.

---

## 1. Founder Dashboard: perché si vedeva e come è stato eliminato

### Perché prima si vedeva

1. **Pagine root duplicate senza locale**  
   Esistevano **quattro pagine fuori da `[locale]`**:  
   `app/contact/page.tsx`, `app/pricing/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`.  
   Next.js le serviva su `/contact`, `/pricing`, `/privacy`, `/terms` (senza prefisso lingua).  
   Su **`/pricing`** il copy del piano MAX era **hardcoded** con la dicitura **"Founder dashboard"** e **"Founder dashboard + provisioning assistito"**.  
   Chi arrivava su `/pricing` vedeva quindi la Founder Dashboard nominata esplicitamente nel marketing.

2. **Nessun link a founder/admin**  
   In `apps/hubia` non ci sono link a `/founder`, `/admin` o `/dashboard` (verificato con grep).  
   Le proof card in home usano solo i testi i18n "Pannello amministrazione" / "Admin panel" (nessuna route founder).

3. **Possibile causa degli errori di prerender**  
   La pagina root `app/contact/page.tsx` era un client component che importava `Footer` (server async con `getTranslations`).  
   In Next 14 App Router questo può causare errori in fase di prerender; le altre root (pricing, privacy, terms) duplicavano le [locale] e potevano creare conflitti.

### Come è stato eliminato

1. **Rimosse le quattro pagine root**  
   Eliminati:  
   `app/contact/page.tsx`, `app/pricing/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`.  
   Ora **tutto il marketing vive solo sotto `app/[locale]/`**.  
   Non esiste più una pagina `/pricing` con copy "Founder dashboard": solo `/it/pricing`, `/en/pricing`, ecc., con testi da `messages` (solo "Pannello amministrazione" / "Admin panel", mai "Founder").

2. **Copy sempre “product”, mai “Founder”**  
   Nei file `messages/*.json` i piani usano già "Pannello amministrazione" / "Admin panel" / "Panneau d'administration" ecc.  
   Il piano è stato rinominato da "Elite" a **"MAX"**; la feature resta descritta come "Pannello amministrazione + provisioning assistito" (o equivalente in lingua), senza mai usare la parola "Founder" nel sito marketing.

3. **Route founder/admin in hubia**  
   In `apps/hubia` **non esistono** route `/founder`, `/admin`, `/dashboard`.  
   La Founder Dashboard vive in un’altra app (es. barbiere-app).  
   Il marketing hubia non la linka e non la nomina; non serve middleware o meta noindex per route founder in hubia (non ci sono).

4. **Sitemap**  
   Al momento non c’è un file `sitemap.ts` in hubia.  
   Quando lo aggiungerai, includere solo path localizzati (es. `/it`, `/it/pricing`, `/en`, …) e **non** includere path founder/admin (inesistenti in hubia).

**Output:** La Founder Dashboard non è più esposta perché (a) è sparita la pagina `/pricing` con copy "Founder dashboard", (b) tutto il traffico passa da `[locale]` con testi i18n “Pannello amministrazione”, (c) nessun link e nessuna route founder nel progetto hubia.

---

## 2. Checklist Founder nascosto

- [x] Nessun link a `/founder`, `/admin`, `/dashboard` in menu/footer/pagine.
- [x] Nessuna pagina marketing con copy "Founder dashboard" (rimossa root `/pricing`, copy da messaggi con "Pannello amministrazione").
- [x] Solo route `[locale]` (it, en, de, es, fr); nessuna route pubblica founder in hubia.
- [ ] Quando aggiungi sitemap: includere solo URL marketing localizzati, mai founder/admin.

---

## 3. i18n — default IT, 5 lingue

- **Default:** `it` (in `i18n/routing.ts`: `defaultLocale: 'it'`).
- **Lingue:** `it`, `en`, `de`, `es`, `fr` (`locales` in `routing`).
- **URL:** `localePrefix: 'always'` → sempre `/it`, `/en`, … (es. `/it/pricing`, `/en/contact`).
- **Middleware:** `next-intl` reindirizza `/` → `/it` (e gestisce prefisso lingua).

### File i18n e struttura dizionari

| File | Contenuto |
|------|-----------|
| `i18n/routing.ts` | `locales`, `defaultLocale`, `localePrefix` |
| `i18n/request.ts` | Caricamento messaggi per locale |
| `messages/it.json` | Tutte le chiavi in italiano (nav, home, pricing, plans, contact, footer, privacy, terms, faq) |
| `messages/en.json` | Stesso schema in inglese |
| `messages/de.json` | Tedesco |
| `messages/es.json` | Spagnolo |
| `messages/fr.json` | Francese |

Struttura principale: `nav`, `home` (hero, proof, forWho, features, howItWorks, reliability, pricingTeaser, faq, faqItems), `pricing`, `plans` (pro, max), `contact`, `footer`, `privacy`, `terms`.

Componenti che usano i18n: `Header` (nav + LanguageSwitcher), `Footer`, `Hero`, `ContactForm`, `PricingTable`, `FAQAccordion`, pagine `[locale]/*` con `getTranslations` / `useTranslations`.

---

## 4. Checklist i18n

- [x] Default lingua: IT.
- [x] Lingue: it, en, de, es, fr.
- [x] Switch lingua in header (LanguageSwitcher).
- [x] URL con prefisso lingua (/it, /en, …).
- [x] Home, Pricing, Contact, Privacy, Terms e componenti (FAQ, pricing table, CTA) da messaggi; nessuna stringa hardcoded mista IT/EN.

---

## 5. Pricing — solo 2 piani (PRO + MAX)

- **Piano 1:** PRO — singolo locale, setup + canone (€499 setup, €149/mese).
- **Piano 2:** MAX — multi-locale, “founder tools”, automazioni (€799 setup, €249/mese).  
  Copy: "Pannello amministrazione + provisioning assistito", analytics, SLA, audit pre-go-live (nessun uso della parola "Founder" nel marketing).

Copy e struttura in `messages/*.json` sotto `plans.pro` e `plans.max`; CTA "Richiedi demo" / "Parla con noi" da `pricing.requestDemo` e link contatto.

---

## 6. Fix prerender / build errors

### Causa

- Presenza di **pagine root** `app/contact`, `app/pricing`, `app/privacy`, `app/terms` (duplicate rispetto a `[locale]`).
- La root **contact** era un client component che importava **Footer** (server async): in prerender questo può generare errori in Next 14.

### Intervento

- Eliminate le quattro pagine root.
- Tutto il marketing è sotto `app/[locale]/` (contact, pricing, privacy, terms + home).
- **Risultato:** `npm run build` completa senza errori di prerender (Generating static pages 29/29, nessun Export error).

---

## 7. File modificati / rimossi

| Azione | Path |
|--------|------|
| Rimosso | `app/contact/page.tsx` |
| Rimosso | `app/pricing/page.tsx` |
| Rimosso | `app/privacy/page.tsx` |
| Rimosso | `app/terms/page.tsx` |
| Modificato | `messages/it.json` — elite → max, "Elite" → "MAX", cta/subtitle/a6 |
| Modificato | `messages/en.json` — idem |
| Modificato | `messages/de.json` — idem |
| Modificato | `messages/es.json` — idem |
| Modificato | `messages/fr.json` — idem |
| Modificato | `app/[locale]/pricing/page.tsx` — tPlans('elite.*') → tPlans('max.*'), description |
| Modificato | `app/[locale]/page.tsx` — piani da elite a max |
| Creato | `docs/HUBIA_MARKETING_WOW_UPGRADE.md` |

---

## 8. Checklist deploy (monorepo)

- [x] `npm run build` ok (nessun errore prerender).
- [ ] Vercel: Root Directory = `apps/hubia`; Install Command = `npm install` (consigliato per monorepo).
- [ ] Variabili d’ambiente: solo quelle del marketing (es. Supabase hubia-marketing per lead); nessuna chiave founder/admin esposta.
- [ ] Dominio hubiasystem.com: configurato in Vercel come custom domain per il progetto hubia.

---

## 9. Prima / Dopo (testuale)

| Area | Prima | Dopo |
|------|--------|------|
| **Founder** | Pagina `/pricing` (root) con copy "Founder dashboard" nel piano MAX. | Solo `/it/pricing`, `/en/pricing`, …; copy "Pannello amministrazione" / "Admin panel"; nessuna menzione "Founder". |
| **Route** | 4 pagine root (contact, pricing, privacy, terms) + [locale]. | Solo [locale]; / → redirect /it. |
| **Pricing** | Piani PRO e Elite; root pricing con "Founder dashboard". | Piani PRO e MAX; copy da i18n, nessun "Founder". |
| **Build** | Errori prerender su contact, pricing, privacy, terms. | Build ok, 29/29 static pages. |
| **i18n** | IT default, 5 lingue già presenti; piano "Elite". | IT default, 5 lingue; piano rinominato "MAX"; tutto da messaggi. |

---

## 10. Look & feel / Logo (stato attuale)

- **Look:** Dark luxury già applicato (palette background/surface, accent blu/viola/pink, gradient, glow controllato). Vedi `docs/DESIGN_SYSTEM_HUBIA_DARK_LUXURY.md`.
- **Logo hero:** `HubiaLogoConnection` (due archi + nodo + HŪBIA, variant dark, loop morbido).  
- **Logo header:** `Logo` (simbolo H + HŪBIA) o eventuale variante wordmark.  
- **Token:** Colori e spacing in `tailwind.config.ts` e `globals.css`.  
Per allineare ulteriormente a “wow light-luxury” con oro/avorio e font premium si può estendere il design system e i token in un secondo passo (P0.4/P0.5).

---

## 11. Lead / Supabase (P1)

- API lead: `app/api/lead/route.ts` (salvataggio su Supabase con service role).  
- Migration e setup: vedi `docs/VERCEL_SUPABASE_SETUP.md` (tabella leads, RLS, env su Vercel, dove eseguire lo SQL in Supabase).  
- Rate limit e honeypot già previsti nell’API.

---

## 12. SEO / dominio hubiasystem.com (P1)

- Metadata per pagina/lingua: da estendere in `app/[locale]/layout.tsx` e nelle singole pagine (title, description, openGraph, alternates hreflang).  
- Favicon / apple-touch: vedi `app/layout.tsx` e `public/brand/README.md`.  
- Per dominio hubiasystem.com: aggiungere il dominio in Vercel al progetto hubia e, se serve, variabile `NEXT_PUBLIC_BASE_URL` o `metadataBase` per canonical e OG.
