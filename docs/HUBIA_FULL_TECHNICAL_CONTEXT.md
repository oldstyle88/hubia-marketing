# HUBIA — Full Technical Context (Facts Only)

**Scope**: BARBIERE (baseline/stabile) + PIZZERIA (in audit).  
**Purpose**: Quadro completo e comparabile per CTO esterno; base per HUB app, nuovi verticali, freeze vs refactor.  
**Method**: Solo fatti verificabili (file:line o documento esistente). Se non documentabile → **MISSING**.

---

## 1. Executive Summary (solo fatti)

- **BARBIERE**: PWA (Vite + React Router), client `index.html` → `src/main.tsx` → `App`; staff `staff.html` → `staff-v3`. API Vercel (`/api/public/*`, `/api/v1`, `/api/admin/shops`, `/api/legacy/*`). Supabase: Auth (OTP), DB, Realtime. Multi-tenant: `clientSlug` (tenant) o `shop_id` (legacy). Shop creation: Founder Dashboard → `POST /api/admin/shops` → RPC `admin_provision_shop` → `shops`, `shop_settings`, `services`, `staff`, `business_hours`. Evidenze: `PROJECT_OVERVIEW_REAL.md`, `api/admin/shops/index.js` L234–236, `supabase/migrations/20260203040000_admin_provision_shop_rpc.sql`.
- **PIZZERIA**: PWA (Expo export web), single tenant per deploy (`EXPO_PUBLIC_RESTAURANT_ID`). API Vercel (`/api/create-order`, `/api/router?action=*`, `/api/staff-router`, `/api/client/*`, `/api/staff/*`). Supabase: Auth (phone/OTP opzionale), DB, Realtime. Nessun Founder Dashboard; `CURRENT_RESTAURANT` da `config/restaurant.ts` (env). Evidenze: `config/restaurant.ts`, `PIZZERIA_CTO_AUDIT_REPORT.md`, `PIZZERIA_DB_RLS_AUDIT.md`.
- **Data access**: Barbiere: client Supabase diretto (BookingScreen, HomeScreen, staff-v3) + API; pizzeria: **API-only** per ordini/create-order, client Supabase per menu/categories/products e sottoscrizioni Realtime. Evidenze: `PROJECT_OVERVIEW_REAL.md` §2, `DB_CODE_QUERIES_MAP.json`; `api/create-order.js`, `PIZZERIA_DB_RLS_AUDIT.md` “SERVER_SIDE_ORDER_CREATION”.
- **Isolamento**: Barbiere: RLS + API guard (`shop_id`, `resolveShopId`, `getLegacyShopIdServer`); pizzeria: `restaurant_id` in API, RLS su tabelle tenant-bound. Evidenze: `api/_lib/resolveShopId.js`, `src/server/lib/getLegacyShopIdServer.js`; `PIZZERIA_DB_RLS_AUDIT.md`, `api/create-order.js`.
- **Shop creation**: Barbiere: automatizzato (RPC); pizzeria: **MISSING** (no admin provisioning; singolo ristorante da env).

---

## 2. Document Coverage (Barbiere vs Pizzeria)

### 2.1 Barbiere — Inventario (scopo, livello)

| File                                                             | Scopo                                                                               | Livello                   |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------- |
| `PROJECT_OVERVIEW_REAL.md`                                       | Architettura, stack, client/staff/API, entry point                                  | architettura              |
| `LEGACY_PUBLIC_APIS_CALLER_MAP.md`                               | Caller di `/api/public/services`, `/api/public/slots`; tenant vs legacy             | API / client              |
| `LEGACY_PUBLIC_APIS_FIX_PR_SUMMARY.md`                           | Fix legacy resolve per services/slots                                               | API                       |
| `BARBIERE_API_ROUTING_RULES.md`                                  | Regole routing API                                                                  | infra                     |
| `CRON_SHOP_SCOPED_IMPLEMENTATION.md`                             | Cron shop-scoped, locks, time budget                                                | infra / business          |
| `RLS_POSTURE_BARBIERE_V2.md`                                     | RLS, policies                                                                       | sicurezza                 |
| `BARBIERE_FINAL_CHECKUP.md`                                      | Checklist finale, migrations                                                        | infra                     |
| `BARBIERE_*_AUDIT.md` (multiple)                                 | Audit analytics, blocks, booking, customer_me, registration, service duration, ecc. | business / client / staff |
| `RECURRING_*.md` (multiple)                                      | Recurring bookings, materializer, UI, bug, verification                             | business / staff          |
| `STAFF_DASHBOARD_*`, `STAFF_DASHBOARD_WRITE_PATHS_*`             | Dashboard staff, write paths, smoke                                                 | staff                     |
| `ANALYTICS_*`, `CUSTOMER_DETAIL_SNAPSHOT_*`                      | Analytics, metriche, snapshot                                                       | business / staff          |
| `BOOKING_SUBMIT_PERF_AUDIT.md`, `_runlogs/BOOKING_SUBMIT_PERF_*` | Performance submit booking                                                          | client / API              |
| `RELEASE_GATE_REPORT_*`                                          | Gate test, pass/fail                                                                | infra                     |
| `FOUNDER_*`, `FOUNDER_CONTROL_PLANE_SPEC.md`                     | Founder, control plane, shop creation                                               | architettura / business   |
| `HUBIA_*.md`                                                     | Brand, prezzi, cosa include                                                         | business                  |
| `docs/_runlogs/*`                                                | Runlog vari                                                                         | infra                     |

Evidenza: `apps/barbiere-app/docs/` (listing).

### 2.2 Pizzeria — Inventario (scopo, livello)

| File                                                                        | Scopo                                       | Livello                  |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------ |
| `PIZZERIA_CTO_AUDIT_REPORT.md`                                              | Audit CTO, P0/P1/P2, patch plan             | architettura / sicurezza |
| `PIZZERIA_DB_RLS_AUDIT.md`                                                  | Schema, FK, RLS, tenant-bound, isolation    | sicurezza / DB           |
| `PIZZERIA_CLIENT_FORENSIC_AUDIT_V2.md`, `PIZZERIA_CLIENT_FORENSIC_AUDIT.md` | Audit client, runlog, call trace, spam/loop | client                   |
| `PIZZERIA_MASTER_AUDIT_V2.md`, `PIZZERIA_MEGA_AUDIT_CUSTOMER.md`            | Master audit, customer flow                 | architettura / client    |
| `PIZZERIA_ORDER_FLOW_AUDIT.md`, `ORDERFLOW_*`                               | Order flow, modal, ASAP, staff accept       | client / staff           |
| `PIZZERIA_AUTH_OTP_AUDIT.md`, `PIZZERIA_CUSTOMER_ENTRY_AUDIT.md`            | Auth, OTP, customer entry                   | client                   |
| `PIZZERIA_PUSH_*`, `PIZZERIA_TESTMODE_PUSH_SUPPRESSION.md`                  | Push, status, diagnostics, test mode        | client / API             |
| `PIZZERIA_PRIVACY_PUSH_STATE_AUDIT.md`                                      | Privacy modal, push state, Account OFF/ON   | client                   |
| `PIZZERIA_PWA_MANIFEST_SW_AUDIT.md`, `PIZZERIA_ANDROID_INSTALL_FIX.md`      | PWA, manifest, SW, install                  | client / infra           |
| `PIZZERIA_ORDER_MODAL_LOOP_FIX.md`                                          | Fix loop modal completed/delivered          | client                   |
| `PIZZERIA_RELEASE_GATE.md`, `RELEASE_GATE_PIZZERIA.md`                      | Gate pizzeria                               | infra                    |
| `PIZZERIA_TEST_MODE_IMPLEMENTATION.md`                                      | Test mode, is_test, cleanup                 | infra / API              |
| `ADR_0001_PIZZERIA_LEGACY_POSTURE.md`                                       | ADR legacy, DB normalisation, RLS           | architettura             |
| `RLS_POSTURE_PIZZERIA.md`, `DB_CANONICALIZATION_PLAN_PIZZERIA.md`           | RLS, canonicalisation                       | DB / sicurezza           |
| `docs/_runlogs/*`                                                           | Runlog client, gate, DB, tenant, manifest   | infra                    |

Evidenza: `apps/pizzeria-mobile/docs/` (listing).

### 2.3 Gap Analysis (Pizzeria vs Barbiere)

| Area                    | Barbiere                            | Pizzeria                                           | Gap                                                                                       |
| ----------------------- | ----------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Project overview        | `PROJECT_OVERVIEW_REAL.md`          | `PIZZERIA_CTO_AUDIT` + master audit                | Pizzeria: nessun singolo “overview” equivalente; info sparsa in audit.                    |
| API caller map          | `LEGACY_PUBLIC_APIS_CALLER_MAP`     | Parziale in forensic audit, `trace_client_flow`    | **MISSING**: caller map completa `/api/router`, `/api/create-order`, `/api/staff-router`. |
| Cron / jobs             | `CRON_SHOP_SCOPED_IMPLEMENTATION`   | Test mode cleanup; nessun cron doc                 | **MISSING**: doc cron pizzeria (cleanup_test_rows, eventuali job).                        |
| Founder / shop creation | `FOUNDER_*`, `admin_provision_shop` | N/A                                                | **MISSING**: pizzeria non ha Founder né provisioning shop.                                |
| RLS                     | `RLS_POSTURE_BARBIERE_V2`           | `RLS_POSTURE_PIZZERIA`, `PIZZERIA_DB_RLS_AUDIT`    | Coperto.                                                                                  |
| Analytics               | Molti `ANALYTICS_*`                 | `StaffAnalyticsTab`, `api/staff/analytics/summary` | Pizzeria: **MISSING** audit analytics dedicato.                                           |
| Recurring / calendar    | `RECURRING_*`                       | N/A (slots, ordini)                                | N/A per pizzeria.                                                                         |

---

## 3. Architecture Comparison

### 3.1 Diagramma testuale

```
BARBIERE
────────
[Client PWA] ◄──► [/api/public/*, /api/v1, /api/legacy/*]
     │                        │
     │                        ▼
     │                 [Vercel Serverless]
     │                        │
     └────────────────────────┼────────────────────────► [Supabase]
                              │ Anon + Service role
                    Auth (OTP) │ DB │ Realtime
                    shop_id / clientSlug

[Staff V3]   ◄──► [/api/v1, /api/legacy/*]  ──► [Supabase]
     │                x-staff-pin, JWT

[Founder]   ◄──► [/api/admin/shops]  ──► admin_provision_shop (RPC)  ──► [Supabase]


PIZZERIA
────────
[Client PWA] ◄──► [/api/create-order, /api/router?action=*, /api/client/*]
     │                        │
     │                        ▼
     │                 [Vercel Serverless]
     │                        │
     └────────────────────────┼────────────────────────► [Supabase]
                              │ Service role (API) │ Anon (menu, realtime)
                    restaurant_id (CURRENT_RESTAURANT / env)

[Staff]     ◄──► [/api/staff-router, /api/staff/*]  ──► [Supabase]
     │                PIN verify, then staff-router
```

### 3.2 Tabella comparativa

| Aspetto                 | Barbiere                                                          | Pizzeria                                                                                                     | Evidenza                                                                                                         |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Build                   | Vite, React Router                                                | Expo export web                                                                                              | `barbiere-app/package.json`, `vite.config`; `pizzeria-mobile/package.json` “expo export”.                        |
| Client entry            | `index.html` → `main` → `App`                                     | `index.ts` → `App`                                                                                           | `barbiere-app/src/main.tsx`; `pizzeria-mobile/index.ts`, `App.tsx`.                                              |
| Staff entry             | `staff.html` → `staff-v3`                                         | `staff.html` → StaffWebDashboard (esbuild)                                                                   | `barbiere-app/src/staff-v3/index.tsx`; `pizzeria-mobile/components/StaffWebDashboard`, `build-staff.js`.         |
| API                     | `/api/public/*`, `/api/v1`, `/api/legacy/*`, `/api/admin/*`, cron | `/api/create-order`, `/api/router`, `/api/staff-router`, `/api/client/*`, `/api/staff/*`, `/api/push-router` | `barbiere-app/api/`, `vercel.json`; `pizzeria-mobile/api/`, `router.js`, `staff-router.js`, `create-order.js`.   |
| Supabase client diretto | Sì (BookingScreen, HomeScreen, staff-v3)                          | Sì (menu, realtime, modifiers); ordini **solo** via API                                                      | `PROJECT_OVERVIEW_REAL` §2; `DB_CODE_QUERIES_MAP`; `pizzeria-mobile/services/menu`, `placeOrder` → create-order. |
| Auth                    | Supabase OTP (email)                                              | Phone + optional OTP; `save-profile` / router                                                                | `barbiere-app/src/screens/LoginScreen`; `pizzeria-mobile` login, `api/router` save-profile.                      |
| Tenant ID               | `shop_id` (legacy) o `clientSlug` (tenant)                        | `restaurant_id` (singolo per deploy)                                                                         | `resolveShopId`, `getLegacyShopIdServer`; `config/restaurant.ts`, `EXPO_PUBLIC_RESTAURANT_ID`.                   |
| Isolamento              | RLS + API `shop_id` filter                                        | RLS + API `restaurant_id`                                                                                    | `RLS_POSTURE_BARBIERE_V2`; `PIZZERIA_DB_RLS_AUDIT`, `create-order.js`.                                           |

---

## 4. Data Access Comparison

### 4.1 Barbiere — Supabase (client + server)

- **Client**: `src/utils/supabase.ts` (createClient anon). Uso: `LoginScreen` (Auth OTP), `HomeScreen` (services, loyalty, bookings), `BookingScreen` (customers, bookings insert, services), `staff-v3` (bookings, customers, services, staff, business_hours, calendar_blocks, recurring, inbox, analytics). Tabelle: `customers`, `bookings`, `services`, `staff`, `staff_availability`, `staff_temporary_absences`, `staff_day_overrides`, `calendar_blocks`, `loyalty`, `business_hours`, `staff_notifications`, ecc.
- **Server**: `api/_lib/supabaseAdmin.js` (service_role). API `public`, `v1`, `legacy`, `admin`, cron: read/write su stesse tabelle + `shops`, `shop_settings`. RPC: `admin_provision_shop`, `create_booking_atomic`, `consume_free_haircut`, `acquire_cron_lock`, ecc.
- **Enforcement**: RLS su tabelle; API filtra per `shop_id` / `clientSlug`. Evidenze: `PROJECT_OVERVIEW_REAL`, `DB_CODE_QUERIES_MAP`, `api/_lib/resolveShopId.js`, `api/_lib/supabaseAdmin.js`.

### 4.2 Pizzeria — Supabase (client + server)

- **Client**: `utils/supabase.ts`, `api/_lib/supabaseClient.js`. Uso: menu (categories, products, modifiers), Realtime (orders), loyalty, flavours, restaurant status, customer preferences. **Non** ordini: solo `/api/create-order`. Evidenze: `services/menu.ts`, `services/placeOrder.ts` (create-order), `hooks/useOrderStatusSubscription`, `PIZZERIA_DB_RLS_AUDIT`.
- **Server**: Service role in `create-order`, `router`, `staff-router`, `push-router`, `api/client/*`, `api/staff/*`. Tabelle: `orders`, `order_items`, `customers`, `categories`, `products`, `restaurant_openings`, `web_push_subscriptions`, `expo_push_tokens`, `customer_privacy_consents`, `customer_messages`, `order_events`, ecc.
- **Enforcement**: RLS su tabelle tenant-bound; API sempre con `restaurant_id`. Ordini solo via API. Evidenze: `api/create-order.js`, `api/router.js`, `api/staff-router.js`, `PIZZERIA_DB_RLS_AUDIT`.

### 4.3 Barbiere — API (endpoint, caller, payload, responsabilità)

| Endpoint                                 | Chi chiama                    | Payload / params                             | Responsabilità                                               |
| ---------------------------------------- | ----------------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `GET /api/public/services`               | BookingScreen, gate, smoke    | `clientSlug` (tenant) o legacy shop          | Resolve shop, return services; `api/public/services.js`.     |
| `GET /api/public/slots`                  | BookingScreen, staff-v3, gate | `clientSlug`, `date`, `staffId`, `serviceId` | Slots; `api/public/slots.js`.                                |
| `GET /api/public/bootstrap`              | Tenant bootstrap              | `clientSlug`                                 | Shop config; `api/public/bootstrap.js`.                      |
| `POST /api/public/bookings`              | BookingScreen (tenant)        | `clientSlug`, booking payload                | Create booking; `api/public/bookings.js`.                    |
| `GET/POST /api/public/customer_me`       | Client auth                   | Bearer / body                                | Customer me; PWA guard; `api/public/customer_me.js`.         |
| `POST /api/v1`                           | Staff-v3, client (legacy)     | `action`, body, `x-staff-pin` / JWT          | Staff actions, customer actions; `api/v1.js`.                |
| `GET/POST/PATCH/DELETE /api/admin/shops` | Founder Dashboard             | `x-admin-key`, body                          | List/create/update/delete shops; `api/admin/shops/index.js`. |
| `POST /api/legacy/*`                     | Legacy staff, cron            | Varie                                        | Legacy compatibility.                                        |
| `GET /api/cron/tick`                     | Vercel Cron                   | –                                            | Shop-scoped cron; `api/cron/tick.js`.                        |

Evidenze: `LEGACY_PUBLIC_APIS_CALLER_MAP`, `api/` layout, `vercel.json` rewrites.

### 4.4 Pizzeria — API (endpoint, caller, payload, responsabilità)

| Endpoint                                                           | Chi chiama                                        | Payload / params                                     | Responsabilità                                                                              |
| ------------------------------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `POST /api/create-order`                                           | `services/placeOrder` → `placeOrderCore`          | `restaurant_id`, order payload, `x-idempotency-key`  | Crea ordine; unico path creazione ordine. `api/create-order.js`, `services/orders.ts` L254. |
| `POST /api/router?action=*`                                        | Vedi sotto                                        | `action` in query o body, `restaurant_id` dove serve | Multiplex; `api/router.js` switch L2417–2484.                                               |
| `profile-exists`                                                   | `bootstrap.checkCustomerProfileExists`            | `phone`                                              | Esistenza profilo; `app/state/bootstrap.ts` L588.                                           |
| `save-profile`                                                     | `App` confirmLogin, handleLogin                   | `phone`, `name`                                      | Upsert customers; `App.tsx` L2083, `router` handleProfiles.                                 |
| `push_status`                                                      | Consent gate, Account, PrivacyConsentModal        | `phone` / `endpoint`, `restaurant_id`                | Stato push/privacy; `consentGate`, `AccountScreen`, `PrivacyConsentModal`.                  |
| `privacy_accept`, `marketing_opt_in`                               | PrivacyConsentModal                               | `phone`, `restaurant_id`, consent                    | Consenso; `PrivacyConsentModal`.                                                            |
| `save-expo-token`, `save-subscription`, `toggle-push-subscription` | Push orchestrator, Account                        | Push payload                                         | Registrazione/toggle push; `pushOrchestrator`, `AccountScreen`.                             |
| `customer-messages`, `mark-message-read`, `send-notification`      | MessagesScreen, Staff                             | `phone`, ids                                         | Messaggi; `MessagesScreen`, Staff tabs.                                                     |
| `ack-confirmed`                                                    | OrderFlowModal                                    | `orderId`                                            | Ack ordine confermato; `OrderFlowModal` L677.                                               |
| `check-phone-verified`, `family-suggestions`                       | Auth, family                                      | Varie                                                | Auth/feature; `services/auth`, family.                                                      |
| `POST /api/staff-router`                                           | Staff dashboard, placeOrder (accept)              | `action`, body, PIN                                  | Accept order, update status, analytics, ecc.; `staff-router.js`, `placeOrder.ts` L431.      |
| `POST /api/staff/pin/verify`                                       | StaffWebDashboard                                 | PIN                                                  | Verifica PIN; `api/staff/pin/verify.js`.                                                    |
| `GET /api/staff/analytics/summary`                                 | StaffAnalyticsTab                                 | –                                                    | Analytics; `api/staff/analytics/summary.js`.                                                |
| `GET /api/staff/restaurant/status`                                 | `restaurantStatus`                                | –                                                    | Stato ristorante; `api/staff/restaurant/status.js`.                                         |
| `POST /api/client/*`                                               | Client (push, auth, orders, loyalty, preferences) | Varie                                                | Push register/status, auth, orders, loyalty, preferences; `api/client/*`.                   |
| `POST /api/push-router`                                            | Solo server (staff-router, router)                | `phone`, `title`, `body`                             | Invio push; pubblico, senza auth. `PIZZERIA_CTO_AUDIT` B1.                                  |

Evidenze: `api/router.js`, `api/staff-router.js`, `api/create-order.js`, grep caller in `App`, `bootstrap`, `placeOrder`, `OrderFlowModal`, `AccountScreen`, `MessagesScreen`, staff tabs.

---

## 5. End-to-End Flow Comparison

### 5.1 Barbiere — Entry → Auth → Privacy → Core → Completion

| Step       | Funzione client (file:line)                                             | API / Supabase                                     | Effetti DB                        | Storage               |
| ---------- | ----------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------- | --------------------- |
| Entry      | `App` → Routes `/`, `/home`, `/booking`                                 | –                                                  | –                                 | –                     |
| Auth       | `LoginScreen` signInWithOtp, verifyOtp                                  | Supabase Auth OTP                                  | –                                 | localStorage (legacy) |
| Privacy    | RequirePWA → InstallGate se !standalone; consent via customer flow      | –                                                  | –                                 | –                     |
| Profile    | Post-login, customer_me                                                 | `customer_me`, upsert                              | `customers`                       | –                     |
| Services   | `HomeScreen`, `BookingScreen`                                           | Supabase `services` o `/api/public/services`       | read                              | –                     |
| Slots      | `BookingScreen` fetchSlots                                              | `/api/public/slots`                                | read                              | –                     |
| Book       | `BookingScreen` handleBook o `bookingCore.createBookingWithValidations` | Supabase `bookings` insert o RPC / public bookings | `bookings`, `staff_notifications` | –                     |
| Completion | View booking, manage                                                    | `bookings` read, manage APIs                       | –                                 | –                     |

Evidenze: `PROJECT_OVERVIEW_REAL` §2, `src/screens/LoginScreen`, `BookingScreen`, `src/services/bookingCore.ts`, `api/public/*`.

### 5.2 Pizzeria — Entry → Auth → Privacy → Core → Completion

| Step         | Funzione client (file:line)                                | API / Supabase                                            | Effetti DB                        | Storage                                      |
| ------------ | ---------------------------------------------------------- | --------------------------------------------------------- | --------------------------------- | -------------------------------------------- |
| Entry        | `App` → `!showMain` → InstallGate (web !PWA) o LoginScreen | –                                                         | –                                 | –                                            |
| Auth         | Login (phone), confirmLogin                                | `save-profile` (router)                                   | `customers` upsert                | AsyncStorage `customerPhone`, `customerName` |
| Privacy      | Bootstrap `checkProfileAndPush` → consent gate → modal     | `push_status`, `privacy_accept`                           | `customer_privacy_consents`, push | `consent_ack_v`, `consent_ack_at`            |
| Menu         | `loadInitialMenu`, `loadUnavailableFlavours`               | Supabase `categories`, `products`, `unavailable_flavours` | read                              | –                                            |
| Cart         | Local state (`useCartPricing`, modals)                     | –                                                         | –                                 | –                                            |
| Slots        | `useSlotScheduling`                                        | `/api/client/slots`                                       | read                              | –                                            |
| Checkout     | `placeOrder` → `createOrderWithItems`                      | `POST /api/create-order`                                  | `orders`, `order_items`           | –                                            |
| Staff accept | E2E / staff                                                | `POST /api/staff-router` accept                           | `orders` update, `order_events`   | –                                            |
| Payment      | OrderFlowModal, Satispay redirect                          | `orders/[id]/payment`, `summary`, `status`                | `orders` update                   | –                                            |
| Completion   | `useOrderStatusSubscription`, OrderFlowModal               | Realtime + `ack-confirmed`                                | `order_events`                    | `orderCompletionGuard` (seen ids)            |

Evidenze: `App.tsx`, `bootstrap.ts`, `services/menu`, `placeOrder`, `useOrderStatusSubscription`, `OrderFlowModal`, `api/create-order`, `api/staff-router`, `api/router`, `PIZZERIA_CLIENT_FORENSIC_AUDIT_V2`, `PIZZERIA_ORDER_MODAL_LOOP_FIX`.

---

## 6. Tenant Isolation Model

### 6.1 Barbiere

- **Risoluzione**: `clientSlug` (tenant) da URL `?client=...` o dominio; legacy `shop_id` da `SHOP_ID` / `VITE_SHOP_ID` / `LEGACY_SHOP_ID`. `api/_lib/resolveShopId.js`, `getLegacyShopIdServer`, `getLegacyShopIdResolver`.
- **Propagazione**: Header, query, body; server legge `resolveShopId` o legacy resolver e filtra tutte le query con `shop_id`. Staff: `requireShopId` (server), `useShopId` (client).
- **Enforcement**: RLS su tabelle `shop_id`; API **sempre** filtra per `shop_id` prima di query. Evidenze: `RLS_POSTURE_BARBIERE_V2`, `LEGACY_PUBLIC_APIS_CALLER_MAP`, `staffRecurringAppointments.js` (eq `shop_id`).

### 6.2 Pizzeria

- **Risoluzione**: `restaurant_id` = `EXPO_PUBLIC_RESTAURANT_ID` (env), singolo per deploy. `config/restaurant.ts`, `CURRENT_RESTAURANT.id`.
- **Propagazione**: Client invia `restaurant_id` in payload dove richiesto; API usa `RESTAURANT_ID` da env o da body. Nessun multi-tenant per deploy.
- **Enforcement**: RLS su `restaurant_id`; API filtra per `restaurant_id`. Ordini solo tramite `create-order` (service_role). Evidenze: `PIZZERIA_DB_RLS_AUDIT`, `api/create-order.js`, `api/router.js`, `api/client/push/status.js`.

### 6.3 Differenze

| Aspetto         | Barbiere                  | Pizzeria                               |
| --------------- | ------------------------- | -------------------------------------- |
| Multi-tenant    | Sì (clientSlug / shop_id) | No; singolo `restaurant_id` per deploy |
| RLS             | Sì, shop_id               | Sì, restaurant_id                      |
| API guard       | `shop_id` in ogni path    | `restaurant_id` in ogni path           |
| Founder / admin | Sì, admin shops           | **MISSING**                            |

---

## 7. Shop Creation Model

### 7.1 Barbiere — Creazione shop (come funziona oggi)

1. **Trigger**: Founder Dashboard (`/founder`), solo se `VITE_ENABLE_FOUNDER=true`. `App.tsx` route, `FounderDashboard.tsx`.
2. **UI**: Form (name, vertical_type, ecc.) → “Create” → `POST /api/admin/shops` con `x-admin-key` (ev. `ADMIN_API_KEY`). `FounderDashboard` L385–455.
3. **API**: `api/admin/shops/index.js` `handlePost` → valida `x-admin-key` → `supabase.rpc('admin_provision_shop', { payload })`. L234–236.
4. **RPC**: `admin_provision_shop` (SECURITY DEFINER, service_role only). Crea atomically: `shops`, `shop_settings`, `services`, `staff`, `business_hours`; idempotency su (name, vertical_type). Default data, `temporary_pin` generato e restituito una sola volta. Evidenze: `supabase/migrations/20260203040000_admin_provision_shop_rpc.sql`, `scripts/sql/apply_admin_provision_shop_idempotency*.sql`.
5. **Output**: `shop_id`, `client_slug`, `client_url`, `staff_url`, `temporary_pin`. Founder mostra e copia.

Evidenze: `api/admin/shops/index.js` L211–299, `FounderDashboard` L385–455, migration RPC.

### 7.2 Pizzeria — Shop creation readiness

- **Stato**: Nessun Founder Dashboard, nessun endpoint admin per provisioning ristoranti. Singolo ristorante da `EXPO_PUBLIC_RESTAURANT_ID` e `config/restaurant.ts`.
- **Tabelle**: `restaurants` esiste; migrations per `orders`, `products`, ecc. sono `restaurant_id`-scoped. **MISSING**: RPC o API per creare nuovo `restaurants` + default data (menu, openings, ecc.).
- **Differenze**: Barbiere ha `admin_provision_shop` + Founder UI; pizzeria no. Per “stesso flusso” servirebbero: equivalente `admin_provision_restaurant` (o simile), API `POST /api/admin/restaurants`, UI Founder (o script).

Evidenze: `config/restaurant.ts`, `PIZZERIA_DB_RLS_AUDIT`, assenza di `api/admin` per pizzeria.

---

## 8. Gaps & MISSING

- **Pizzeria**
  - **MISSING**: Caller map completa per `/api/router`, `/api/create-order`, `/api/staff-router` (chi chiama, con quali payload). Parzialmente in forensic audit, non consolidata.
  - **MISSING**: Documentazione cron (cleanup test, eventuali job). Solo `cleanup_test_rows` in migration.
  - **MISSING**: Shop/restaurant creation (Founder, RPC, API). Solo singolo tenant da env.
  - **MISSING**: Audit analytics dedicato (metriche, coherence API vs DB) come in barbiere.
  - **MISSING**: `/api/save-customer-profile` richiamato da client ma inesistente (404). `PIZZERIA_CTO_AUDIT` P1.2.

- **Barbiere**
  - **MISSING**: Nessun gap maggiore evidenziato negli audit usati; dettaglio in `PROJECT_OVERVIEW_REAL` e doc correlati.

- **Cross-verticale**
  - **MISSING**: Documento unico “standard HUBIA” che definisca cosa è condiviso (auth model, tenant model, API style) vs specifico per verticale. Info sparsa in `HUBIA_*`, `business-platform/docs`, `docs/HUBIA_PROJECT_STATE_RECONSTRUCTION`.

---

## 9. Riferimenti (file e documenti)

- **Barbiere**: `apps/barbiere-app/PROJECT_OVERVIEW_REAL.md`, `apps/barbiere-app/docs/LEGACY_PUBLIC_APIS_CALLER_MAP.md`, `api/_lib/resolveShopId.js`, `api/admin/shops/index.js`, `src/pages/FounderDashboard.tsx`, `supabase/migrations/20260203040000_admin_provision_shop_rpc.sql`.
- **Pizzeria**: `apps/pizzeria-mobile/config/restaurant.ts`, `apps/pizzeria-mobile/docs/PIZZERIA_CTO_AUDIT_REPORT.md`, `apps/pizzeria-mobile/docs/PIZZERIA_DB_RLS_AUDIT.md`, `api/create-order.js`, `api/router.js`, `api/staff-router.js`, `services/placeOrder.ts`, `app/state/bootstrap.ts`.
- **Cross**: `docs/HUBIA_PROJECT_STATE_RECONSTRUCTION.md`, `business-platform/docs/TEMPLATE_PIZZERIA_SETUP.md`.
