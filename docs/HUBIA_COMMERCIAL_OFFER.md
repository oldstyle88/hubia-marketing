# HŪBIA — Offerta commerciale (single source of truth)

**Regola:** Questo documento descrive solo ciò che esiste oggi nel codice o nelle operazioni manuali del fondatore. Nessun claim su automazioni inesistenti.

**Allineamento:** La pagina Prezzi del sito marketing (repo hubia / hubia-marketing-standalone) e i testi i18n (messages/*.json) devono riflettere esattamente questo documento. Nessun termine inventato (es. "pannello amministrazione", "provisioning assistito", "SLA") senza definizione esplicita e reale.

---

## 1. Cos’è HŪBIA

HŪBIA è una piattaforma software che fornisce PWA (Progressive Web App) per attività locali: prenotazioni, ordini (dove previsto dal verticale), gestione staff, notifiche push e analytics. Il software è deployato per singolo cliente/shop; non esiste self-signup: ogni nuovo shop viene creato e configurato manualmente dal fondatore.

---

## 2. Cosa riceve il cliente (software)

- **PWA client:** app installabile per i clienti (prenotazioni, ordini secondo verticale), branding del shop (manifest, icone, tema).
- **Staff dashboard:** interfaccia web per lo staff: calendario prenotazioni, gestione disponibilità, notifiche push, anagrafica clienti, inbox, impostazioni.
- **Funzionalità operative:** prenotazioni (creazione, modifica, cancellazione, ricorrenti), blocchi calendario, notifiche (reminder, conferme, push allo staff), database clienti con storico, loyalty (dove implementato), analytics (ricavi, prenotazioni, clienti, trend).
- **Verticali oggi in produzione:** barbiere/salon (prenotazioni); pizzeria (ordini + prenotazioni). Stesso stack, deploy separati per verticale/shop.

Nessun “pannello” o “portale” per gestire più shop è venduto al cliente: la gestione multi-shop è interna al fondatore.

---

## 3. Cosa fa manualmente HŪBIA (fondatore)

- **Creazione nuovo shop:** esecuzione script (scaffold + seed) su monorepo, creazione record su database esistente (Supabase), nessuna UI self-service.
- **Deploy e hosting:** configurazione progetto Vercel, variabili d’ambiente, deploy dell’app (barbiere-app o pizzeria-mobile) per quel cliente.
- **Branding e go-live:** configurazione nome shop, logo, colori, dominio (se previsto); verifica pre-go-live secondo checklist interna.
- **Supporto:** risposta a richieste via email; nessun portale ticket né SLA contrattualizzato in automatico.

Non esiste automazione “one-click” per attivare un nuovo shop: tutto il provisioning è manuale.

---

## 4. Cosa non è incluso

- App native in negozio (solo PWA).
- Integrazioni pagamento obbligatorie (dipendono da verticale e accordi).
- SLA o tempi di risposta garantiti da contratto (salvo accordi scritti separati).
- Formazione obbligatoria o onboarding strutturato (offerto su base manuale se previsto).
- Hosting o dominio incluso di default (configurazione dominio su richiesta, manuale).

---

## 5. Piano PRO (singola sede)

- **Una sola sede/shop** per contratto. Un deploy, un database tenant (shop_id/restaurant_id).
- **Contenuto software:** PWA client + staff dashboard, prenotazioni/ordini (secondo verticale), notifiche push, branding singolo shop, analytics incluse nel prodotto (ricavi, prenotazioni, clienti, trend).
- **Setup:** una tantum, eseguito dal fondatore (scaffold, seed, Vercel, branding). Non self-service.
- **Canone:** mensile, ricorrente.
- **Supporto:** via email; tempi di risposta non garantiti da sistema (nessun SLA automatico).

Prezzi attuali (solo riferimento; validità da verificare a parte): setup una tantum €499, canone €149/mese.

---

## 6. Piano MAX (multi-sede)

- **Più sedi/shop** sotto un unico rapporto. Più deploy o più tenant nello stesso progetto a seconda dell’architettura; creazione e configurazione di ogni sede sono sempre a carico del fondatore (stessi script e passi manuali, ripetuti per ogni sede).
- **Contenuto software:** tutto ciò che è incluso in PRO, applicato a più shop; overview multi-sede e gestione multi-tenant sono strumenti interni del fondatore (Founder Dashboard, admin API), non un “pannello” venduto al cliente.
- **Setup:** una tantum per la prima sede; setup aggiuntivi per ogni sede successiva (costo e modalità da definire con il fondatore). Tutto manuale.
- **Canone:** mensile, superiore a PRO (prezzi attuali: setup €799, canone €249/mese — solo riferimento).
- **Supporto:** priorità risposta email dove possibile; nessun SLA automatico salvo accordi scritti.

Termini come “provisioning assistito” o “SLA” vanno usati solo se definiti esplicitamente in offerta/contratto (es. “supporto prioritario” = risposta entro X ore lavorative, se concordato).

---

## 7. Disclaimer sul provisioning manuale

**Il provisioning dei clienti non è automatizzato.** Ogni nuovo shop richiede intervento manuale del fondatore (script, database, Vercel, branding). I tempi di attivazione dipendono dalla disponibilità del fondatore e dalla coda di lavoro. Non esiste impegno contrattuale su tempi di go-live se non esplicitamente concordato per iscritto.
