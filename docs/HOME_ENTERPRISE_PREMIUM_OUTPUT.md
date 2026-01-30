# Home enterprise premium — Output

**Data:** 2026-01-30  
**Obiettivo:** Home “enterprise premium” (no documento, no ripetizioni), stessa UI, nuova struttura e copy. Verticali reali: Beauty + Ristorazione. Naming piani: Studio / Operativo.

---

## 1. Sezioni finali della home (in ordine)

1. **Hero** — Titolo, sottotitolo, CTA Contattaci / Vedi prezzi. Nessuna proof card in hero (consolidate sotto).
2. **Cosa offre HUBIA** — Unica sezione consolidata: blocco PWA (solo PWA, zero app da store) + 3 card (PWA con il tuo brand, Staff e disponibilità, Analytics). Zero duplicati con “Cosa include”.
3. **Per chi è HUBIA** — 2 card grandi: Beauty (barbiere, parrucchiere, beauty center → prenotazioni, agenda, no-show) e Ristorazione (pizzeria, street food → ordini, cucina, ritiro). Sotto: una riga “Su richiesta: multi-sede, logiche complesse.”.
4. **Cosa include** — 4 voci (Prenotazioni, Ordini, Notifiche automatiche, Branding). Nessuna ripetizione di PWA/Staff/Analytics.
5. **Come funziona** — 3 step: Setup iniziale, Configurazione, Messa online. Call conoscitiva in sottotitolo. Rateizzazione menzionata **solo** nel teaser Prezzi.
6. **Affidabilità** — 4 bullet benefit-first: Zero duplicati, Job affidabili, Test sicuri, Notifiche robuste. Dettagli tecnici in FAQ (q11, q12).
7. **Prezzi** — Solo teaser: “Da €69/mese per Beauty. Da €149/mese per Ristorazione. Setup da €900, rateizzabile in 6 o 12 mesi.” + CTA “Vedi dettagli prezzi” → /pricing. Nessuna tabella piani in home.
8. **Domande frequenti** — 12 voci (inclusi q11/q12 su idempotenza e job/notifiche).

---

## 2. Testo finale completo home IT (solo chiavi home)

### Hero
- **title:** Riempi l'agenda. Riduci i no-show.
- **subtitle:** PWA premium per Beauty e Ristorazione. Prenotazioni e ordini in un'unica app con il tuo brand: nessun marketplace, nessun template.
- **requestDemo:** Contattaci
- **viewPrices:** Vedi prezzi

### Offer (Cosa offre HUBIA)
- **title:** Cosa offre HUBIA
- **subtitle:** Un'unica piattaforma, il tuo brand.
- **pwaBlock.title:** Solo PWA, zero app da store
- **pwaBlock.body:** App installabile su smartphone (iOS e Android) con logo e colori della tua attività. Un solo software, aggiornamenti inclusi.
- **clientPwa:** PWA con il tuo brand
- **clientPwaDesc:** App per clienti e staff: prenotazioni o ordini in base al verticale.
- **staffDashboard:** Staff e disponibilità
- **staffDashboardDesc:** Calendario, servizi, clienti e notifiche automatiche.
- **analytics:** Analytics
- **analyticsDesc:** Ricavi, prenotazioni e ordini. Dati chiari per decidere.

### ForWho (Per chi è HUBIA)
- **title:** Per chi è HUBIA
- **subtitle:** Due verticali: Beauty e Ristorazione.
- **beauty:** Beauty
- **beautyDesc:** Barbiere, parrucchiere, beauty center. Prenotazioni, agenda e promemoria automatici: meno no-show, più clienti gestiti bene.
- **food:** Ristorazione
- **foodDesc:** Pizzeria, street food. Ordini, cucina e ritiro: flusso chiaro per sala e cucina.
- **advancedNote:** Su richiesta: multi-sede, logiche complesse.

### Features (Cosa include)
- **title:** Cosa include
- **subtitle:** Funzionalità concrete.
- **booking:** Prenotazioni | **bookingDesc:** Slot, ricorrenze e modifiche. Agenda ordinata per staff.
- **orders:** Ordini | **ordersDesc:** Ordine, cucina e ritiro per il verticale Ristorazione.
- **notifications:** Notifiche automatiche | **notificationsDesc:** Promemoria per ridurre i no-show.
- **branding:** Branding | **brandingDesc:** Logo, colori e nome della tua attività nell'app.

### HowItWorks (Come funziona)
- **title:** Come funziona
- **subtitle:** Setup chiaro. Ogni progetto parte da una call conoscitiva.
- **setup:** Setup iniziale | **setupDesc:** Progettazione, configurazione, branding, test e messa online.
- **config:** Configurazione | **configDesc:** Servizi, staff, orari e impostazioni su misura.
- **golive:** Messa online | **goliveDesc:** Verifica finale e lancio.

### Reliability (Affidabilità)
- **title:** Affidabilità
- **subtitle:** Risultati verificabili in produzione.
- **b1title:** Zero duplicati | **b1desc:** Ordini e prenotazioni univoci anche in caso di ritentativi o connessione instabile.
- **b2title:** Job affidabili | **b2desc:** Processi in background eseguiti una sola volta, senza sovrapposizioni.
- **b3title:** Test sicuri | **b3desc:** Ambiente di prova senza dati reali e senza invio di notifiche ai clienti.
- **b4title:** Notifiche robuste | **b4desc:** Gestione corretta di abbonamenti scaduti e dispositivi disconnessi.

### PricingTeaser (Prezzi)
- **title:** Prezzi
- **subtitle:** Da €69/mese per Beauty. Da €149/mese per Ristorazione. Setup da €900, rateizzabile in 6 o 12 mesi.
- **cta:** Vedi dettagli prezzi

### FAQ
- **title:** Domande frequenti
- **subtitle:** Risposte chiare
- **faqItems:** q1–a1 … q12–a12 (q11/q12 = dettagli tecnici affidabilità: idempotenza, job e notifiche).

---

## 3. Naming piani — 5 proposte e scelta

| # | Piano 1 (Beauty) | Piano 2 (Ristorazione) |
|---|----------------------------------|----------------------------------|
| 1 | **Studio** | **Operativo** |
| 2 | Atelier | Flusso |
| 3 | Signature | Command |
| 4 | Core | Plus |
| 5 | Essenziale | Avanzato (precedente) |

**Implementato:** **Studio** (Beauty) e **Operativo** (Ristorazione). Coerente con brand premium, non tech-generic, non stile iPhone.

---

## 4. File modificati

| File | Modifica |
|------|----------|
| `components/Hero.tsx` | `proofCards` opzionale; griglia proof mostrata solo se `proofCards?.length > 0`. |
| `app/[locale]/page.tsx` | Struttura home: Hero senza proof; una sezione “Cosa offre” (PwaOnlyBlock + 3 card); ForWho 2 card + advancedNote; Features 4 voci; HowItWorks 3 step; Reliability 4 bullet; Prezzi solo teaser + CTA (rimossa PricingTable); FAQ 12 voci. |
| `messages/it.json` | Nuova struttura `home`: `offer`, `forWho.beauty/food/advancedNote`, `features` (4 voci), `reliability` (4 benefit), `pricingTeaser` (teaser solo), `faqItems` (q11/q12 aggiunti). Piani `plans` e `pricing`: Studio/Operativo, Beauty/Ristorazione. Rateizzazione menzionata una sola volta in home (pricingTeaser). |
| `messages/en.json` | Allineato a it: offer, forWho (beauty/food/advancedNote), features 4, reliability 4, pricingTeaser, faqItems 12, plans Studio/Operativo, pricing/contact/footer. |
| `messages/de.json` | Idem (offer, forWho, reliability 4, faq q11/q12, Studio/Operativo). |
| `messages/es.json` | Idem. |
| `messages/fr.json` | Idem (offer, forWho, reliability 4, faq q11/q12, Studio/Operativo). |
| `app/[locale]/terms/page.tsx` | Riferimento piani: “Essenziale e Avanzato” → “Studio e Operativo”. |
| `app/[locale]/pricing/page.tsx` | Metadata description: “Studio (Beauty) e Operativo (Ristorazione)…”. |
| `docs/HOME_ENTERPRISE_PREMIUM_OUTPUT.md` | **Nuovo.** Questo file. |

---

## 5. Check “zero ripetizioni” (home IT)

- **PWA / brand:** In hero (subtitle), in offer (pwaBlock + clientPwa). Formulazioni diverse: hero “un'unica app con il tuo brand”, offer “PWA con il tuo brand” + “Un'unica piattaforma, il tuo brand”. OK.
- **Prenotazioni / ordini:** Hero (generale), offer (per verticale), forWho (beauty = prenotazioni, food = ordini), features (booking/orders), reliability (zero duplicati). Contesto diverso ogni volta. OK.
- **Setup / rateizzazione:** In home la rateizzazione compare **solo** in pricingTeaser.subtitle. Setup in howItWorks senza ripetere “rateizzabile”. OK.
- **Call conoscitiva:** Solo in howItWorks.subtitle e in faq (q1, q10). OK.
- **Beauty / Ristorazione:** Usati in forWho, pricingTeaser, faq a5; piani Studio/Operativo associati. OK.
- **Logo, colori, nome:** In offer (pwaBlock.body), features (brandingDesc), faq a7. Formulazioni diverse (attività vs piani). OK.

**Verdetto:** Nessuna frase duplicata identica; concetti ripetuti solo dove serve, con formulazioni diverse. Zero ripetizioni OK.
