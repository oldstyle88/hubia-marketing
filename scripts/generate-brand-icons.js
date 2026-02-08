#!/usr/bin/env node
/**
 * Genera favicon.ico e icone PWA (icon-192, icon-512, apple-touch-icon)
 * a partire dal logo in public/brand/.
 *
 * Uso: node scripts/generate-brand-icons.js
 * Oppure: npm run generate-brand-icons
 *
 * Richiede: public/brand/hubia-logo.png (o --source per path diverso)
 * Output: public/favicon.ico, public/brand/icon-192.png, icon-512.png, apple-touch-icon.png
 */

const path = require('path')
const fs = require('fs')

const projectRoot = path.resolve(__dirname, '..')
const brandDir = path.join(projectRoot, 'public', 'brand')

const defaultSource = path.join(brandDir, 'hubia-logo.png')

const sizes = {
  favicon: [16, 32],
  'icon-192.png': 192,
  'icon-512.png': 512,
  'apple-touch-icon.png': 180,
}

async function main() {
  const source =
    process.argv.includes('--source') && process.argv[process.argv.indexOf('--source') + 1]
      ? path.resolve(process.argv[process.argv.indexOf('--source') + 1])
      : defaultSource

  if (!fs.existsSync(source)) {
    console.error('Errore: file logo non trovato:', source)
    console.error('Uso: node scripts/generate-brand-icons.js [--source /path/to/logo.png]')
    process.exit(1)
  }

  let sharp
  let pngToIco
  try {
    sharp = require('sharp')
    pngToIco = require('png-to-ico')
  } catch (e) {
    console.error('Installa le dipendenze: npm install --save-dev sharp png-to-ico')
    process.exit(1)
  }

  console.log('Logo sorgente:', source)
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true })
  }

  const faviconBuffers = []
  for (const size of sizes.favicon) {
    const buf = await sharp(source)
      .resize(size, size)
      .png()
      .toBuffer()
    faviconBuffers.push(buf)
  }

  const icoBuffer = await pngToIco(faviconBuffers)
  const faviconPath = path.join(projectRoot, 'public', 'favicon.ico')
  fs.writeFileSync(faviconPath, icoBuffer)
  console.log('Scritto:', faviconPath)

  for (const [filename, size] of Object.entries(sizes)) {
    if (filename === 'favicon') continue
    const outPath = path.join(brandDir, filename)
    await sharp(source).resize(size, size).png().toFile(outPath)
    console.log('Scritto:', outPath)
  }

  console.log('Fatto. Favicon e icone PWA aggiornate.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
