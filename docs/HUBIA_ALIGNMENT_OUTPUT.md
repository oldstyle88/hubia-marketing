# HŪBIA — Allineamento offerta e sito (output)

**Data:** 2026-01-30  
**Scope:** Prezzi e contenuti allineati a offerta reale (solo PRO e MAX), verticali Barbiere/Pizzeria attivi, Palestra/Food prossimi, Estetista rimosso.

---

## 1. File modificati / nuovi

### Documenti

| File | Modifica |
|------|----------|
| `docs/HUBIA_COMMERCIAL_OFFER.md` | Definizioni esplicite **Pannello amministrazione (Dashboard staff)** e **Provisioning assistito** (Supabase+Vercel+env+branding PWA+seed+gate). Sezione **Matrice piano → feature** (§7). **Roadmap** per funzionalità non pronte (Coach Incassi, segmentazione VIP, ecc.). Estetista: “solo test, non compare nel sito”. |
| `docs/HUBIA_Prezzi_e_Abbonamenti.md` | Stesse definizioni, verticali e nota Estetista allineate. |
| `docs/HUBIA_Cosa_Include.md` | Supporto aggiornato: niente VIP/SLA; **Roadmap** per chat e “aggiornamenti in anteprima”. |
| `docs/HUBIA_ALIGNMENT_OUTPUT.md` | **Nuovo.** Questo file: elenco modifiche, matrice, QA. |

### Sito (UI, i18n, componenti)

| File | Modifica |
|------|----------|
| `i18n/routing.ts` | Nessuna modifica. `defaultLocale: 'it'` già impostato; lingue IT, EN, DE, ES, FR. |
| `components/LanguageSwitcher.tsx` | Dropdown compatto: label **IT / EN / DE / ES / FR** (no “Italiano”, “English”, …). Bandiere + label, `min-w` ridotta. |
| `components/LivePreview.tsx` | Rimosso verticale **Estetista (beauty)**. Solo **Barbiere** e **Pizzeria**. (LivePreview non usato in homepage.) |
| `app/[locale]/pricing/page.tsx` | Metadata description aggiornata: “Prezzi a partire da per verticale (Barbiere, Pizzeria, Palestra)”. |
| `messages/it.json` | Copy aggiornato: proof (Dashboard staff, analytics), forWho, howItWorks (provisioning completo), pricingTeaser, pricing (subtitle, footer, faq a1), **plans** (PRO/MAX, feature da docs), footer tagline. |
| `messages/en.json` | Allineato a `it.json` (proof, forWho, howItWorks, pricing, plans, footer). |
| `messages/de.json` | Idem. |
| `messages/es.json` | Idem. |
| `messages/fr.json` | Idem. |

### Rimosso

| File | Motivo |
|------|--------|
| `middleware.ts` | Duplicato di `proxy.ts`. Next.js 16 usa solo `proxy.ts`; presenza di entrambi causava errore di build. |

---

## 2. Dove sono stati aggiornati prezzi e matrice “piano → feature”

### Prezzi

- **Matrice prezzi (tabella “Prezzi per verticale”):**
  - `docs/HUBIA_COMMERCIAL_OFFER.md` (§6) e `docs/HUBIA_Prezzi_e_Abbonamenti.md`: già allineati (Barbiere, Pizzeria, Palestra “prossimo”).
  - Sito: `messages/*.json` → `pricing.verticalPricing.rows` e `pricing.prices` (pro/max setup + monthly).  
- **Valori (a partire da):**
  - **Barbiere:** PRO €499 setup + €149/mese, MAX €899 + €249/mese.
  - **Pizzeria:** PRO €699 + €199/mese, MAX €1190 + €349/mese.
  - **Palestra (prossimo):** PRO €899 + €249/mese, MAX €1390 + €399/mese.

### Matrice “piano → feature”

- **Docs:** `docs/HUBIA_COMMERCIAL_OFFER.md` **§7** (nuova sezione).
- **Sito:** `messages/*.json` → `plans.pro` e `plans.max` (name, description, features).  
  Le feature rispecchiano la matrice: PWA client + Dashboard staff, prenotazioni/ordini, push, branding, analytics, supporto; MAX = tutto PRO + multi‑sede, provisioning assistito per sede, priorità supporto.

---

## 3. Checklist QA rapida

- [ ] **Italiano default**  
  - Visitare `/` (o base URL): redirect a `/it`.  
  - Contenuti in italiano senza aver selezionato lingua.

- [ ] **Language switch**  
  - Pulsante con icona globo (o bandiera) in header → dropdown compatto con bandiere + IT / EN / DE / ES / FR.  
  - Cambio lingua su home, pricing, contact: URL passa a `/[locale]/...` e testi nella lingua scelta.

- [ ] **Pricing corretto**  
  - Pagina Prezzi: **solo 2 card** (PRO, MAX).  
  - Sotto: “Prezzi per verticale (a partire da)” con tabella Barbiere, Pizzeria, Palestra (prossimo).  
  - Nessun piano “Basic” o “VIP”.  
  - Prezzi “da €…” coerenti con i numeri sopra.

- [ ] **Niente “Provalo in anteprima”**  
  - Ricerca in tutto il sito: nessuna CTA o frase “Provalo in anteprima”.

- [ ] **Verticali**  
  - Copy e sezioni verticali: **Barbiere** e **Pizzeria** attivi; **Palestra** e **Food** “prossimi”.  
  - **Estetista** non compare.

- [ ] **Provisioning e Dashboard**  
  - FAQ / howItWorks: “Provisioning assistito” = Supabase + Vercel + env + branding PWA + seed + gate go‑live.  
  - “Pannello amministrazione” / “Dashboard staff” usati in modo coerente con i docs.

- [ ] **Build**  
  - `npm run build` completa senza errori.

---

## 4. Riferimenti

- Offerta e definizioni: `docs/HUBIA_COMMERCIAL_OFFER.md`
- Prezzi e verticali: `docs/HUBIA_Prezzi_e_Abbonamenti.md`
- Matrice piano → feature: `HUBIA_COMMERCIAL_OFFER.md` §7
