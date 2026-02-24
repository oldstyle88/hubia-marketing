#!/usr/bin/env node
/**
 * Syncs missing keys from messages/it.json into en, de, es, fr.
 * Preserves existing values; only adds missing keys (value from baseline).
 * Run after changing it.json. Use validate-i18n.mjs to verify.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.join(__dirname, '..', 'messages')
const baseline = JSON.parse(fs.readFileSync(path.join(messagesDir, 'it.json'), 'utf8'))

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] != null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key])
    } else if (!(key in target)) {
      target[key] = JSON.parse(JSON.stringify(source[key]))
    }
  }
}

for (const locale of ['en', 'de', 'es', 'fr']) {
  const filePath = path.join(messagesDir, `${locale}.json`)
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  deepMerge(existing, baseline)
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + '\n', 'utf8')
  console.log(`Synced ${locale}.json`)
}

console.log('Done.')
