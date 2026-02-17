#!/usr/bin/env node
/**
 * Genera favicon e icone PWA dal logo home (hubia-logo-clean.png) e mark da SVG.
 * - Favicon + icon-192/512/apple-touch: da hubia-logo-clean.png (stesso logo della home/tab).
 * - hubia-mark-*: da hubia-mark.svg (per altri usi).
 *
 * Uso: node scripts/generate-brand-assets.mjs
 * Oppure: npm run generate-brand-assets
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
const sourceLogoPng = path.join(brandDir, 'hubia-logo-clean.png')

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

  console.log('Sorgente mark:', sourceSvg)
  console.log('Sorgente logo (favicon/tab):', sourceLogoPng)

  const toPngFromSvg = (size) =>
    sharp(sourceSvg)
      .resize(size, size)
      .png()
      .toBuffer()

  // hubia-mark-*.png (da SVG)
  for (const { name, size } of hubiaMarkSizes) {
    const outPath = path.join(brandDir, name)
    await sharp(sourceSvg).resize(size, size).png().toFile(outPath)
    console.log('Scritto:', outPath)
  }

  // Favicon e icone tab/PWA: da hubia-logo-clean.png (stesso logo della home)
  let logoCenterCrop
  if (fs.existsSync(sourceLogoPng)) {
    const logoMeta = await sharp(sourceLogoPng).metadata()
    const logoW = logoMeta.width || 675
    const logoH = logoMeta.height || 512
    const logoSquareSize = Math.min(logoW, logoH, 512)
    const left = Math.round((logoW - logoSquareSize) / 2)
    const top = Math.round((logoH - logoSquareSize) / 2)
    logoCenterCrop = await sharp(sourceLogoPng)
      .extract({ left, top, width: logoSquareSize, height: logoSquareSize })
      .png()
      .toBuffer()
  } else {
    console.warn('hubia-logo-clean.png non trovato, uso hubia-mark.svg per favicon/icone')
    logoCenterCrop = await sharp(sourceSvg).resize(512, 512).png().toBuffer()
  }

  for (const { name, size } of layoutIcons) {
    const outPath = path.join(brandDir, name)
    await sharp(logoCenterCrop).resize(size, size).png().toFile(outPath)
    console.log('Scritto (logo home):', outPath)
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

  // favicon.ico (16 + 32) — stesso logo della home
  const faviconBuffers = await Promise.all(
    faviconSizes.map((s) => sharp(logoCenterCrop).resize(s, s).png().toBuffer())
  )
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
