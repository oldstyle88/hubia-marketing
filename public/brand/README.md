# Brand assets — HŪBIA marketing site

Asset richiesti per favicon, PWA, e social. Tutti in **`public/brand/`**.

## File richiesti (preferito: trasparente)

| File | Uso | Note |
|------|-----|------|
| **logo-mark-transparent.png** | Solo logo interno + scritta «HŪBIA», **nessun rettangolo/sfondo** (Header, Hero) | Obbligatorio per non mostrare il rettangolo. Se manca: viene mostrata solo la scritta «HŪBIA» in gradient. |
| **icon-192.png** | PWA icon 192×192 | TODO: generare da logo trasparente. Fallback: `hubia-logo.png` |
| **icon-512.png** | PWA icon 512×512 | TODO: come sopra. Fallback: `hubia-logo.png` |
| **apple-touch-icon.png** | Apple touch icon 180×180 | TODO: come sopra. Fallback: `hubia-logo.png` |
| **og-image.png** | Open Graph / social 1200×630 | TODO: opzionale. Fallback: `hubia-logo.png` |

## Fallback attuali

- Se un file manca, il layout punta a **`hubia-logo.png`** (o `favicon.ico` in root per il favicon).
- Header/Hero usano **solo** `logo-mark-transparent.png` (solo interno + scritta). Se il file manca o fallisce: viene mostrata la scritta «HŪBIA» in gradient (nessuna immagine rettangolare).
- Build e runtime non falliscono: i path sono gestiti con fallback in `app/layout.tsx` e nei componenti.

## Generazione icone (script)

Da **hubia-logo.png** (o da un altro PNG con `--source`) puoi rigenerare favicon e icone PWA:

```bash
npm run generate-brand-icons
```

Oppure con un logo diverso:

```bash
node scripts/generate-brand-icons.js --source public/brand/logoMark.png
```

Lo script scrive: `public/favicon.ico`, `public/brand/icon-192.png`, `public/brand/icon-512.png`, `public/brand/apple-touch-icon.png`.

## Una sola volta (asset aggiuntivi)

1. Aggiungi **logo-mark-transparent.png**: solo il logo interno (simbolo + scritta HŪBIA), sfondo trasparente, **nessun rettangolo o cornice**.
2. Per **og-image.png** (Open Graph / social 1200×630): crealo a mano o estendi lo script se serve.
