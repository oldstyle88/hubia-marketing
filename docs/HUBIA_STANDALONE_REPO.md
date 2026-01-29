# HŪBIA Marketing — Repository standalone

Il sito marketing HŪBIA è stato **rimosso** dal monorepo (`apps/hubia` non esiste più). Una copia standalone è pronta per essere spostata in `Documents/hubia` e usata come repo separato.

## Dove si trova

- **Export da spostare:** `hubia-export/` (root del monorepo)  
  Contiene tutto il codice (Next.js 14, App Router, i18n, Supabase lead).  
  **Passo da fare:** spostare in `~/Documents/hubia`, poi `git init` e commit.

- **Vecchia export (opzionale):** `hubia-marketing-standalone/` — puoi eliminarla se usi solo `hubia-export`.

## Come completare lo spostamento in Documents/hubia

1. **Sposta** la cartella:
   ```bash
   mv /Users/leandrooliva/Documents/monorepo/hubia-export /Users/leandrooliva/Documents/hubia
   ```

2. **Inizializza Git** nella nuova posizione:
   ```bash
   cd ~/Documents/hubia
   git init
   git add .
   git commit -m "Initial commit: HŪBIA marketing site standalone"
   ```

3. (Opzionale) Aggiungi remote e push:
   ```bash
   git remote add origin <url-del-repo>
   git branch -M main
   git push -u origin main
   ```

4. (Opzionale) Rimuovi `hubia-export` dal monorepo se era ancora presente (dopo lo spostamento la cartella non ci sarà più).

Istruzioni dettagliate anche in `hubia-export/MOVE_ME.md` (fino a quando la cartella è nel monorepo).

## Deploy Vercel

Importa il **nuovo** repository (Documents/hubia); root directory vuota; variabili `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`. Vedi `docs/VERCEL_SUPABASE_SETUP.md` dentro il repo hubia.
