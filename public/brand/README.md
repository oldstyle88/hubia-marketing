# Brand assets — HŪBIA marketing site

Asset richiesti per favicon, PWA e social. Tutti in **`public/brand/`**.

## Simbolo H (mark) — sorgente vettoriale

| File | Uso |
|------|-----|
| **hubia-mark.svg** | Simbolo «H» minimal premium, sfondo trasparente, gradiente blu/cobalto. Sorgente per tutti i PNG. |

## PNG generati da `hubia-mark.svg`

Esegui **`npm run generate-brand-assets`** (oppure `node scripts/generate-brand-assets.mjs`) per generare:

| File | Uso |
|------|-----|
| hubia-mark-1024.png, 512, 192, 180, 32, 16 | Vari formati (PWA, iOS, favicon fallback). |
| **icon-192.png**, **icon-512.png**, **apple-touch-icon.png** | Usati da `app/layout.tsx` (icone PWA e Apple). |
| (in `public/`) **favicon.ico** | Favicon (16+32). |

Lo script usa **sharp** e **png-to-ico** (già in `package.json`); non aggiunge dipendenze.

## Riferimenti nel sito

- **`app/layout.tsx`**: `icons.icon` → `/brand/icon-192.png`, `/brand/icon-512.png`; `icons.apple` → `/brand/apple-touch-icon.png`; `<link rel="icon">` → `/favicon.ico`; Open Graph → `/brand/og-image.png`.
- **Twitter** (layout): fallback image `/brand/hubia-logo.png` (opzionale aggiornare a hubia-mark o og-image).
- Header/Hero: componenti `Logo.tsx` e `HubiaLogoHero.tsx` usano SVG inline (cerchi + H); per usare il solo mark da file si può puntare a `hubia-mark.svg` o a una delle PNG.

## Script legacy (PNG sorgente)

Da **hubia-logo.png** (o `--source` per path diverso):

```bash
npm run generate-brand-icons
```

Scrive: `public/favicon.ico`, `public/brand/icon-192.png`, `public/brand/icon-512.png`, `public/brand/apple-touch-icon.png`.

## Altri asset

- **og-image.png** (1200×630): Open Graph / social. Creare a mano o estendere lo script.
- **logo-mark-transparent.png**: opzionale; se presente può essere usato da Header/Hero al posto dell’SVG inline.
