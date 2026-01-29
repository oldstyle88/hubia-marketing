# HUBIA — Ricostruzione Completa Stato Progetto

**Data**: 2026-01-26  
**Scope**: Evidence-based reconstruction dello stato attuale del progetto HUBIA  
**Metodologia**: Analisi documentazione, audit, migrations, codice sorgente

---

## Executive Summary

**STATO GENERALE**:

- **BARBIERE**: ✅ **READY** (vendibile, stabile)
- **PIZZERIA**: ⚠️ **NOT READY** (usabile ma con rischi critici)
- **HUB NATIVE APP**: 📋 **FUTURE** (non iniziato)

**RISCHI CRITICI**:

1. Pizzeria: Double order su retry (idempotency key per chiamata)
2. Pizzeria: Test creano dati reali senza TEST_MODE
3. Pizzeria: Push inviate anche durante test
4. Pizzeria: Carrello non persistito (refresh → vuoto)

---

## PARTE 1 — BARBIERE (Verifica Stato)

### 1.1 Stato Generale

**VERDETTO**: ✅ **PRODUCTION READY**

**Evidenze**:

- `BARBIERE_FINAL_CHECKUP.md`: Tutte le migrations applicate, sistema completo
- `RELEASE_GATE_REPORT_2026-01-25T20-14-06.md`: 98 passed, 13 warnings, 0 failed
- Performance: Booking submit ~1.2s p50 (entro target < 2s)

### 1.2 Audit Staff

**Status**: ✅ **COMPLETO**

**Evidenze**:

- `STAFF_DASHBOARD_AUDIT_2026-01-17T01-25-17.md`: Dashboard funzionale
- `STAFF_DASHBOARD_SMOKE_PERSISTENCE_REPORT_2026-01-18T21-50-42.md`: Persistenza verificata
- Staff V3: Layout moderno, split view desktop, bottom nav mobile
- Staff Legacy: Mantenuto per backward compatibility, non più sviluppato

**File chiave**:

- `src/staff-v3/pages/*.tsx`: Dashboard moderna
- `src/staff-v3/layout/StaffShell.tsx`: Layout responsive

### 1.3 Audit Analytics

**Status**: ✅ **COMPLETO E VERIFICATO**

**Evidenze**:

- `ANALYTICS_TRUTH_AUDIT_COMPLETE.md`: Revenue, bookings, customers count consistenti tra API e DB
- `BARBIERE_ANALYTICS_PERF_AUDIT.md`: Performance ~1.2-1.9s p50 (entro target)
- Server-side cache: 60s TTL, ~50% cache hit rate
- PRO toggle: Funziona correttamente (null quando disabilitato, metrics quando abilitato)

**Migrations applicate**:

- `20260125000000_add_analytics_indexes.sql`: 8 indici analytics
- `20260125000001_add_services_indexes.sql`: 1 indice services

**File chiave**:

- `src/server/actions/staffAnalytics.js`: Endpoint analytics
- `src/utils/analyticsCache.ts`: Cache in-memory 60s

### 1.4 Cron Refactor (cron_tick_shop, locks, time budget)

**Status**: ✅ **IMPLEMENTATO E STABILE**

**Evidenze**:

- `CRON_SHOP_SCOPED_IMPLEMENTATION.md`: Refactor completo
- Migrations:
  - `20260226000000_create_cron_locks.sql`: Tabella locks
  - `20260226000001_create_acquire_cron_lock_rpc.sql`: RPC atomico

**Features**:

- ✅ Shop-scoped: 1 cron per shop (`cron_tick_shop`)
- ✅ Lock acquire/release: 30s duration, atomico via RPC
- ✅ Time budget: 25s hard limit, ritorna `partial: true` se esaurito
- ✅ Limiti anti-spike: MAX_BOOKINGS_PER_PHASE = 50, MAX_RECURRING_PER_RUN = 50
- ✅ Logging strutturato: `CRON_SHOP_START/END`

**File chiave**:

- `src/server/actions/cronTickShop.js`: Nuovo endpoint shop-scoped
- `src/server/actions/cronTick.js`: Time budget implementation
- `scripts/print_cron_urls.mjs`: Helper per setup cron-job.org

**Endpoint**:

```
GET /api/v1?action=cron_tick_shop&secret=...&shop_id=<uuid>
```

### 1.5 Booking Submit V2

**Status**: ⚠️ **FLAG PRESENTE, IMPLEMENTAZIONE PARZIALE**

**Evidenze**:

- `BOOKING_SUBMIT_PERF_AUDIT.md`: Performance misurata
- Legacy: 2 chiamate (conflict_check ~490ms + customer_create_booking ~670ms) = ~1170ms p50
- Feature flag: `booking_submit_v2_enabled` in `shop_settings`
- Migration: `20260225100002_booking_submit_covering_indexes.sql` disponibile

**Stato attuale**:

- ✅ Performance audit completato
- ✅ Indici disponibili (non ancora applicati tutti)
- ⚠️ Endpoint `customer_create_booking_v2` non ancora implementato
- ⚠️ Single-call endpoint raccomandato ma non presente

**Raccomandazioni**:

- Applicare covering indexes per ottimizzazione
- Implementare v2 endpoint (single-call) quando necessario

**File chiave**:

- `src/utils/bookingSubmitPerf.ts`: Performance instrumentation
- `src/screens/BookingScreen.tsx`: Client submit path
- `scripts/booking_submit_perf_harness.mjs`: Performance harness

### 1.6 Gate Barbiere

**Status**: ✅ **PASSING**

**Ultimo report**: `RELEASE_GATE_REPORT_2026-01-25T20-14-06.md`

**Risultati**:

- ✅ **98 passed**: Health, endpoints, booking flow, staff auth, analytics, tenant isolation
- ⚠️ **13 warnings**: Realtime subscriptions CLOSED (non critico), alcuni test skipped per CLIENT_SLUG mancante
- ❌ **0 failed**

**Test critici passati**:

- ✅ Data Isolation: Bookings match shop_id filter
- ✅ Tenant Isolation: Cross-shop leak prevention
- ✅ Analytics Truth: API/DB consistency
- ✅ Staff Customer Snapshot: Shape e consistency
- ✅ Free Slots: Exclusive mode corretto

### 1.7 Rischi Residui

| Rischio                | Severità | Probabilità | Mitigazione                      | Status         |
| ---------------------- | -------- | ----------- | -------------------------------- | -------------- |
| Cold start Vercel      | Bassa    | Alta        | ~1-2s accettabile per serverless | ✅ Accettabile |
| Rate limiting parziale | Media    | Bassa       | Rate limits base presenti        | ⚠️ Accettabile |
| SMTP non configurato   | Bassa    | Bassa       | Supabase default funziona        | ✅ Accettabile |
| Booking submit latency | Bassa    | Alta        | ~1.2s p50 (entro target)         | ✅ Accettabile |

### 1.8 Cose da NON Toccare

**⚠️ NON MODIFICARE**:

1. **RLS policies**: Funzionano correttamente, shop_id filtering sempre presente
2. **EXCLUDE constraint bookings**: Previene overlap, idempotency garantita
3. **Analytics cache**: 60s TTL ottimale, non aumentare
4. **Cron locks**: Meccanismo atomico funzionante, non modificare
5. **Staff V3 layout**: Responsive design stabile, non refactorare

---

## PARTE 2 — PIZZERIA (Audit Reale)

### 2.1 Stato Generale

**VERDETTO**: ⚠️ **NOT READY** (usabile end-to-end ma con rischi critici)

**Evidenze**:

- `PIZZERIA_MEGA_AUDIT_CUSTOMER.md`: Top 10 rischi identificati
- `PIZZERIA_RELEASE_GATE.md`: Gate disponibile con TEST_MODE
- `PIZZERIA_FIX_PLAN_V2.md`: Fix plan con priorità

### 2.2 Top 10 Rischi Identificati

| #   | Rischio                           | Area       | Evidenza                                                                 | Severità |
| --- | --------------------------------- | ---------- | ------------------------------------------------------------------------ | -------- |
| 1   | **Double order su retry**         | Order flow | Idempotency key generata per chiamata; retry → nuova key → doppio ordine | 🔴 ALTO  |
| 2   | **Carrello non persistito**       | Order flow | Solo React state; refresh → vuoto                                        | 🟡 MEDIO |
| 3   | **Doppio save profilo al login**  | Auth       | `confirmLogin` + `handleLogin` entrambi invocati                         | 🟡 MEDIO |
| 4   | **Fail-open su phone protection** | Auth       | `checkPhoneProtection` in errore → accesso consentito                    | 🟡 MEDIO |
| 5   | **Rate limit in-memory (router)** | Auth/API   | Multi-istanza non condivisa; crescita `rateLimitMap`                     | 🟡 MEDIO |
| 6   | **Cache SW `/api/menu`**          | PWA        | `CACHEABLE_API` include `/api/menu` ma client non lo usa                 | 🟢 BASSO |
| 7   | **e2eConsent in prod**            | Auth       | `?e2eConsent=1` forza modal privacy; esposto in prod                     | 🟢 BASSO |
| 8   | **Modifiers senza restaurant_id** | DB         | `product_modifiers` read senza scope; OK single-tenant                   | 🟡 MEDIO |
| 9   | **Offline menu/checkout**         | PWA        | Menu e ordine non disponibili offline                                    | 🟡 MEDIO |
| 10  | **Nessun rate limit push**        | Push       | Dedupe presente; nessun cooldown globale                                 | 🟢 BASSO |

### 2.3 Side Effects Attuali dei Test

#### 2.3.1 Push Notifications

**Problema**: I test inviano push reali se non in TEST_MODE

**Evidenze**:

- `PIZZERIA_TESTMODE_PUSH_SUPPRESSION.md`: Soppressione implementata ma non sempre usata
- `api/staff-router.js` L1076: `[PUSH_SUPPRESSED_TEST_MODE]` log quando soppresso
- `api/_utils/runtimeFlags.js`: `isTestRun(req)` controlla env/header/query

**File coinvolti**:

- `api/staff-router.js`: `sendOrderPushNotification` (controlla `opts.testRun`)
- `api/push-router.js`: Invio push web/native
- `api/_lib/notifications.js`: Wrapper soppressione

**Soluzione attuale**:

- ✅ TEST_MODE support implementato
- ⚠️ Scripts test non sempre usano TEST_MODE
- ⚠️ Gate usa TEST_MODE per default ma altri script no

#### 2.3.2 Ordini

**Problema**: Test creano ordini reali senza `is_test=true`

**Evidenze**:

- `scripts/e2e_full_smoke.mjs` L1021-1101: `createTestOrder` crea ordini senza `is_test`
- `scripts/e2e-flow.mjs` L145-257: `createOrderSimple` crea ordini reali
- `scripts/verify_accept_order_time_and_payment.mjs` L135-215: Ordini test senza flag

**File coinvolti**:

- `api/create-order.js`: Supporta TEST_MODE (L246-252, L297-299, L397-399, L430-432)
- `supabase/migrations/20260126000000_add_test_mode_columns.sql`: Colonne `is_test`, `test_run_id`, `expires_at`

**Soluzione attuale**:

- ✅ Migration applicata (colonne presenti)
- ✅ API supporta TEST_MODE
- ❌ Scripts test non sempre usano TEST_MODE

#### 2.3.3 Clienti

**Problema**: Test creano clienti reali senza `is_test=true`

**Evidenze**:

- Stesso problema degli ordini: scripts creano clienti senza flag
- `customers` table ha colonne `is_test`, `test_run_id`, `expires_at` (migration applicata)

**File coinvolti**:

- `api/create-order.js`: Crea customer se non esiste (non sempre marca `is_test`)
- `api/router.js`: `save-profile`, `save-customer-profile` (non sempre marca `is_test`)

### 2.4 Rischi Produzione

| Rischio                    | Probabilità | Impatto | Mitigazione Attuale                          | Status         |
| -------------------------- | ----------- | ------- | -------------------------------------------- | -------------- |
| Double order               | Alta        | Alto    | Idempotency key per azione (da implementare) | 🔴 BLOCKER     |
| Carrello perso             | Alta        | Medio   | Persistenza AsyncStorage (da implementare)   | 🟡 HIGH        |
| Push spam                  | Media       | Basso   | Dedupe `eventKey` presente                   | ✅ MITIGATO    |
| Phone protection fail-open | Media       | Medio   | Documentare; opzionale fail-closed           | 🟡 MEDIUM      |
| Rate limit in-memory       | Bassa       | Basso   | OK per single-instance                       | ✅ ACCETTABILE |

### 2.5 DB & RLS Audit

**Status**: ✅ **RLS HARDENED**

**Evidenze**:

- `PIZZERIA_DB_RLS_AUDIT.md`: RLS policies corrette
- `PIZZERIA_RLS_CLIENT_COHERENCE_REPORT_2026-01-18T21-13-30.md`: Coherence verificata
- Tenant field: `restaurant_id` (UUID) → `restaurants.id`
- FK: `restaurant_id` REFERENCES `restaurants(id)` ON DELETE CASCADE

**Warnings**:

- `product_modifiers`, `modifier_options`: Read anon senza `restaurant_id` (OK single-tenant)

**File chiave**:

- `scripts/pizzeria_db_consistency_check.mjs`: Verifica NULL `restaurant_id`
- `scripts/pizzeria_tenant_isolation_smoke.mjs`: Test isolamento cross-tenant

### 2.6 Network & Performance

**Status**: ⚠️ **MONITORATO, OTTIMIZZABILE**

**Evidenze**:

- `PIZZERIA_NETWORK_PERF_AUDIT.md`: Fetch wrapper implementato
- `utils/networkAudit.ts`: Strumentazione con `?auditNetwork=1`
- Critical path: Menu fetch + realtime subscriptions + profile/push

**File chiave**:

- `utils/networkAudit.ts`: Wrapper fetch per audit
- `App.tsx`: Wiring `auditNetwork` query param

---

## PARTE 3 — TEST_MODE / DRY_RUN

### 3.1 Dove Oggi i Test Creano Dati Reali

#### 3.1.1 Scripts che Creano Ordini Reali

| Script                                     | Path                                                        | Problema                            | Fix                        |
| ------------------------------------------ | ----------------------------------------------------------- | ----------------------------------- | -------------------------- |
| `e2e_full_smoke.mjs`                       | `scripts/e2e_full_smoke.mjs` L1021-1101                     | `createTestOrder` senza `is_test`   | Aggiungere `is_test: true` |
| `e2e-flow.mjs`                             | `scripts/e2e-flow.mjs` L145-257                             | `createOrderSimple` senza `is_test` | Aggiungere `is_test: true` |
| `verify_accept_order_time_and_payment.mjs` | `scripts/verify_accept_order_time_and_payment.mjs` L135-215 | Ordini test senza flag              | Aggiungere `is_test: true` |
| `verify_slot_capacity_cancelled.mjs`       | `scripts/verify_slot_capacity_cancelled.mjs` L184-250       | Ordini test senza flag              | Aggiungere `is_test: true` |
| `verify_order_flow_modal_e2e.mjs`          | `scripts/verify_order_flow_modal_e2e.mjs` L126-191          | Ordini test senza flag              | Aggiungere `is_test: true` |

**Pattern comune**:

```javascript
// ❌ ATTUALE (crea dati reali)
const { data: order } = await supabase.from("orders").insert({
  restaurant_id: RESTAURANT_ID,
  customer_name: "Test",
  // ... nessun is_test
});

// ✅ CORRETTO (con TEST_MODE)
const isTestMode = process.env.PIZZERIA_TEST_MODE === "1";
const { data: order } = await supabase.from("orders").insert({
  restaurant_id: RESTAURANT_ID,
  customer_name: "Test",
  is_test: isTestMode,
  test_run_id: isTestMode ? TEST_RUN_ID : null,
  expires_at: isTestMode
    ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    : null,
});
```

#### 3.1.2 Scripts che Creano Clienti Reali

Stesso problema: scripts creano clienti senza `is_test=true` quando in TEST_MODE.

### 3.2 Dove Partono Push Reali

#### 3.2.1 Endpoint che Inviano Push

| Endpoint                    | File                               | Controllo TEST_MODE | Status   |
| --------------------------- | ---------------------------------- | ------------------- | -------- |
| `sendOrderPushNotification` | `api/staff-router.js` L1050-1088   | ✅ `opts.testRun`   | ✅ OK    |
| `sendWebPush`               | `api/push-router.js` L37-183       | ❌ Nessuno          | ❌ MANCA |
| `sendNativePush`            | `api/push-router.js` L188-311      | ❌ Nessuno          | ❌ MANCA |
| `sendNotification`          | `api/_lib/notifications.js` L26-71 | ✅ `isTestRun(ctx)` | ✅ OK    |

**Problema**: `push-router.js` non controlla TEST_MODE direttamente (viene chiamato da `staff-router.js` che controlla).

#### 3.2.2 Scripts che Invocano Push

| Script                          | Path                                    | Usa TEST_MODE?  | Status   |
| ------------------------------- | --------------------------------------- | --------------- | -------- |
| `run_project_gate_pizzeria.mjs` | `scripts/run_project_gate_pizzeria.mjs` | ✅ Sì (default) | ✅ OK    |
| `e2e_full_smoke.mjs`            | `scripts/e2e_full_smoke.mjs`            | ❌ No           | ❌ MANCA |
| Altri scripts                   | Vari                                    | ❌ No           | ❌ MANCA |

### 3.3 File Coinvolti

#### 3.3.1 TEST_MODE Implementation

**File già implementati**:

- ✅ `supabase/migrations/20260126000000_add_test_mode_columns.sql`: Colonne DB
- ✅ `api/create-order.js`: Supporta TEST_MODE (L246-252, L297-299, L397-399, L430-432)
- ✅ `api/staff-router.js`: Soppressione push (L1076)
- ✅ `api/_utils/runtimeFlags.js`: `isTestRun(req)` helper
- ✅ `api/_lib/notifications.js`: Wrapper soppressione
- ✅ `scripts/run_project_gate_pizzeria.mjs`: Usa TEST_MODE per default

**File da aggiornare**:

- ❌ `scripts/e2e_full_smoke.mjs`: Aggiungere TEST_MODE
- ❌ `scripts/e2e-flow.mjs`: Aggiungere TEST_MODE
- ❌ `scripts/verify_*.mjs`: Aggiungere TEST_MODE
- ❌ `api/push-router.js`: Aggiungere controllo TEST_MODE diretto (opzionale, già protetto via staff-router)

### 3.4 Soluzione UNICA e Coerente

#### 3.4.1 Approccio: `is_test` Column (Raccomandato)

**Pro**:

- ✅ Già implementato (migration applicata)
- ✅ Auto-cleanup via `cleanup_test_rows()` function
- ✅ Filtro semplice: `WHERE is_test = false` per produzione
- ✅ Compatibile con RLS (policies possono filtrare)

**Contro**:

- ⚠️ Richiede aggiornamento di tutti gli scripts
- ⚠️ Richiede aggiornamento di tutte le query produzione (filtro `is_test = false`)

**Implementazione**:

1. **Flag globale**: `PIZZERIA_TEST_MODE=1` o `HUBIA_TEST_MODE=1` o `TEST_MODE=1`
2. **Header**: `x-test-mode: 1` (per API calls)
3. **Query param**: `?test=1` o `?test_mode=1` (opzionale, evitare per non sporcare URL)
4. **DB columns**: `is_test`, `test_run_id`, `expires_at` (già presenti)
5. **Cleanup**: `cleanup_test_rows()` function (già presente)

**File da modificare**:

- `api/create-order.js`: ✅ Già fatto
- `api/router.js`: Aggiungere `is_test` per `save-profile`, `save-customer-profile`
- `scripts/*.mjs`: Aggiungere `is_test: true` quando `TEST_MODE=1`
- `services/orders.ts`: Passare `is_test` da context
- `hooks/usePlaceOrder.ts`: Passare `is_test` se in TEST_MODE

#### 3.4.2 Alternativa: Shadow Tables (Non Raccomandato)

**Pro**:

- ✅ Separazione completa dati test/prod
- ✅ Nessun rischio contaminazione

**Contro**:

- ❌ Duplicazione schema
- ❌ Duplicazione codice
- ❌ Complessità migliore
- ❌ Non implementato

**Verdetto**: ❌ **NON RACCOMANDATO** - `is_test` column è più semplice e già implementato.

### 3.5 Pro/Contro: Shadow Tables vs `is_test`

| Aspetto                    | `is_test` Column              | Shadow Tables           |
| -------------------------- | ----------------------------- | ----------------------- |
| **Implementazione**        | ✅ Già fatto (migration)      | ❌ Da zero              |
| **Complessità**            | ✅ Bassa                      | ❌ Alta                 |
| **Performance**            | ✅ Indici parziali            | ✅ Separazione completa |
| **Cleanup**                | ✅ Auto (expires_at)          | ⚠️ Manuale              |
| **RLS**                    | ✅ Compatibile                | ⚠️ Duplicare policies   |
| **Query produzione**       | ⚠️ Filtro `is_test = false`   | ✅ Nessun filtro        |
| **Rischio contaminazione** | ⚠️ Basso (se filtri corretti) | ✅ Zero                 |

**Raccomandazione**: ✅ **`is_test` Column** - Già implementato, più semplice, sufficiente.

---

## PARTE 4 — ROADMAP

### 4.1 Cosa Serve per Rendere Pizzeria Vendibile

#### 4.1.1 Blockers (Security / Double Order / Push Spam)

| ID  | Fix                                                | File                                           | Priorità   | Effort     |
| --- | -------------------------------------------------- | ---------------------------------------------- | ---------- | ---------- |
| B1  | **Idempotency key per azione**                     | `hooks/usePlaceOrder.ts`, `services/orders.ts` | 🔴 BLOCKER | 2-3 giorni |
| B2  | **Un solo save-profile al login**                  | `App.tsx`, `LoginScreen.tsx`                   | 🔴 BLOCKER | 1 giorno   |
| B3  | **Fail-open phone protection** (doc + opz. toggle) | `services/phoneProtection.ts`                  | 🟡 HIGH    | 1 giorno   |

**Dipendenze**: Nessuna

**Cosa fare ORA**:

1. Fix B1 (idempotency): Generare key all'apertura modal, riusare per retry
2. Fix B2 (doppio save): Rimuovere una delle due chiamate
3. Fix B3 (phone protection): Documentare fail-open, opzionale toggle

#### 4.1.2 High Priority (Perf Regressions, UX Break)

| ID  | Fix                             | File                                    | Priorità | Effort   |
| --- | ------------------------------- | --------------------------------------- | -------- | -------- |
| H1  | **Rimuovere `/api/menu` da SW** | `public/sw.js`                          | 🟡 HIGH  | 30 min   |
| H2  | **OTP throttle / countdown**    | `components/EmailVerificationModal.tsx` | 🟡 HIGH  | 1 giorno |
| H3  | **Gate `e2eConsent`**           | `app/state/bootstrap.ts`                | 🟡 HIGH  | 1 ora    |
| H4  | **Persistenza carrello**        | `context/hooks/useCartState.tsx`        | 🟡 HIGH  | 2 giorni |

**Dipendenze**: Nessuna

**Cosa fare ORA**:

1. Fix H1 (SW cache): Rimuovere `/api/menu` da `CACHEABLE_API`
2. Fix H2 (OTP throttle): Countdown 60-90s, disabilitare pulsante
3. Fix H3 (e2eConsent): Gate a `E2E_CONSENT_TEST=1` + build dev/test
4. Fix H4 (carrello persist): AsyncStorage sync

#### 4.1.3 TEST_MODE Completo

| ID  | Fix                                     | File                                        | Priorità  | Effort   |
| --- | --------------------------------------- | ------------------------------------------- | --------- | -------- |
| T1  | **Aggiornare scripts test**             | `scripts/*.mjs`                             | 🟡 HIGH   | 2 giorni |
| T2  | **Filtro produzione `is_test = false`** | Query produzione                            | 🟡 HIGH   | 1 giorno |
| T3  | **Documentazione TEST_MODE**            | `docs/PIZZERIA_TEST_MODE_IMPLEMENTATION.md` | 🟢 MEDIUM | 1 giorno |

**Dipendenze**: Nessuna

**Cosa fare ORA**:

1. Fix T1: Aggiungere `is_test: true` a tutti gli scripts test
2. Fix T2: Aggiungere filtro `WHERE is_test = false` a query produzione
3. Fix T3: Aggiornare documentazione

### 4.2 Cosa Serve per App Nativa HUB

#### 4.2.1 Stato Attuale

**Evidenze**:

- Nessun codice per app nativa HUB trovato
- Monorepo ha `apps/barbiere-app` (PWA) e `apps/pizzeria-mobile` (Expo/PWA)
- `business-platform/packages/`: Core-kit-food, core-kit-bookings

**Status**: 📋 **FUTURE** (non iniziato)

#### 4.2.2 Cosa Serve

| Task | Descrizione                       | Effort    | Dipendenze |
| ---- | --------------------------------- | --------- | ---------- |
| 1    | **Architettura app nativa**       | 5 giorni  | Nessuna    |
| 2    | **Unificare auth**                | 3 giorni  | Task 1     |
| 3    | **Unificare navigation**          | 5 giorni  | Task 2     |
| 4    | **Integrare barbiere + pizzeria** | 10 giorni | Task 3     |
| 5    | **Branding HUBIA**                | 2 giorni  | Task 4     |
| 6    | **Test end-to-end**               | 5 giorni  | Task 5     |
| 7    | **Deploy iOS/Android**            | 3 giorni  | Task 6     |

**Total**: ~33 giorni (~6-7 settimane)

**Note**: App nativa HUB richiede unificazione di:

- Auth (OTP, PIN, session)
- Navigation (tab bar con barbiere/pizzeria)
- Branding (HUBIA logo, payoff)
- Core-kit unificato (bookings + food)

---

## Checklist Ordinata

### Priorità 1: Pizzeria Vendibile (Blocker)

- [ ] **B1**: Idempotency key per azione (non per chiamata)
  - File: `hooks/usePlaceOrder.ts`, `services/orders.ts`
  - Effort: 2-3 giorni
  - Dipendenze: Nessuna

- [ ] **B2**: Un solo save-profile al login
  - File: `App.tsx`, `LoginScreen.tsx`
  - Effort: 1 giorno
  - Dipendenze: Nessuna

- [ ] **B3**: Fail-open phone protection (doc + toggle)
  - File: `services/phoneProtection.ts`
  - Effort: 1 giorno
  - Dipendenze: Nessuna

### Priorità 2: Pizzeria Vendibile (High)

- [ ] **H1**: Rimuovere `/api/menu` da SW
  - File: `public/sw.js`
  - Effort: 30 min
  - Dipendenze: Nessuna

- [ ] **H2**: OTP throttle / countdown
  - File: `components/EmailVerificationModal.tsx`
  - Effort: 1 giorno
  - Dipendenze: Nessuna

- [ ] **H3**: Gate `e2eConsent`
  - File: `app/state/bootstrap.ts`
  - Effort: 1 ora
  - Dipendenze: Nessuna

- [ ] **H4**: Persistenza carrello
  - File: `context/hooks/useCartState.tsx`
  - Effort: 2 giorni
  - Dipendenze: Nessuna

### Priorità 3: TEST_MODE Completo

- [ ] **T1**: Aggiornare scripts test con `is_test: true`
  - File: `scripts/*.mjs`
  - Effort: 2 giorni
  - Dipendenze: Nessuna

- [ ] **T2**: Filtro produzione `is_test = false`
  - File: Query produzione
  - Effort: 1 giorno
  - Dipendenze: T1

- [ ] **T3**: Documentazione TEST_MODE
  - File: `docs/PIZZERIA_TEST_MODE_IMPLEMENTATION.md`
  - Effort: 1 giorno
  - Dipendenze: T1, T2

### Priorità 4: App Nativa HUB (Future)

- [ ] **HUB1**: Architettura app nativa
  - Effort: 5 giorni
  - Dipendenze: Nessuna

- [ ] **HUB2**: Unificare auth
  - Effort: 3 giorni
  - Dipendenze: HUB1

- [ ] **HUB3**: Unificare navigation
  - Effort: 5 giorni
  - Dipendenze: HUB2

- [ ] **HUB4**: Integrare barbiere + pizzeria
  - Effort: 10 giorni
  - Dipendenze: HUB3

- [ ] **HUB5**: Branding HUBIA
  - Effort: 2 giorni
  - Dipendenze: HUB4

- [ ] **HUB6**: Test end-to-end
  - Effort: 5 giorni
  - Dipendenze: HUB5

- [ ] **HUB7**: Deploy iOS/Android
  - Effort: 3 giorni
  - Dipendenze: HUB6

---

## Cosa Fare ORA

### Immediate (Questa Settimana)

1. **Fix B1** (Idempotency key): 🔴 BLOCKER - 2-3 giorni
2. **Fix B2** (Doppio save-profile): 🔴 BLOCKER - 1 giorno
3. **Fix H1** (SW cache): 🟡 HIGH - 30 min
4. **Fix T1** (Scripts test): 🟡 HIGH - 2 giorni

### Short Term (Prossime 2 Settimane)

5. **Fix B3** (Phone protection): 🟡 HIGH - 1 giorno
6. **Fix H2** (OTP throttle): 🟡 HIGH - 1 giorno
7. **Fix H3** (e2eConsent): 🟡 HIGH - 1 ora
8. **Fix H4** (Carrello persist): 🟡 HIGH - 2 giorni
9. **Fix T2** (Filtro produzione): 🟡 HIGH - 1 giorno
10. **Fix T3** (Doc TEST_MODE): 🟢 MEDIUM - 1 giorno

### Medium Term (Prossimo Mese)

11. Test completi pizzeria
12. Release pizzeria v1.0

### Long Term (Prossimi 3 Mesi)

13. **HUB1-HUB7** (App nativa): ~33 giorni (~6-7 settimane)

---

## Cosa Rimandare

### Non Critico (Rimandabile)

- ⏸️ **Rate limiting globale**: Parziale OK per MVP
- ⏸️ **Error tracking aggregato**: Logging strutturato presente
- ⏸️ **Offline queue**: Non critico per MVP
- ⏸️ **Booking submit v2**: Performance attuale accettabile
- ⏸️ **SMTP custom**: Supabase default funziona

### Future (Non Ora)

- ⏸️ **App nativa HUB**: Dopo pizzeria vendibile
- ⏸️ **Multi-tenant URL**: Single-tenant OK per ora
- ⏸️ **Allergeni menu**: Non richiesto
- ⏸️ **Cancel/refund flow**: Non implementato, non critico

---

## UNKNOWN / Da Verificare

1. **HUB app**: Architettura esatta non definita (da progettare)
2. **Multi-tenant pizzeria**: Attualmente single-tenant, roadmap multi-tenant non chiara
3. **Branding HUBIA**: Logo e payoff definiti, ma integrazione completa non verificata

---

## Riferimenti

### Documenti Chiave

- `apps/barbiere-app/docs/BARBIERE_FINAL_CHECKUP.md`: Production readiness
- `apps/barbiere-app/docs/RELEASE_GATE_REPORT_2026-01-25T20-14-06.md`: Ultimo gate
- `apps/pizzeria-mobile/docs/PIZZERIA_MEGA_AUDIT_CUSTOMER.md`: Mega audit
- `apps/pizzeria-mobile/docs/PIZZERIA_FIX_PLAN_V2.md`: Fix plan
- `apps/pizzeria-mobile/docs/PIZZERIA_TESTMODE_PUSH_SUPPRESSION.md`: TEST_MODE push
- `apps/pizzeria-mobile/docs/PIZZERIA_TEST_MODE_IMPLEMENTATION.md`: TEST_MODE completo

### Migrations

- `apps/pizzeria-mobile/supabase/migrations/20260126000000_add_test_mode_columns.sql`: TEST_MODE columns
- `apps/barbiere-app/supabase/migrations/20260226000000_create_cron_locks.sql`: Cron locks
- `apps/barbiere-app/supabase/migrations/20260226000001_create_acquire_cron_lock_rpc.sql`: Cron lock RPC

### Scripts

- `apps/pizzeria-mobile/scripts/run_project_gate_pizzeria.mjs`: Gate con TEST_MODE
- `apps/barbiere-app/scripts/print_cron_urls.mjs`: Helper cron setup

---

**Documento generato**: 2026-01-26  
**Versione**: 1.0.0  
**Metodologia**: Evidence-based analysis di documentazione, audit, migrations, codice sorgente
