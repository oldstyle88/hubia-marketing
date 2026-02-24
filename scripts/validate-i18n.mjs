#!/usr/bin/env node
/**
 * Validates that all locale JSON files have the same key structure as messages/it.json (canonical).
 * Exits with code 1 if any locale is missing keys.
 * Usage: node scripts/validate-i18n.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.join(__dirname, '..', 'messages')
const baselineLocale = 'it'
const otherLocales = ['en', 'de', 'es', 'fr']

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (e) {
    console.error(`Error loading ${filePath}:`, e.message)
    return null
  }
}

function leafKeys(obj, prefix = '') {
  const keys = []
  for (const [k, v] of Object.entries(obj)) {
    const pathKey = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...leafKeys(v, pathKey))
    } else {
      keys.push(pathKey)
    }
  }
  return keys
}

const baselinePath = path.join(messagesDir, `${baselineLocale}.json`)
const baseline = loadJson(baselinePath)
if (!baseline) {
  console.error('Baseline (it.json) could not be loaded.')
  process.exit(1)
}

const canonicalKeys = new Set(leafKeys(baseline))
console.log(`Baseline: ${baselineLocale}.json — ${canonicalKeys.size} leaf keys\n`)

let hasMissing = false
for (const locale of otherLocales) {
  const filePath = path.join(messagesDir, `${locale}.json`)
  const data = loadJson(filePath)
  if (!data) {
    hasMissing = true
    console.error(`${locale}: FAIL (file error)`)
    continue
  }
  const keys = new Set(leafKeys(data))
  const missing = [...canonicalKeys].filter((k) => !keys.has(k))
  const extra = [...keys].filter((k) => !canonicalKeys.has(k))
  if (missing.length > 0) {
    hasMissing = true
    console.error(`${locale}: MISSING ${missing.length} keys`)
    missing.slice(0, 30).forEach((k) => console.error(`  - ${k}`))
    if (missing.length > 30) console.error(`  ... and ${missing.length - 30} more`)
  } else {
    console.log(`${locale}: OK (all keys present)`)
  }
  if (extra.length > 0) {
    console.warn(`${locale}: EXTRA ${extra.length} keys (not in baseline)`)
    extra.slice(0, 10).forEach((k) => console.warn(`  + ${k}`))
    if (extra.length > 10) console.warn(`  ... and ${extra.length - 10} more`)
  }
}

if (hasMissing) {
  console.error('\ni18n check FAILED: some locales are missing keys.')
  process.exit(1)
}
console.log('\ni18n check passed.')
