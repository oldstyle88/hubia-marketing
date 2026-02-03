# HŪBIA Marketing Site

Sito marketing "light luxury" per HŪBIA — piattaforma prenotazioni premium. Repository standalone.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** (i18n: it, en, de, es, fr)
- **Supabase** (lead form → tabella `leads`)
- Deploy su **Vercel**

## Struttura (root del repo)

```
├── app/
│   ├── [locale]/          # Pagine localizzate (home, pricing, contact, privacy, terms)
│   ├── api/lead/          # API form contatti → Supabase
│   ├── globals.css
│   └── layout.tsx
├── components/
├── i18n/
├── messages/              # Traduzioni (it, en, de, es, fr)
├── public/
├── supabase/migrations/   # SQL tabella leads (progetto Supabase HŪBIA)
├── docs/
└── package.json
```

## Setup

```bash
npm install
cp .env.example .env.local
# Compila .env.local: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (vedi docs/VERCEL_SUPABASE_SETUP.md)
npm run dev
```

**Nessun warning npm:** se compare `npm warn Unknown env config 'devdir'`:

- nel terminale: `source scripts/clean-env.sh` (o aggiungi `unset NPM_CONFIG_DEVDIR` in `~/.zshrc`);
- oppure controlla `~/.npmrc` e rimuovi eventuali righe che contengono `devdir`.

Apri [http://localhost:3000](http://localhost:3000); rotte con locale (es. `/it`, `/en`).

## Deploy

**Vercel:** importa questo repo, root directory vuota, env `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`. Vedi `docs/VERCEL_SUPABASE_SETUP.md`.

## Spostare in Documents/hubia e usare come repo Git

1. Sposta questa cartella in `~/Documents/hubia` (da terminale, fuori dal monorepo).
2. `cd ~/Documents/hubia && git init && git add . && git commit -m "Initial commit"`
3. Aggiungi remote e push quando sei pronto.
