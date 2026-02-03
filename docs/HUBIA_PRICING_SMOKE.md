# HUBIA — Checklist anti-regressione (prezzi)

Controlli rapidi dopo la patch dei 2 piani fissi. Nessun automatismo; da usare come checklist manuale in staging/pre-prod.

---

## 1. Pagina Prezzi (IT)

- [ ] **URL:** `/it/pricing` (o equivalente con locale)
- [ ] **H1:** "Prezzi"
- [ ] **Sottotitolo:** contiene "Studio" e "Signature", nessun "Operativo" o "Ristorazione" in evidenza
- [ ] **Tabella 2 card:** prima card "Studio" con **€89** e **€900** (setup); seconda card "Signature" con **€120** e **€1.400** (setup)
- [ ] **Nessun range "da–a":** nessuna stringa tipo "€900 – €1.500" o "€69 – €129" in tabella o sotto
- [ ] **Tabella "Prezzi per piano":** colonne "Studio" e "Signature"; riga Beauty con prezzi fissi; riga "Su misura" con "Preventivo"
- [ ] **FAQ:** domanda "Posso passare da Studio a Signature?" (o equivalente) presente e risposta coerente
- [ ] **CTA:** bottone "Contattaci" (o "Richiedi demo") e link "Parla con noi" puntano a `/it/contact` (o `/contact` con locale)

---

## 2. Home (IT)

- [ ] **Sezione "I piani":** due card visibili (Studio, Signature)
- [ ] **Studio:** setup "€900 una tantum", canone "€89 / mese"; nota "rateizzabile in 6 o 12 mesi"
- [ ] **Signature:** setup "€1.400 una tantum", canone "€120 / mese"
- [ ] **Sezione "Progetti su misura":** testo con "preventivo su richiesta", nessun prezzo "da–a"
- [ ] **Nessun range** nelle due card piani

---

## 3. Mobile

- [ ] **Prezzi:** tabella 2 piani leggibile (stack verticale), prezzi visibili (€89, €120, €900, €1.400)
- [ ] **Tabella "Prezzi per piano":** scroll orizzontale o wrap ok; nessun testo troncato strano
- [ ] **Home – I piani:** due card in colonna; nessuna terza card o chiave i18n visibile (es. `home.forWho.card4Title`)

---

## 4. Altre lingue (campione)

- [ ] **EN:** `/en/pricing` — "Studio" e "Signature", "€89", "€120", "€900", "€1,400"; "Quote" per su misura
- [ ] **DE:** `/de/pricing` — "Studio" e "Signature"; "€89", "€120", "€900", "€1.400"; "Angebot" per su misura

---

## 5. Link e CTA

- [ ] **Nav "Prezzi":** porta a `/[locale]/pricing`
- [ ] **Footer link Prezzi:** stesso target
- [ ] **CTA "Contattaci" / "Richiedi demo" (prezzi e home):** portano a contact, nessun 404

---

## 6. Meta e Termini

- [ ] **Meta description** pagina Prezzi: contiene prezzi fissi (Studio €900 + €89, Signature €1.400 + €120) o messaggio coerente
- [ ] **Pagina Termini:** dove si cita la pagina Prezzi, testo "Studio e Signature" (non "Studio e Operativo")

---

*Completare la checklist dopo ogni deploy; in caso di fallo, verificare i file in `HUBIA_PRICING_PATCH_NOTES.md` e i key in `messages/*.json`.*
