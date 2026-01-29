# Sposta questa cartella in Documents/hubia

Questa cartella è una copia standalone del sito HŪBIA (estratta dal monorepo).

**Per usarla come repo separato:**

1. **Sposta** la cartella in `~/Documents/hubia`:
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
   git remote add origin <url-del-tuo-repo>
   git branch -M main
   git push -u origin main
   ```

Dopo lo spostamento puoi eliminare questo file.
