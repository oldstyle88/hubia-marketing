#!/usr/bin/env node
/**
 * Genera PNG dal simbolo H (hubia-mark.svg) e aggiorna favicon/icone PWA.
 * Sorgente: public/brand/hubia-mark.svg (sfondo trasparente).
 *
 * Uso: node scripts/generate-brand-assets.mjs
 * Oppure: npm run generate-brand-assets
 *
 * Output:
 *   - public/brand/hubia-mark-1024.png, 512, 192, 180, 32, 16
 *   - public/brand/icon-192.png, icon-512.png, apple-touch-icon.png (per layout)
 *   - public/favicon.ico
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const pngToIco = require('png-to-ico')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const brandDir = path.join(projectRoot, 'public', 'brand')
const sourceSvg = path.join(brandDir, 'hubia-mark.svg')

const hubiaMarkSizes = [
  { name: 'hubia-mark-1024.png', size: 1024 },
  { name: 'hubia-mark-512.png', size: 512 },
  { name: 'hubia-mark-192.png', size: 192 },
  { name: 'hubia-mark-180.png', size: 180 },
  { name: 'hubia-mark-32.png', size: 32 },
  { name: 'hubia-mark-16.png', size: 16 },
]

const layoutIcons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

const faviconSizes = [16, 32]

async function main() {
  if (!fs.existsSync(sourceSvg)) {
    console.error('Errore: file non trovato:', sourceSvg)
    process.exit(1)
  }

  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true })
  }

  console.log('Sorgente:', sourceSvg)

  const toPng = (size) =>
    sharp(sourceSvg)
      .resize(size, size)
      .png()
      .toBuffer()

  // hubia-mark-*.png
  for (const { name, size } of hubiaMarkSizes) {
    const outPath = path.join(brandDir, name)
    await sharp(sourceSvg).resize(size, size).png().toFile(outPath)
    console.log('Scritto:', outPath)
  }

  // icon-192, icon-512, apple-touch-icon (per layout esistente)
  for (const { name, size } of layoutIcons) {
    const outPath = path.join(brandDir, name)
    await sharp(sourceSvg).resize(size, size).png().toFile(outPath)
    console.log('Scritto:', outPath)
  }

  // og-image.png 1200x630: dark placeholder con logo centrato (per Open Graph / Twitter)
  const ogWidth = 1200
  const ogHeight = 630
  const logoSize = 280
  const logoSvg = fs.readFileSync(sourceSvg)
  const logoPng = await sharp(logoSvg)
    .resize(logoSize, logoSize)
    .png()
    .toBuffer()
  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 3,
      background: { r: 18, g: 20, b: 24 },
    },
  })
    .png()
    .composite([{ input: logoPng, top: Math.round((ogHeight - logoSize) / 2), left: Math.round((ogWidth - logoSize) / 2) }])
    .toFile(path.join(brandDir, 'og-image.png'))
  console.log('Scritto: public/brand/og-image.png (1200x630)')

  // favicon.ico (16 + 32)
  const faviconBuffers = await Promise.all(faviconSizes.map((s) => toPng(s)))
  const icoBuffer = await pngToIco(faviconBuffers)
  const faviconPath = path.join(projectRoot, 'public', 'favicon.ico')
  fs.writeFileSync(faviconPath, icoBuffer)
  console.log('Scritto:', faviconPath)

  console.log('Fatto. Asset brand e favicon aggiornati.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
