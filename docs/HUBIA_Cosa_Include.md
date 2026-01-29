# HŪBIA

**LOGO HŪBIA QUI**

---

# Cosa Include Davvero

Documento tecnico delle funzionalità realmente presenti nella piattaforma HŪBIA.

---

## Prenotazioni

**Gestione Completa**

- Creazione prenotazioni online da parte dei clienti
- Modifica prenotazioni: cambio orario, servizio, staff
- Cancellazioni con motivi e storico
- Conferme automatiche con sistema di deadline cliente
- Gestione conflitti: prevenzione sovrapposizioni e doppie prenotazioni

**Prenotazioni Ricorrenti**

- Creazione appuntamenti ricorrenti con regole personalizzate
- Generazione automatica prenotazioni future
- Gestione pause e riattivazioni
- Override per date specifiche

**Blocchi Calendario**

- Blocchi temporanei per staff (ferie, assenze)
- Blocchi ricorrenti (es. chiusura settimanale)
- Conversione blocchi in prenotazioni

**Export Calendario**

- Export ICS per integrazione calendari esterni (Google Calendar, iCal)
- Calendari individuali per staff
- Calendari aggregati per locale

**Storico Prenotazioni**

- Storico completo di tutte le prenotazioni
- Tracciamento modifiche e cancellazioni
- Audit trail per compliance

---

## Clienti

**Anagrafica Completa**

- Dati cliente completi
- Storico prenotazioni per cliente
- Storico servizi ricevuti nel tempo
- Profilo cliente con vista completa attività

**Segmentazione**

- Segmentazione base: nuovi, attivi, dormienti
- Segmentazione avanzata: clienti VIP, clienti a rischio churn
- Filtri e ricerca avanzata

**Loyalty**

- Sistema punti fedeltà automatico
- Gestione punti manuale
- Storico punti e utilizzo

**Gestione Clienti**

- Blacklist: gestione clienti non desiderati
- Mark no-show: tracciamento clienti assenti
- Snapshot cliente: analisi completa attività cliente

---

## Staff

**Gestione Team**

- Anagrafica staff completa
- Gestione ruoli e permessi
- Attivazione e disattivazione staff

**Calendari e Disponibilità**

- Calendari individuali per staff
- Gestione orari e disponibilità giornaliere
- Override disponibilità per date specifiche
- Assenze temporanee e ferie

**Notifiche Staff**

- Notifiche push per nuove prenotazioni
- Notifiche per modifiche e cancellazioni
- Inbox notifiche con sistema di messaggistica interna
- Notifiche intelligenti: buco libero, cliente in ritardo, giornata scarica

---

## Servizi e Prezzi

**Catalogo Servizi**

- Gestione servizi offerti
- Configurazione prezzi e durate
- Attivazione e disattivazione servizi

**Storico Prezzi**

- Tracciamento variazioni prezzi nel tempo
- Storico prezzi per analisi
- Gestione valute

**Servizi Multipli**

- Prenotazioni con più servizi
- Configurazione combinazioni servizi
- Calcolo durata totale automatico

---

## Automazioni

**Reminder Prenotazioni**

- Notifiche automatiche 48h prima della prenotazione
- Sistema di conferma cliente con deadline
- Notifiche push e email

**Auto-Completamento**

- Completamento automatico servizi terminati
- Notifiche di ringraziamento automatiche
- Aggiornamento stato prenotazioni

**Auto-Cancellazione**

- Cancellazione automatica prenotazioni non confermate
- Configurazione deadline personalizzabile
- Notifiche staff per cancellazioni automatiche

**Generazione Ricorrenti**

- Creazione automatica prenotazioni ricorrenti
- Gestione conflitti automatica
- Pausa e riattivazione automatica

**Notifiche Intelligenti**

- Buco libero imminente: notifica per slot liberi prossimi
- Cliente in ritardo: notifica se cliente non arriva
- Giornata scarica: notifica se giornata sotto target

---

## Analitiche

**Analisi Ricavi**

- Totale incassi per periodo
- Breakdown per staff
- Breakdown per servizio
- Confronto con periodo precedente (VIP)

**Analisi Prenotazioni**

- Conteggio prenotazioni per periodo
- Breakdown per status
- Breakdown per staff
- Trend nel tempo

**Analisi Clienti**

- Conteggio clienti per periodo
- Clienti nuovi vs ritornanti
- Metriche avanzate: total spent, avg ticket, lifetime visits (VIP)
- Segmentazione: dormant, attivi, VIP, churn risk (VIP)

**Trend Analytics**

- Andamento ricavi nel tempo
- Andamento prenotazioni nel tempo
- Andamento clienti nel tempo
- Confronto periodi (VIP)

**Coach Incassi (VIP)**

- Heatmap incassi: visualizzazione performance per giorno e ora
- Analisi stagionalità: pattern mensili e stagionali
- Suggerimenti operativi: insight basati su dati storici
- Identificazione slot morti e slot top
- Suggerimenti promozioni mirate
- Identificazione servizi trainanti

---

## Multi-Locale

**Gestione Multi-Locale**

- Gestione di più locali da un unico account
- Isolamento dati completo tra locali
- Configurazione indipendente per locale

**Sicurezza e Isolamento**

- Row Level Security (RLS) per isolamento dati
- Shop_id propagation automatica
- Nessun accesso cross-locale

**Configurazione per Locale**

- Servizi, staff, orari per locale
- Prezzi e configurazioni indipendenti
- Analisi aggregate e per locale

---

## Sicurezza e Affidabilità

**Sicurezza Dati**

- Row Level Security (RLS) per isolamento tenant
- Shop_id isolation su tutte le tabelle
- Rate limiting per prevenire abusi
- Input validation completo
- CORS configurato correttamente

**Affidabilità**

- Idempotency garantita: nessun duplicato anche con retry
- Error handling robusto
- Retry automatico per errori temporanei
- Backup automatici database

**Performance**

- Indici database ottimizzati
- Server-side caching per analisi
- Code splitting per bundle ottimizzati
- Cold start ottimizzato

---

## Scalabilità Futura

**Architettura Scalabile**

- Multi-tenant nativo: supporta da singolo locale a catene
- Database ottimizzato per volumi elevati
- API gateway per gestione traffico

**Crescita con il Business**

- Da singolo locale a catena senza cambiare software
- Configurazione per locale indipendente
- Analisi aggregate e per locale

**Futuro HUB**

- Architettura pronta per futuro HUB nativo
- PWA gestionali per singoli locali
- App nativa HUB che ospiterà le PWA

---

## Supporto

**Supporto Prioritario**

- Email: risposta entro 24h lavorative (PRO) o 4h (VIP)
- Chat: supporto via chat per questioni urgenti (VIP)
- Documentazione completa sempre disponibile

**Aggiornamenti**

- Accesso a tutti gli aggiornamenti della piattaforma
- Aggiornamenti in anteprima per VIP
- Changelog dettagliato per ogni aggiornamento

**Formazione**

- Onboarding dedicato incluso nel setup
- Documentazione personalizzata
- Guide e tutorial sempre disponibili

---

## Cosa NON Include

HŪBIA non include:

- Marketplace o directory
- App per clienti finali (è gestionale per professionisti)
- Integrazione con sistemi di pagamento online (configurabile ma non incluso)
- Integrazione con contabilità (dati esportabili ma non integrato)
- Marketing automation avanzato (solo broadcast notifiche base)

HŪBIA si concentra sulla gestione operativa e analisi, non su funzionalità di marketing o vendita diretta.

---

**HŪBIA**  
Il sistema operativo invisibile per attività fisiche di qualità.
