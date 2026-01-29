# Design system HŪBIA — Dark luxury / logo coherence

**Vincolo:** Il logo HŪBIA è fisso (fondo scuro, glow, gradient blu → viola → pink). Il sito deve salire di livello fino al logo. Solo grafica/layout; niente cambio logica né nuove feature.

---

## 1) Brand ↔ UI coherence check

### Dove il sito oggi “tradisce” il logo

| Aspetto | Logo | Sito attuale | Problema |
|--------|------|--------------|----------|
| **Background** | Scuro, profondo | Bianco / #FAFAFA | Il logo “vive” su dark; il sito è light → discontinuità visiva immediata. |
| **Accent** | Blu → viola → pink (gradient + glow) | Oro (#C8A65A), viola usato poco | Palette diversa: chi arriva dal logo si aspetta quel gradient, non oro. |
| **Luce** | Glow controllato, gradient come luce | Drop shadow soft, gold glow | Il logo comunica “tecnologia premium”; il sito comunica “SaaS pulito” con ombre classiche. |
| **Mood** | High-tech, premium, impatto | Light SaaS, pulito, neutro | Il logo è memorabile; il sito è dimenticabile. |

### Perché il contrasto logo/UI è un problema di posizionamento

- **Prima impressione:** L’utente vede il logo (dark + gradient) e poi una landing chiara → sensazione di “due brand diversi” o “template generico”.
- **Posizionamento:** Se il prodotto si vende come premium/enterprise, l’UI deve sostenere quel prezzo. Un sito light neutro suggerisce “tool economico”; il logo suggerisce “piattaforma di livello”.
- **Riconoscibilità:** Coerenza logo ↔ UI = riconoscibilità “da lontano” e fiducia.

### Sensazione nei primi 3 secondi (obiettivo)

- **Attuale:** “Sito pulito, prodotto SaaS.”
- **Target:** “Questa piattaforma è di un altro livello: seria, tecnologica, premium.”

---

## 2) Design system “HŪBIA”

### Palette (dark luxury, allineata al logo)

| Ruolo | Colore | Uso |
|-------|--------|-----|
| **Background principale** | `#0B0F1A` (navy profondo) | Body, hero full-bleed, footer |
| **Background alternativo** | `#0E1324` | Leggera variazione per depth |
| **Surface** | `#111827` / `#141A2E` | Card, header, modali, input bg |
| **Border** | `rgba(255,255,255,0.06)` / `rgba(255,255,255,0.1)` | Separatori, card, input |
| **Testo primario** | `#F5F7FA` (bianco caldo) | Headline, label, corpo principale |
| **Testo secondario** | `#9CA3AF` (grigio freddo) | Sottotitoli, caption, placeholder |
| **Accent blu** | `#60A5FA` (blu elettrico soft) | Link, icon, glow blu |
| **Accent viola** | `#A78BFA` / `#8B5CF6` | CTA principale, gradient, glow |
| **Accent pink** | `#F472B6` (pink caldo) | Highlight, gradient end, badge |
| **Champagne (opzionale)** | `#D4C5A9` | Solo se serve un accento “premium” freddo, non oro caldo |

### Background rules

- **Full dark:** Hero, footer, pagine intere (contact, privacy, terms). Un solo “background principale” per tutta la viewport.
- **Surface:** Card, header bar, form container, pricing card. Surface sempre leggermente più chiara del background (o con border sottile) per gerarchia.
- **Niente sezioni bianche:** Nessuna banda `#FFFFFF` o `#FAFAFA`; tutto vive nel dark.

### Gradienti (come nel logo)

- **Gradient principale (blu → viola → pink):** Usare come “luce”, non come riempimento decorativo.
  - Esempi: linea sottile sotto l’header, bordo glow su CTA, sfumatura dietro il logo in hero, separatore tra sezioni.
- **Gradient soft (per sfondi):** `linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(244,114,182,0.05) 100%)` per aree subtle.
- **Non:** Gradient su intere card o su grandi blocchi di testo (leggeibilità e “premium” ne soffrono).

### Tipografia (dark luxury)

- **Font:** Plus Jakarta Sans (già in uso). Pesi: 400 (body), 500 (label, link), 600 (titoli sezione), 700 (hero, pricing plan name).
- **Tracking:** Leggermente aumentato su headline (es. `tracking-tight` o `tracking-[-0.02em]`), mai eccessivo.
- **Gerarchia:** Contrasto netto titolo/corpo: titoli in `text-primary`, corpo in `text-secondary`. Evitare grigi intermedi inutili.
- **Leggibilità:** Su dark, testo primario almeno #F5F7FA; secondario #9CA3AF. Evitare bianco puro (#FFF) su grandi blocchi (affatica).

### Uso della luce (ombra + glow)

- **Glow:** Solo su elementi accent (logo, CTA, icon importanti). Colori: blu/viola/pink in accordo al logo. Es. `box-shadow: 0 0 40px rgba(139, 92, 246, 0.25)`.
- **Ombre:** Preferire “glow” e “border luminoso” a drop-shadow neri. Se serve depth, usare `box-shadow` con colore accent a bassa opacità.
- **No:** Drop shadow nero tipo `0 4px 6px rgba(0,0,0,0.1)` su card bianche (è il look “light SaaS” che vogliamo evitare).

---

## 3) Home — WOW above the fold

### Struttura hero (concettuale)

- **Background:** Full-bleed dark (`#0B0F1A`) con gradient soft blu/viola/pink molto subtle (o noise leggero), niente pattern distrattori.
- **Logo:** Centrato, con glow controllato (blu/viola) che richiama il logo. Dimensione generosa; è il primo elemento riconoscibile.
- **Headline:** Una riga sobria ma potente (es. “La piattaforma PWA per chi non scende a compromessi”). Font size grande, peso 600–700, colore primario.
- **Subtitle:** Una o due righe, text-secondary, senza claim esagerati.
- **CTA:** Non “Get started now”. Testo tipo “Richiedi demo” / “Parla con noi”. Stile: bordo gradient o fill gradient con glow leggero; al hover glow più evidente. Secondario: outline (bordo bianco/grigio tenue), testo primario.
- **Proof / social proof:** Sotto le CTA, card o badge minimal (icone + una riga). Card su surface scuro, bordo sottile, niente oro.
- **Product mock:** Se presente, in una “finestra” con bordo sottile e leggero glow (stile device frame). Sfondo del mock coerente (dark o neutro).

### Cosa evitare

- Hero con sfondo chiaro.
- Due CTA con stesso peso visivo.
- Liste lunghe di feature above the fold.
- Animazioni eccessive (orbite/particelle solo se molto subtle).

---

## 4) Pricing (2 piani)

### Layout dark luxury

- **Background:** Stesso dark della home (o surface leggermente diverso per sezione).
- **Card:** Surface `#141A2E`, border `rgba(255,255,255,0.08)`. Il piano in evidenza ha bordo gradient (blu→viola→pink) o glow sottile, non “ring” spesso.
- **Differenza visiva:** Piano principale: bordo accent + badge “Consigliato” con colore gradient. Secondo piano: più neutro, stesso stile ma senza glow.
- **Prezzi:** Numeri in text-primary, grande; “/mese” e setup in text-secondary. Niente colori urlati sui prezzi.
- **Feature list:** Check o icon viola/blu soft; testo secondario. Poche righe, valore non “feature dump”.
- **CTA:** Piano in evidenza = bottone gradient (come hero). Secondo piano = outline (bordo grigio, testo primario).

### Microcopy

- **Tono:** Valore e outcome, non elenco tecnico. Es. “Tutto ciò che serve per andare live senza pensieri” invece di “10 utenti, 5 GB storage”.
- **Evitare:** “Basic”, “Starter”, “Cheap”. Solo due piani con nomi premium (Pro / Elite già ok).

---

## 5) Pagine secondarie (Contact, Privacy, Terms)

- **Background:** Stesso dark della home (body e main).
- **Contenuto:** In container max-width, testo in `text-primary` / `text-secondary`. Titolo pagina in h1 grande.
- **Form (contact):** Card surface, input con bg surface e border sottile; focus con ring accent (viola/blu). Messaggi success/error con colori tenui su dark (verde/rosso soft).
- **Privacy/Terms:** Sezioni con h2/h3 in primary; paragrafi in secondary. Lista con bullet discreti. Niente sfondo bianco “documento Word”.

---

## 6) Componenti UI (Tailwind / pseudo-codice)

### Button

- **Primary (CTA):**  
  `bg-gradient-to-r da accent-blue a accent-violet` (o gradient blu→viola→pink), `text-white`, `rounded-xl`, `font-medium`.  
  Hover: `shadow-glow` (glow viola). Focus: `ring-2 ring-accent-violet/50`.
- **Secondary / outline:**  
  `border border-white/20 bg-transparent text-primary`.  
  Hover: `bg-white/5 border-white/30`. Focus: `ring-2 ring-white/30`.

### Card

- **Default:**  
  `bg-surface border border-white/10 rounded-xl p-6 sm:p-8`.  
  Opzionale hover: `border-white/15` o glow molto lieve.
- **Dark variant (già usata):**  
  `bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm`.

### Divider

- **Sottile:**  
  `h-px bg-gradient-to-r from-transparent via-white/10 to-transparent`  
  oppure `bg-white/10`.
- **Con glow:**  
  `h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent` (uso parco).

### Badge

- **Default:**  
  `px-3 py-1 text-xs font-medium rounded-full bg-accent-violet/20 text-accent-violet border border-accent-violet/30`.  
  Per “Consigliato”: stesso stile o con gradient sottile.

### Link

- **Default:**  
  `text-secondary hover:text-primary transition-colors`.  
- **Accent:**  
  `text-accent-violet hover:text-accent-blue` (o con underline al hover).

---

## 7) Output richiesto — Modifiche per file/componenti

### File da modificare (ordine suggerito)

| File | Modifica |
|------|----------|
| `tailwind.config.ts` | Sostituire palette: background/surface dark, primary/secondary chiari, accent blu/viola/pink; gradient e boxShadow glow; rimuovere gold come primario. |
| `app/globals.css` | Body bg dark; rimuovere hero gold/orbit gold; introdurre hero gradient soft blu/viola/pink, logo-glow con viola/blu; noise/overlay subtle. |
| `app/layout.tsx` | Body class: `bg-background text-primary` (background = #0B0F1A). |
| `components/Hero.tsx` | Background dark; orbit/ring con colore accent (viola/blu); headline/subtitle/CTA con nuova palette; proof cards surface dark; product mock con bordo glow. |
| `components/Header.tsx` | bg surface/95 dark, border white/10; link secondary; CTA primary gradient. |
| `components/Button.tsx` | primary = gradient blu→viola + glow hover; outline = border white/20, bg transparent. |
| `components/Card.tsx` | default: bg-surface dark, border white/10; dark variant: bg white/5, border white/10. |
| `components/Badge.tsx` | bg accent/20, text accent, border accent/30 (viola). |
| `components/PricingTable.tsx` | Card dark; highlight card con border gradient o glow; check accent; CTA come Button. |
| `components/Footer.tsx` | bg-background dark, border-t white/10; link e testo secondary/primary. |
| `components/Section.tsx` | Nessun bg di default; se serve, bg-background o bg-surface (dark). |
| `components/FeatureGrid.tsx` | Card già dark; icon accent viola/blu. |
| `components/ReliabilitySection.tsx` | bg-surface dark; card border white/10, bg background/50. |
| `components/FAQAccordion.tsx` | bg-surface dark, border white/10; button hover bg white/5. |
| `components/ContactForm.tsx` | Card dark; input bg-surface border white/10 focus ring accent; success/error con colori dark-friendly. |
| `components/PwaOnlyBlock.tsx` | border white/10, text primary/secondary su dark. |
| `app/[locale]/page.tsx` | Section class: usare bg-background / bg-surface (dark) invece di bg-surface light. |
| `app/[locale]/pricing/page.tsx` | Stesso; link contact con accent. |
| `app/[locale]/contact/page.tsx` | Solo se c’è wrapper con bg; altrimenti ereditato. |
| `app/[locale]/privacy/page.tsx` | prose su dark: text primary/secondary, niente bg bianco. |
| `app/[locale]/terms/page.tsx` | Idem. |

**Implementazione effettuata:** tailwind.config.ts, globals.css, Hero, Header, Button, Card, Badge, PricingTable, Footer, LanguageSwitcher, FeatureGrid, ReliabilitySection, FAQAccordion, ContactForm, PwaOnlyBlock, page.tsx (home), pricing/page.tsx, privacy/page.tsx, terms/page.tsx. Body e Section ereditano bg da globals e classi; nessun plugin Typography (prose rimosso da privacy/terms).

### Cosa NON fare

- Non cambiare logica (niente nuove route, niente nuova feature).
- Non aggiungere animazioni pesanti o particelle.
- Non usare oro (#C8A65A) come accent principale (solo eventuale champagne freddo se esplicitamente richiesto).
- Non lasciare sezioni o card con sfondo bianco/crema.
- Non usare drop shadow nero classico su card.

### Checklist post-implementazione

- [ ] Home: hero full dark, logo con glow, CTA gradient, proof cards dark.
- [ ] Pricing: 2 card dark, differenza visiva netta, CTA coerenti.
- [ ] Contact: form su surface dark, input e messaggi leggibili.
- [ ] Privacy/Terms: testo leggibile, sfondo dark.
- [ ] Header/Footer: dark, link e CTA coerenti con design system.
- [ ] Button/Card/Badge/Link: rispettano le specifiche sopra.
- [ ] Nessuna stringa bianca (#FFF) o crema (#FAFAFA) come sfondo di layout.
