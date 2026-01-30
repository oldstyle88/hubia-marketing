# HŪBIA — Allineamento offerta e sito (output)

**Data:** 2026-01-30  
**Scope:** Prezzi e contenuti allineati a offerta reale: due piani **Essenziale** e **Avanzato**; verticali attivi Barbiere/Parrucchiere e Food (pizzeria, street food); soluzioni avanzate (es. palestra) solo su richiesta; Estetista rimosso.

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
| `messages/it.json` | Copy aggiornato: proof (Staff e disponibilità, analytics), forWho, howItWorks (setup rateizzabile, call conoscitiva), pricingTeaser, pricing (Essenziale/Avanzato, prezzi Barber vs Food), **plans** (Essenziale/Avanzato, feature), footer tagline. |
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
- **Valori applicati:**
  - **Barbiere / Parrucchieri (Essenziale):** Setup €900 – €1.500 (rateizzabile 6/12 mesi) + €69 – €129/mese.
  - **Food (pizzeria, street food) (Avanzato):** Setup €1.800 – €3.500 (rateizzabile 6/12 mesi) + €149 – €249/mese.
  - Palestra/Fitness: solo “soluzioni avanzate su richiesta”, non presentata come pronta.

### Matrice “piano → feature”

- **Docs:** `docs/HUBIA_COMMERCIAL_OFFER.md` **§7** (nuova sezione).
- **Sito:** `messages/*.json` → `plans.pro` e `plans.max` (name, description, features).  
  Le feature rispecchiano la matrice: PWA client + staff, prenotazioni/ordini, push, branding, analytics, supporto; Avanzato = tutto Essenziale + ordini/cucina/ritiro, logiche avanzate, supporto prioritario e configurazione guidata.

---

## 3. Checklist QA rapida

- [ ] **Italiano default**  
  - Visitare `/` (o base URL): redirect a `/it`.  
  - Contenuti in italiano senza aver selezionato lingua.

- [ ] **Language switch**  
  - Pulsante con icona globo (o bandiera) in header → dropdown compatto con bandiere + IT / EN / DE / ES / FR.  
  - Cambio lingua su home, pricing, contact: URL passa a `/[locale]/...` e testi nella lingua scelta.

- [ ] **Pricing corretto**  
  - Pagina Prezzi: **solo 2 piani** (Essenziale, Avanzato).  
  - Tabella “Prezzi per verticale”: Barbiere/Parrucchieri (Essenziale), Food (Avanzato). Setup rateizzabile 6/12 mesi evidenziato.  
  - Nessun piano “Basic”, “PRO”, “MAX” o “VIP”.  
  - Prezzi coerenti: Barber €900–1500 setup + €69–129/mese; Food €1800–3500 setup + €149–249/mese.

- [ ] **Niente “Provalo in anteprima”**  
  - Ricerca in tutto il sito: nessuna CTA o frase “Provalo in anteprima”.

- [ ] **Verticali**  
  - Copy e sezioni verticali: **Barbiere/Parrucchiere** e **Food** (pizzeria, street food) attivi; **Soluzioni avanzate** (es. palestra) solo su richiesta.  
  - **Estetista** non compare.

- [ ] **Setup e supporto**  
  - FAQ / howItWorks: setup include progettazione, configurazione, branding, test e go‑live; rateizzazione 6/12 mesi; “Ogni progetto parte da una call conoscitiva”, niente demo pubblica.  
  - Termini di servizio: piani “Essenziale e Avanzato”; descrizione servizio senza “pannello amministrazione” (area staff e gestione disponibilità).

- [ ] **Build**  
  - `npm run build` completa senza errori.

---

## 4. Riferimenti

- Offerta e definizioni: `docs/HUBIA_COMMERCIAL_OFFER.md`
- Prezzi e verticali: `docs/HUBIA_Prezzi_e_Abbonamenti.md`
- Matrice piano → feature: `HUBIA_COMMERCIAL_OFFER.md` §7
