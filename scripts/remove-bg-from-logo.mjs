#!/usr/bin/env node
/**
 * Rimuove lo sfondo scuro dall'immagine logo mantenendo solo H + HUBIA.
 * Usa sharp: soglia di luminosità per creare maschera alpha (sfondo scuro → trasparente).
 *
 * Uso: node scripts/remove-bg-from-logo.mjs [input.png] [output.png]
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const brandDir = path.join(projectRoot, 'public', 'brand')

const inputPath = process.argv[2] || path.join(brandDir, 'hubia-logo-source.png')
const outputPath = process.argv[3] || path.join(brandDir, 'hubia-logo-extracted.png')

// Soglia: pixel sotto questa luminosità media → trasparente (sfondo)
const LUMINANCE_THRESHOLD = 52

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error('File non trovato:', inputPath)
    process.exit(1)
  }

  const image = sharp(inputPath)
  const { width, height, channels } = await image.raw().ensureAlpha().metadata()

  const { data } = await image
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true })

  // Per ogni pixel: se luminosità media < threshold, alpha = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = (r + g + b) / 3

    if (lum < LUMINANCE_THRESHOLD) {
      data[i + 3] = 0
    } else {
      // Feathering leggero ai bordi: riduci alpha dove siamo vicini alla soglia
      const t = LUMINANCE_THRESHOLD + 25
      if (lum < t) {
        const factor = (lum - LUMINANCE_THRESHOLD) / (t - LUMINANCE_THRESHOLD)
        data[i + 3] = Math.round(255 * factor)
      }
    }
  }

  await sharp(Buffer.from(data), {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(outputPath)

  console.log('Scritto:', outputPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
