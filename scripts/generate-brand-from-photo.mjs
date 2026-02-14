#!/usr/bin/env node
/**
 * Genera favicon e icone PWA dalla H della foto (hubia-logo-hero.png).
 * Ritaglia la parte alta dell'immagine (solo la H) e ne ricava un quadrato per favicon/icone.
 *
 * Uso: node scripts/generate-brand-from-photo.mjs
 *
 * Richiede: public/brand/hubia-logo-hero.png (logo H + HUBIA dalla foto).
 * Output: public/favicon.ico, public/brand/icon-192.png, icon-512.png, apple-touch-icon.png
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
const sourcePng = path.join(brandDir, 'hubia-logo-extracted.png')

const layoutIcons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]
const faviconSizes = [16, 32]

async function main() {
  const src = fs.existsSync(path.join(brandDir, 'hubia-logo-extracted.png'))
    ? path.join(brandDir, 'hubia-logo-extracted.png')
    : path.join(brandDir, 'hubia-logo-hero.png')
  if (!fs.existsSync(src)) {
    console.error('Errore: file non trovato (hubia-logo-extracted.png o hubia-logo-hero.png)')
    process.exit(1)
  }

  const meta = await sharp(src).metadata()
  const w = meta.width || 800
  const h = meta.height || 600

  // Ritaglio solo la H: quadrato dalla parte alta (~44% altezza = H completa, senza testo)
  const cropHeight = Math.round(h * 0.44)
  const squareSize = Math.min(w, cropHeight)
  const left = Math.round((w - squareSize) / 2)
  const top = 0

  const squareBuffer = await sharp(src)
    .extract({ left, top, width: squareSize, height: squareSize })
    .png()
    .toBuffer()

  console.log('Sorgente:', src, `(${w}x${h}) → H ritagliata ${squareSize}x${squareSize} (top 44%)`)

  // Mark H per header/logo (128px)
  const markPath = path.join(brandDir, 'hubia-mark.png')
  await sharp(squareBuffer).resize(128, 128).png().toFile(markPath)
  console.log('Scritto:', markPath)

  // Icone layout (icon-192, icon-512, apple-touch)
  for (const { name, size } of layoutIcons) {
    const outPath = path.join(brandDir, name)
    await sharp(squareBuffer).resize(size, size).png().toFile(outPath)
    console.log('Scritto:', outPath)
  }

  // favicon.ico (16 + 32)
  const faviconBuffers = await Promise.all(
    faviconSizes.map((s) => sharp(squareBuffer).resize(s, s).png().toBuffer())
  )
  const icoBuffer = await pngToIco(faviconBuffers)
  const faviconPath = path.join(projectRoot, 'public', 'favicon.ico')
  fs.writeFileSync(faviconPath, icoBuffer)
  console.log('Scritto:', faviconPath)

  console.log('Fatto. Favicon e icone generati dalla H della foto.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
