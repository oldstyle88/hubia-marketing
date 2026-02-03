# HUBIA — Note di patch prezzi (2 piani fissi)

Patch minima in-place: nessuna nuova pagina, nessun cambio di routing. Solo aggiornamento prezzi e copy per 2 piani fissi (Studio, Signature) e “Su misura” = preventivo.

---

## Valori applicati

| Piano | Setup | Abbonamento |
|-------|--------|-------------|
| **Studio** | €900 una tantum | €89/mese |
| **Signature** | €1.400 una tantum | €120/mese |
| **Su misura** | — | Solo preventivo (nessun range) |

---

## File modificati

### 1. `messages/it.json`
- **home.plansHome**: `studioSetup` → "€900 una tantum", `studioCanone` → "€89 / mese"; `signatureSetup` → "€1.400 una tantum", `signatureCanone` → "€120 / mese". `studioSetupNote` / `signatureSetupNote` → "rateizzabile in 6 o 12 mesi".
- **home.projectsCustom.text**: sostituito con testo senza numeri; "preventivo su richiesta", "Parliamone in consulenza".
- **pricing.subtitle**: "Due piani: Studio e Signature. Setup una tantum, rateizzabile in 6 o 12 mesi."
- **pricing.faq.q2** / **a2**: "Posso passare da Studio a Signature?"
- **pricing.prices.pro**: `setup` "€900", `monthly` "€89".
- **pricing.prices.max**: `setup` "€1.400", `monthly` "€120".
- **pricing.verticalPricing**: titolo "Prezzi per piano"; colonne `pro` "Studio", `max` "Signature"; righe: Beauty con prezzi fissi (€900+€89/mese | €1.400+€120/mese), seconda riga "Su misura (food, multi-sede, altro)" → "Preventivo" | "Preventivo".
- **plans.pro**: descrizione e feature list semplificate (nessuna feature nuova); "Dati su incassi e prenotazioni" al posto di "Analytics base".
- **plans.max**: `name` "Signature"; descrizione Beauty/strutturati; feature list allineata a Signature (niente Operativo/Ristorazione).

### 2. `messages/en.json`
- Stesse chiavi di it: plansHome (studio/signature setup e canone fissi), projectsCustom.text (quote on request), pricing.subtitle, faq.q2/a2, prices.pro/max fissi, verticalPricing (Plan, Studio, Signature, Beauty + Custom row), plans.pro/max (Signature, descrizioni e feature senza range).

### 3. `messages/de.json`
- Stesse chiavi: plansHome, projectsCustom, pricing.*, plans.pro/max; verticalPricing con "Preise nach Plan", "Auf Maß" row con "Angebot".

### 4. `messages/es.json`
- pricing.* e plans.*: prezzi fissi, verticalPricing "Precios por plan", riga "A medida" con "Presupuesto"; plans.max → Signature.

### 5. `messages/fr.json`
- pricing.* e plans.*: prezzi fissi (900 €, 89 €, 1 400 €, 120 €); verticalPricing "Tarifs par plan", riga "Sur mesure" con "Devis"; faq.q2 "de Studio à Signature"; plans.max → Signature.

### 6. `app/[locale]/pricing/page.tsx`
- **generateMetadata**: `description` aggiornata con prezzi fissi: "Studio €900 + €89/mese. Signature €1.400 + €120/mese. Setup rateizzabile 6 o 12 mesi. Ogni progetto parte da una call conoscitiva."

### 7. `app/[locale]/terms/page.tsx`
- Testo statico: "Studio e Operativo" → "Studio e Signature" nella frase che rimanda alla pagina Prezzi.

---

## Cosa non è stato modificato

- Nessun nuovo file o route.
- Nessun cambio a `PricingTable.tsx` (solo riceve props).
- Struttura `plans` in pricing page: resta array a 2 elementi (pro = Studio, max = Signature), dati da JSON.
- Link nav e footer verso `/pricing` invariati.
- Blocco PWA, FAQ (solo testi q2/a2), CTA e layout della pagina Prezzi invariati.

---

*Patch applicata in-place; nessuno schema DB, nessun cambio di comportamento API.*
