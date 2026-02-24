#!/usr/bin/env node
/**
 * Validates that all locale JSON files have the same key structure as messages/it.json (canonical).
 * Exits with code 1 if any locale is missing keys.
 * Soft checks (WARN only): empty values; values identical to baseline (IT) for critical keys.
 * Usage: node scripts/validate-i18n.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.join(__dirname, '..', 'messages')
const baselineLocale = 'it'
const otherLocales = ['en', 'de', 'es', 'fr']

/** Key prefixes that should be localized (warn if same as IT). */
const CRITICAL_PREFIXES = ['nav.', 'home.hero.', 'meta.']

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

function getValue(obj, keyPath) {
  const parts = keyPath.split('.')
  let cur = obj
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = cur[p]
  }
  return cur
}

function isCriticalKey(key) {
  return CRITICAL_PREFIXES.some((p) => key === p || key.startsWith(p + '.'))
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
    console.error(`ERROR ${locale}: MISSING ${missing.length} keys`)
    missing.slice(0, 30).forEach((k) => console.error(`  - ${k}`))
    if (missing.length > 30) console.error(`  ... and ${missing.length - 30} more`)
  } else {
    console.log(`${locale}: OK (all keys present)`)
  }
  if (extra.length > 0) {
    console.warn(`WARN ${locale}: EXTRA ${extra.length} keys (not in baseline)`)
    extra.slice(0, 10).forEach((k) => console.warn(`  + ${k}`))
    if (extra.length > 10) console.warn(`  ... and ${extra.length - 10} more`)
  }

  // Soft: empty values
  const emptyKeys = [...canonicalKeys].filter((k) => {
    const v = getValue(data, k)
    return v !== null && v !== undefined && String(v).trim() === ''
  })
  if (emptyKeys.length > 0) {
    console.warn(`WARN ${locale}: ${emptyKeys.length} empty value(s)`)
    emptyKeys.slice(0, 15).forEach((k) => console.warn(`  empty: ${k}`))
    if (emptyKeys.length > 15) console.warn(`  ... and ${emptyKeys.length - 15} more`)
  }

  // Soft: critical keys identical to baseline (suspected untranslated)
  const sameAsBaseline = [...canonicalKeys].filter((k) => {
    if (!isCriticalKey(k)) return false
    const baseVal = getValue(baseline, k)
    const locVal = getValue(data, k)
    if (baseVal == null && locVal == null) return false
    return String(baseVal) === String(locVal)
  })
  if (sameAsBaseline.length > 0) {
    console.warn(`WARN ${locale}: ${sameAsBaseline.length} critical key(s) identical to baseline (check translation)`)
    sameAsBaseline.slice(0, 15).forEach((k) => console.warn(`  same as IT: ${k}`))
    if (sameAsBaseline.length > 15) console.warn(`  ... and ${sameAsBaseline.length - 15} more`)
  }
}

if (hasMissing) {
  console.error('\ni18n check FAILED: some locales are missing keys.')
  process.exit(1)
}
console.log('\ni18n check passed.')
