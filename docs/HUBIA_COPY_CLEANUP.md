# HUBIA — Copy cleanup (blocchi modificati)

Solo blocchi effettivamente modificati. Nessuna feature nuova introdotta; frasi rese più corte e chiare dove toccato.

---

## 1. Progetti su misura (home)

| Dove | Prima | Dopo |
|------|--------|------|
| **it** | Progetti su misura per attività con logiche più complesse: locali food, pizzeria, street food, alta rotazione. Senza prezzi in lista: ogni progetto è diverso. Parliamone in consulenza. | Attività con logiche più complesse (food, multi-sede, altro): preventivo su richiesta. Ogni progetto è diverso. Parliamone in consulenza. |
| **en** | Custom projects for activities with more complex logic: food venues, pizzeria, street food, high turnover. No listed prices: every project is different. Let's talk in a consultation. | Activities with more complex logic (food, multi-site, other): quote on request. Every project is different. Let's talk in a consultation. |
| **de** | Maßgeschneiderte Projekte für Aktivitäten mit komplexerer Logik: Food-Betriebe, Pizzeria, Street Food, hohe Fluktuation. Keine Listenpreise: jedes Projekt ist anders. … | Aktivitäten mit komplexerer Logik (Food, mehrere Standorte, Sonstiges): Angebot auf Anfrage. Jedes Projekt ist anders. … |

**Nota:** es/fr non espongono `projectsCustom` in home (assente in quei JSON); se presente in futuro, allineare allo stesso messaggio “preventivo/quote/devis su richiesta”.

---

## 2. Tabella “Prezzi per verticale” → “Prezzi per piano”

| Dove | Prima | Dopo |
|------|--------|------|
| **Titolo** | Prezzi per verticale / Prices by vertical / … | Prezzi per piano / Prices by plan / Preise nach Plan / Precios por plan / Tarifs par plan |
| **Colonne** | Studio | Operativo (o Essenziale | Avanzato) | Studio | Signature |
| **Riga 1** | Beauty con range "Setup €900 – €1.500 + €69 – €129/mese" e "Su richiesta" | Beauty con "€900 setup + €89/mese" e "€1.400 setup + €120/mese" |
| **Riga 2** | Ristorazione (pizzeria, street food) con range Operativo | Su misura (food, multi-sede, altro) con "Preventivo" | "Preventivo" (o Quote / Angebot / Presupuesto / Devis) |

---

## 3. Piano “Operativo” → “Signature”

| Dove | Prima | Dopo |
|------|--------|------|
| **plans.max.name** | Operativo | Signature |
| **plans.max.description (it)** | Ristorazione: pizzeria, street food. Ordini, cucina, ritiro e logiche avanzate. | Beauty center e locali con più servizi o più staff. Tutto ciò che include Studio, con supporto dedicato e report avanzati. |
| **Feature list max** | Ordini, flusso cucina e ritiro; Logiche avanzate su misura; … | Tutto ciò che include Studio; Configurazione più articolata e supporto dedicato in fase di avvio; Priorità nel supporto; Dati e report più approfonditi; Setup rateizzabile in 6 o 12 mesi. |

Allineato in en, de, es, fr (stesso concetto: Beauty strutturato, nessun riferimento a Ristorazione/Operativo).

---

## 4. Piano Studio (plans.pro) – solo riscrittura breve

| Dove | Prima | Dopo |
|------|--------|------|
| **description (it)** | Beauty: barbiere, parrucchiere, beauty center. Una sede, prenotazioni, staff, notifiche e analytics. | Barbiere, parrucchiere, beauty center. Una sede, prenotazioni, staff e notifiche. |
| **features (it)** | Include "Analytics base" | "Dati su incassi e prenotazioni" (stesso concetto, termine più chiaro); resto invariato. |

Nessuna feature aggiunta; altre lingue allineate (stesso numero di voci, termini chiari).

---

## 5. FAQ pricing

| Chiave | Prima | Dopo |
|--------|--------|------|
| **q2 (it)** | Posso passare da Studio a Operativo? | Posso passare da Studio a Signature? |
| **a2** | (invariato) | (invariato) |
| **q2 (en/de/es/fr)** | Can I move from Studio to Operativo? / … | Can I move from Studio to Signature? / … (fr: de Studio à Signature) |

---

## 6. Termini di servizio (testo statico)

| Prima | Dopo |
|--------|------|
| … per i piani Studio e Operativo sono descritti nella pagina Prezzi. | … per i piani Studio e Signature sono descritti nella pagina Prezzi. |

---

*Nessun nuovo claim, nessuna feature aggiunta; solo allineamento a 2 piani fissi e messaggio “su misura = preventivo”.*
