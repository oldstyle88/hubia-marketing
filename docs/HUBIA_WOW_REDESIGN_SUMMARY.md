# HŪBIA WOW Redesign — Summary

Riepilogo delle modifiche per il redesign “futuristic luxury” del sito marketing hubiasystem.com.

---

## 1. Rimozione Founder Dashboard / Admin (P0)

### Occorrenze rimosse o sostituite

| File | Prima | Dopo |
|------|--------|------|
| `messages/*.json` | `proof.adminPanel` / `adminPanelDesc` (Pannello amministrazione, provisioning shop, multi-sede) | Rimossi. Sostituiti con `proof.analytics` / `analyticsDesc` (Analytics & Report, metriche prenotazioni/ricavi). |
| `messages/*.json` | `plans.max`: "Pannello amministrazione + provisioning assistito", "SLA" | Setup assistito (deploy, branding PWA, config, seed, checklist go-live), "Priorità nelle richieste di supporto". Nessun "SLA" o "pannello". |
| `messages/*.json` | FAQ q6: "supporto prioritario e SLA garantiti" | "Priorità nelle richieste di supporto" (soft, no numeri vincolanti). |
| `app/[locale]/page.tsx` | Terza proof card: `adminPanel` / `adminPanelDesc` | Terza proof card: `analytics` / `analyticsDesc`. |
| `app/[locale]/terms/page.tsx` | "dashboard di gestione" | "dashboard staff". |
| `app/[locale]/terms/page.tsx` | "PRO e Elite", "SLA specifici come descritti nella pagina Prezzi" | "PRO e MAX", "livelli di supporto come descritti nella pagina Prezzi". |

### Verifiche

- Nessun link a `/founder`, `/admin`, `/dashboard` in nav, footer, CTA o pagine.
- Nessuna route pubblica founder/admin nel progetto.
- Il sito parla solo di: piattaforma PWA, dashboard staff, analytics, setup assistito, supporto.

---

## 2. Redesign visivo “Futuristic Luxury” (P0)

### Palette e gradienti

- **Background:** dark (#0B0F1A) con overlay **aurora** sottile (gradienti blu/viola) via `body::before`.
- **Surface:** vetro leggero (`bg-surface/80`, `backdrop-blur-sm` / `xl`), bordi `border-border-strong`, glow **solo on hover** (max 2 livelli).
- **Accent:** gradient blu→viola (#60A5FA → #8B5CF6 → #A78BFA). Champagne (#D4C5A9) solo per dettagli (es. bordo Badge “Più scelto”).

### Componenti

- **Button:** primary con gradient + `hover:shadow-glow-hover`, focus ring `ring-accent-violet/50`. Outline senza glow.
- **Card:** glass, `hover:shadow-glow-hover` e `hover:border-accent-violet/20`. Nessun glow costante.
- **PricingTable:** card evidenziata con `border-accent-violet/35`, senza glow fisso; hover come le altre card.
- **Hero:** product mock e proof cards senza glow fisso; glow on hover. Orbite e logo con glow ridotto (un livello).
- **Header:** `bg-surface/90`, `backdrop-blur-xl`.
- **HubiaLogoConnection:** gradient blu→viola al posto dell’oro; coerente con il brand.

### File toccati

- `tailwind.config.ts`: `gradient-aurora`, `glow-hover`, palette accent.
- `app/globals.css`: overlay aurora su `body`, orbite, logo shimmer/glow.
- `app/layout.tsx`: wrapper `relative z-10` per contenuto sopra aurora.
- `Button`, `Card`, `Hero`, `PricingTable`, `Badge`, `Header`, `ReliabilitySection`, `FAQAccordion`, `PwaOnlyBlock`, `HubiaLogoConnection`.

---

## 3. Copywriting e contenuti (P0)

- **Lingua di riferimento:** italiano (IT); altre lingue allineate (en, de, es, fr).
- **Headline / subheadline / feature:** riscritti per vendita (chiaro, corto, premium, non tecnico). Es.: hero “La piattaforma PWA che fa la differenza.”, forWho “Per chi non scende a compromessi su qualità e brand”.
- **Niente “pannello amministrazione” o “SLA” non definiti.** Supporto prioritario descritto come “priorità nelle richieste di supporto”.
- **Setup una tantum:** chiarito in `pricing.setupIncludes` e in `plans.max.features` (deploy, branding PWA, configurazione, seed servizi, checklist go-live).
- **Pricing come landing:** benefit → confronto PRO/MAX → FAQ (3 voci: cosa include setup, cambio piano, pagamento) → CTA “Richiedi demo” + link “Contattaci per consulenza”.

---

## 4. WOW moments (P1)

### A) Live Preview

- **Componente:** `LivePreview.tsx`.
- **Comportamento:** switch **Barbiere | Estetica | Pizzeria**; cambio istantaneo di:
  - tint gradient sul mock (blu / viola per verticale),
  - tre placeholder “Preview 1–3”,
  - lista feature per verticale (i18n).
- **Nota:** “Anteprima demo · non è una demo reale” (o equivalente per lingua).
- **Posizione:** sezione dedicata in Home tra PWA block e “Per chi è HŪBIA”.

### B) Logo hero

- **Micro-interazione:** hover sul logo hero → `scale-[1.03]`, `transition-transform duration-300`, una sola volta per hover (no loop).

---

## 5. Language switcher (P0)

- **Prima:** lista estesa in header (IT EN DE ES FR).
- **Dopo:** un solo bottone (icona globo + codice lingua + chevron) che apre un **dropdown** con elenco lingue (bandierina emoji + nome).
- **Accessibilità:** `aria-label`, `aria-expanded`, `aria-haspopup`, focus al primo link all’apertura, chiusura con Escape e click esterno.
- **Persistenza:** next-intl (cookie `NEXT_LOCALE`) già in uso; il cambio lingua avviene via `Link` con `locale`.
- **Mobile:** bottone compatto (solo globo + chevron su schermi piccoli); dropdown non rompe l’header.

---

## 6. Menu mobile

- Header: **menu hamburger** su mobile con link Prodotto, Prezzi, FAQ, Contatti e CTA “Richiedi demo”.
- Menu espresso e chiusura al click su link o CTA.

---

## 7. File modificati / nuovi

| File | Modifica |
|------|----------|
| `messages/it.json`, `en.json`, `de.json`, `es.json`, `fr.json` | Proof (analytics), piani, pricing, FAQ, livePreview, common.chooseLanguage, nav open/close menu, setupIncludes, faq pricing. |
| `app/[locale]/page.tsx` | Proof cards (analytics), sezione `LivePreview`. |
| `app/[locale]/pricing/page.tsx` | setupIncludes, PwaOnlyBlock i18n, FAQ accordion, CTA. |
| `app/[locale]/terms/page.tsx` | Dashboard staff, PRO/MAX, livelli supporto. |
| `app/layout.tsx` | Wrapper `relative z-10` per aurora. |
| `tailwind.config.ts` | Aurora, glow-hover, accent. |
| `app/globals.css` | Aurora overlay, orbite, logo glow. |
| `components/Header.tsx` | Glass, menu mobile, hamburger. |
| `components/Button.tsx` | Varianti, hover glow, `onClick` su `Link`. |
| `components/Card.tsx` | Glass, hover glow. |
| `components/Hero.tsx` | Mock e proof senza glow fisso, hover logo. |
| `components/PricingTable.tsx` | Highlight senza glow fisso. |
| `components/Badge.tsx` | Champagne bordo. |
| `components/LanguageSwitcher.tsx` | Bottone globo + dropdown (flag + nome). |
| `components/LivePreview.tsx` | **Nuovo.** Switch verticali + mock + feature list. |
| `components/ReliabilitySection.tsx` | Glass, hover. |
| `components/FAQAccordion.tsx` | Glass, hover. |
| `components/PwaOnlyBlock.tsx` | Glass. |
| `components/HubiaLogoConnection.tsx` | Gradient blu→viola. |
| `components/ContactForm.tsx` | `usePathname` da next-intl. |

---

## 8. Checklist “Cosa verificare” (manuale)

### Home

- [ ] Hero: titolo, sottotitolo, CTAs “Richiedi demo” / “Vedi prezzi”, logo con micro-interazione hover.
- [ ] Proof cards: Client PWA, Dashboard Staff, **Analytics** (nessun “Pannello”).
- [ ] Sezione **Live Preview**: switch Barbiere / Estetica / Pizzeria, mock e feature che cambiano, nota “Anteprima demo”.
- [ ] PWA block, Per chi è HŪBIA, Features, Come funziona, Affidabilità, Pricing teaser, FAQ.
- [ ] Nessun link o riferimento a founder/admin/dashboard.

### Pricing

- [ ] Titolo, sottotitolo, PWA block, tabelle PRO e MAX.
- [ ] Footer pricing: “Setup una tantum + canone”, **setupIncludes** (deploy, branding PWA, config, seed, go-live).
- [ ] FAQ “Domande sui piani” (setup, cambio piano, pagamento).
- [ ] CTA “Richiedi demo” e link “Contattaci per consulenza”.
- [ ] Nessun “SLA” o “pannello” nei piani.

### Language switcher

- [ ] Header: un solo bottone (globo + lingua + chevron).
- [ ] Click: dropdown con bandierine e nomi (IT, EN, DE, ES, FR).
- [ ] Cambio lingua: navigazione e persistenza (cookie).
- [ ] Escape e click esterno chiudono il dropdown.
- [ ] Mobile: bottone compatto, dropdown non rompe header.

### CTA

- [ ] “Richiedi demo” in header, hero, pricing teaser, pricing CTA, mobile menu.
- [ ] Tutti i CTA portano a `/contact` (o anchor tipo `/#faq` dove previsto).
- [ ] Nessun CTA verso founder/admin.

### Mobile

- [ ] Header: logo, language switcher, hamburger (CTA in menu).
- [ ] Menu mobile: link Prodotto, Prezzi, FAQ, Contatti, “Richiedi demo”.
- [ ] Live Preview e Pricing leggibili e usabili.
- [ ] Language switcher dropdown utilizzabile.

### Contatti, Privacy, Terms

- [ ] Form contatti ok, messaggi success/error leggibili.
- [ ] Privacy e Terms: testo leggibile su sfondo dark, nessun riferimento a founder/admin.

---

## 9. Prima / Dopo (sintesi)

| Aspetto | Prima | Dopo |
|--------|--------|------|
| **Admin / Founder** | Proof “Pannello amministrazione”, piani MAX con “provisioning assistito” e “SLA” | Proof “Analytics”; piani con setup chiaro e “priorità nelle richieste di supporto”. Zero mention founder/admin. |
| **Look** | Dark luxury base, glow su vari elementi | Aurora sottile, vetro, glow **solo on hover**, max 2 livelli. Logo gradient blu→viola. |
| **Copy** | Tecnico / generico | Italiano default, premium, corto, verificabile. |
| **Pricing** | Tabella + footer | Landing: benefit → piani → FAQ → CTA, setup spiegato. |
| **Lingue** | Lista IT EN DE ES FR in header | Bottone globo + dropdown con flag e nomi. |
| **Mobile** | Nav nascosta, solo logo + lingue + CTA | Menu hamburger con nav + CTA. |
| **WOW** | — | Live Preview (verticali) + micro-interazione logo hero. |

---

*Redesign realizzato per hubiasystem.com. Nessun link o route founder/admin esposti al pubblico.*
