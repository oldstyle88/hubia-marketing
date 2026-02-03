# HUBIA — Mappa prezzi/piani (as-is, evidence-based)

Riferimenti reali: route → componente → sorgente dati (file + chiavi).

---

## Route che mostrano prezzi/piani

| Route | Descrizione |
|-------|-------------|
| `/[locale]` (es. `/it`) | Home: sezione "I piani" (2 card) + sezione "Progetti su misura" |
| `/[locale]/pricing` (es. `/it/pricing`) | Pagina Prezzi: tabella 2 piani, blocco PWA, tabella "Prezzi per verticale", FAQ |

Nessuna altra pagina (contact, privacy, terms) mostra prezzi; i Termini citano "pagina Prezzi" e "Studio e Operativo" in testo statico.

---

## 1. Home — `/[locale]`

**File pagina:** `app/[locale]/page.tsx`

| Elemento UI | Componente | Sorgente dati | File + chiavi |
|-------------|------------|---------------|----------------|
| Titolo sezione "I piani" | `<h2>` in page.tsx | `t('plansHome.title')` | `messages/{locale}.json` → `home.plansHome.title` |
| Sottotitolo | `<p>` | `t('plansHome.subtitle')` | `home.plansHome.subtitle` |
| Card 1 (Studio) | `<Card>` (inline) | `plansHome.studioName`, `studioForWho`, `studioIncludes[]`, `studioSetup`, `studioSetupNote`, `studioCanone` | `home.plansHome.*` (it.json ~52–67) |
| Card 2 (Signature) | `<Card>` (inline) | `plansHome.signatureName`, `signatureForWho`, `signatureIncludes[]`, `signatureSetup`, `signatureSetupNote`, `signatureCanone` | `home.plansHome.*` (it.json ~68–78) |
| Sezione "Progetti su misura" | `<Section>` + h2 + p | `t('projectsCustom.title')`, `t('projectsCustom.text')` | `home.projectsCustom.title`, `home.projectsCustom.text` (it.json ~81–82) |

**Dati piani (valori IT attuali):**
- Studio: setup `€900 – €1.500`, canone `€69 – €129 / mese` (range)
- Signature: setup `€1.200 – €1.800`, canone `€99 – €149 / mese` (range)
- Progetti su misura: solo testo, nessun prezzo in lista (già ok)

**Note:** La lista "include" è in `home.plansHome.studioIncludes` e `signatureIncludes` (array di stringhe). Nessun CMS/MDX: tutto in JSON i18n.

---

## 2. Pagina Prezzi — `/[locale]/pricing`

**File pagina:** `app/[locale]/pricing/page.tsx`

| Elemento UI | Componente | Sorgente dati | File + chiavi |
|-------------|------------|---------------|----------------|
| H1, sottotitolo | inline | `t('title')`, `t('subtitle')` | `messages/{locale}.json` → `pricing.title`, `pricing.subtitle` |
| Blocco PWA | `PwaOnlyBlock` | `t('pwaBlock.title')`, `t('pwaBlock.body')` | `pricing.pwaBlock.*` |
| Tabella 2 piani | `PricingTable` | Array `plans` costruito in page (righe 39–57): nome/descrizione da `plans.pro` / `plans.max`, prezzi da `pricing.prices.pro` / `pricing.prices.max` | `plans.pro.*`, `plans.max.*`, `pricing.prices.pro.*`, `pricing.prices.max.*` |
| Footer sotto tabella | inline | `t('footer')`, `t('setupIncludes')` | `pricing.footer`, `pricing.setupIncludes` |
| Tabella "Prezzi per verticale" | inline (grid) | `t('verticalPricing.title')`, `t('verticalPricing.note')`, `t('verticalPricing.columns.*')`, `t.raw('verticalPricing.rows')` | `pricing.verticalPricing.*` (it.json ~139–158) |
| FAQ | `FAQAccordion` | `t('faq.q1'..'q3')`, `t('faq.a1'..'a3')` | `pricing.faq.*` |
| CTA | `Button` + `Link` | `t('requestDemo')`, `t('contactCta')` | `pricing.requestDemo`, `pricing.contactCta` |

**Componente condiviso:** `components/PricingTable.tsx` — riceve `plans[]` con `name`, `description`, `setupFee`, `monthly`, `features[]`, `highlight`, `badge`; non legge da file, solo props.

**Dati piani (valori IT attuali):**
- Piano 1 (pro): `plans.pro.name` = "Studio", `pricing.prices.pro.setup` = "€900 – €1.500", `pricing.prices.pro.monthly` = "€69 – €129"
- Piano 2 (max): `plans.max.name` = "Operativo", `pricing.prices.max.setup` = "€1.800 – €3.500", `pricing.prices.max.monthly` = "€149 – €249"
- Tabella verticale: 2 righe (Beauty con range Studio / "Su richiesta"; Ristorazione "Su richiesta" / range Operativo)

**Meta:** `generateMetadata()` in pricing/page.tsx usa `t('title')` e description hardcoded che cita "Studio (Beauty) e Operativo (Ristorazione)".

---

## 3. Riepilogo sorgenti dati

| Sorgente | Contenuto prezzi/piani |
|----------|-------------------------|
| `messages/it.json` | `home.plansHome.*` (Studio/Signature con range), `home.projectsCustom.*`, `pricing.*` (title, subtitle, prices.pro/max, verticalPricing, faq), `plans.pro` / `plans.max` (nome, descrizione, features) |
| `messages/en.json` | Stessa struttura (en) |
| `messages/de.json` | Stessa struttura (de) |
| `messages/es.json` | Stessa struttura (es) |
| `messages/fr.json` | Stessa struttura (fr) |

Nessun CMS, config TS/JS separato per prezzi, né markdown/MDX: solo JSON i18n.

---

## 4. Dove sono i range "da–a"

- `home.plansHome.studioSetup` / `studioCanone` — "€900 – €1.500", "€69 – €129 / mese"
- `home.plansHome.signatureSetup` / `signatureCanone` — "€1.200 – €1.800", "€99 – €149 / mese"
- `pricing.prices.pro.setup` / `pricing.prices.pro.monthly` — idem Studio
- `pricing.prices.max.setup` / `pricing.prices.max.monthly` — range Operativo
- `pricing.verticalPricing.rows[0].pro` — "Setup €900 – €1.500 + €69 – €129/mese"
- `pricing.verticalPricing.rows[1].max` — "Setup €1.800 – €3.500 + €149 – €249/mese"
- Stesse chiavi replicate in en, de, es, fr.

---

*Documento generato da ispezione diretta di `app/[locale]/page.tsx`, `app/[locale]/pricing/page.tsx`, `components/PricingTable.tsx`, `messages/*.json`.*
