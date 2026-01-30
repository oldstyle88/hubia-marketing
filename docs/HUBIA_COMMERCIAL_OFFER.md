# HŪBIA — Offerta commerciale (single source of truth)

**Regola:** Questo documento descrive solo ciò che esiste oggi nel codice o nelle operazioni manuali del fondatore. Nessun claim su automazioni inesistenti.

**Allineamento:** La pagina Prezzi del sito marketing (repo hubia / hubia-marketing-standalone) e i testi i18n (messages/*.json) devono riflettere esattamente questo documento. Nessun termine inventato (es. "pannello amministrazione", "provisioning assistito", "SLA") senza definizione esplicita e reale.

---

## 1. Cos’è HŪBIA

HŪBIA è una piattaforma PWA per attività locali: prenotazioni, ordini (dove previsto dal verticale), gestione staff, notifiche push e analytics operative. Ogni cliente ha un deploy dedicato: non esiste self‑signup, l’attivazione è manuale.

---

## 2. Definizioni (termini usati nel sito)

- **Pannello amministrazione (Dashboard staff):** interfaccia web per lo staff (agenda, disponibilità, servizi, clienti, notifiche, metriche operative di base). È il “Dashboard staff” usato nel sito. **Non** è un pannello Founder né un multi‑tenant venduto al cliente.
- **Provisioning assistito:** setup **manuale** eseguito dal fondatore: progetto Supabase, schema/seed, progetto Vercel, variabili d’ambiente, branding PWA (manifest, icone, tema), seed servizi/staff, checklist gate go‑live. In sintesi: **Supabase + Vercel + env + branding PWA + seed + gate**.

---

## 3. Cosa riceve il cliente (software)

- **PWA client:** app installabile per i clienti (prenotazioni, ordini secondo verticale), branding del shop (manifest, icone, tema).
- **Pannello amministrazione:** agenda staff, disponibilità, servizi, clienti, notifiche, metriche operative base.
- **Funzionalità operative:** prenotazioni, ordini (pizzeria), notifiche push, database clienti, analytics operative (ricavi, prenotazioni/ordini, clienti, trend).

---

## 4. Verticali

- **Attivi:** Barbiere (core), Pizzeria.
- **Prossimi (Roadmap):** Palestra, Food.
- **Estetista:** solo test interno; **non** compare come verticale nel sito né nell’offerta.

---

## 5. Piani

### Piano PRO (singola sede)

- **Una sola sede/shop** per contratto.
- **Contenuto software:** PWA client + pannello amministrazione, prenotazioni (barbiere) o ordini+prenotazioni (pizzeria), notifiche push, branding PWA, analytics operative base.
- **Setup:** una tantum, manuale.
- **Supporto:** email standard (nessun SLA automatico).

### Piano MAX (multi‑sede)

- **Più sedi/shop** sotto un unico rapporto.
- **Contenuto software:** tutto PRO, applicato a più sedi.
- **Provisioning assistito** per ogni sede.
- **Supporto:** priorità nelle richieste email (nessun SLA automatico).

---

## 6. Prezzi per verticale (a partire da)

> **Nota:** Pizzeria e Palestra = progetto isolato con database dedicato.

| Verticale | PRO (setup + mensile) | MAX (setup + mensile) |
| --- | --- | --- |
| **Barbiere (core)** | da €499 setup + €149/mese | da €899 setup + €249/mese |
| **Pizzeria** | da €699 setup + €199/mese | da €1190 setup + €349/mese |
| **Palestra (prossimo)** | da €899 setup + €249/mese | da €1390 setup + €399/mese |

I prezzi sono **a partire da** e variano in base a complessità, numero sedi e richieste specifiche.

---

## 7. Matrice piano → feature (cosa include esattamente)

| Elemento | PRO | MAX |
| --- | --- | --- |
| PWA client + Dashboard staff | ✓ | ✓ |
| Prenotazioni (barbiere) o ordini+prenotazioni (pizzeria) | ✓ | ✓ |
| Notifiche push e promemoria | ✓ | ✓ |
| Branding PWA (icone, tema, manifest) | ✓ | ✓ |
| Analytics operative base | ✓ | ✓ |
| Numero sedi | 1 | più sedi |
| Provisioning assistito | setup iniziale | per ogni sede |
| Supporto | email standard | priorità email |

**Roadmap (non incluso oggi):** Coach Incassi, segmentazione avanzata (churn risk, VIP), insight predittivi, automazioni avanzate, chat support, aggiornamenti in anteprima. Nessun claim su queste funzionalità nel sito.

---

## 8. Disclaimer provisioning manuale

**Il provisioning dei clienti non è automatizzato.** Ogni nuovo shop richiede intervento manuale del fondatore (script, database, Vercel, branding). I tempi di attivazione dipendono dalla disponibilità e dalla coda di lavoro. Non esiste impegno contrattuale su tempi di go‑live se non esplicitamente concordato per iscritto.
