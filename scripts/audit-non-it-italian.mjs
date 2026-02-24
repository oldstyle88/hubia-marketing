#!/usr/bin/env node
/**
 * Finds Italian text in non-IT locale files (en, de, es, fr).
 * Exits with code 1 if any match is in a critical namespace.
 * Usage: node scripts/audit-non-it-italian.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const messagesDir = path.join(__dirname, '..', 'messages')
const nonItLocales = ['en', 'de', 'es', 'fr']

const CRITICAL_PREFIXES = [
  'meta.',
  'nav.',
  'home.',
  'pricing.',
  'plans.',
  'contact.',
  'footer.',
  'privacy.',
  'terms.',
]

/** Italian patterns: words/phrases that strongly indicate Italian text. */
const ITALIAN_PATTERNS = [
  /\bPrenotazioni\b/i,
  /\bNessuna\b/i,
  /\bNessun\b/i,
  /\bPiù scelto\b/i,
  /\bParliamo\b/i,
  /\bRichiedi\b/i,
  /\bI tuoi\b/i,
  /\bIl tuo\b/i,
  /\brateizzabile\b/i,
  /\bcanone\b/i,
  /\b\/ mese\b/i,
  /\bContatti\b/i,
  /\bPrezzi\b/i,
  /\bPiani\b/i,
  /\bSoluzioni dedicate\b/i,
  /\bApri menu\b/i,
  /\bChiudi menu\b/i,
  /\bSu Misura\b/i,
  /\bConsulenza\b/i,
  /\bInizia ora\b/i,
  /\bGuarda come funziona\b/i,
  /\bprenotazioni questa settimana\b/i,
  /\britorno clienti\b/i,
  /\bcommissioni\b/i,
  /\bGestire un locale\b/i,
  /\bnon dovrebbe essere questo caos\b/i,
  /\bagenda su carta\b/i,
  /\bNon è colpa tua\b/i,
  /\blocali come il tuo\b/i,
  /\bEcco come funziona\b/i,
  /\bUn sistema\. Tre livelli\b/i,
  /\bOgni parte fa la sua cosa\b/i,
  /\bscansionando un QR\b/i,
  /\bI clienti sono tuoi\b/i,
  /\bControllo totale per chi gestisce\b/i,
  /\bL'AI che impara\b/i,
  /\bPiano Signature\b/i,
  /\bSi attiva dopo\b/i,
  /\bUna sola app\b/i,
  /\bTutti i tuoi locali\b/i,
  /\bScansioni un QR\b/i,
  /\bHai un'attività\b/i,
  /\bLeggi la sezione\b/i,
  /\bOperativo in 30 giorni\b/i,
  /\bSetup guidato\b/i,
  /\bConfiguriamo insieme\b/i,
  /\bVai live\b/i,
  /\bCresci\b/i,
  /\bPiù staff, più servizi\b/i,
  /\bPrezzi chiari\b/i,
  /\bSetup rateizzabile\b/i,
  /\bCanone fisso\b/i,
  /\bRichiedi Studio\b/i,
  /\bRichiedi Pro\b/i,
  /\bRichiedi Signature\b/i,
  /\bTutto il piano\b/i,
  /\bExport dati\b/i,
  /\brisposta entro\b/i,
  /\bSupporto prioritario\b/i,
  /\bSupporto dedicato\b/i,
  /\bTessera fedeltà\b/i,
  /\bRubrica clienti\b/i,
  /\bNotifiche automatiche\b/i,
  /\bCalendario condiviso\b/i,
  /\bApp cliente con il tuo\b/i,
  /\bReport base\b/i,
  /\bSupporto email\b/i,
  /\bAnalytics completa\b/i,
  /\bSegmentazione clienti\b/i,
  /\bAppuntamenti ricorrenti\b/i,
  /\bPrevisione incassi\b/i,
  /\bavvisi sui clienti\b/i,
  /\bPromo automatiche\b/i,
  /\bcampagne ai dormienti\b/i,
  /\bquanto spende ogni cliente\b/i,
  /\bBranding avanzato\b/i,
  /\bTre cose che non trovi\b/i,
  /\bDall'icona dell'app\b/i,
  /\bHŪBIA è costruito\b/i,
  /\bProcesso\b/i,
  /\bCall di allineamento\b/i,
  /\bSetup e configurazione guidata\b/i,
  /\bGo-live con supporto dedicato\b/i,
  /\bSi è verificato un errore\b/i,
  /\bErrore di connessione\b/i,
  /\bRiprova più tardi\b/i,
  /\bInformativa sulla privacy\b/i,
  /\bCome raccogliamo\b/i,
  /\bTermini e condizioni\b/i,
  /\bUtilizzo del servizio\b/i,
  /\bUltimo aggiornamento\b/i,
  /\bProdotto\b/i,
  /\bAzienda\b/i,
  /\bLegale\b/i,
  /\bTutti i diritti riservati\b/i,
  /\bdomande frequenti\b/i,
  /\bDomande frequenti\b/i,
  /\bspread over 6 o 12 mesi\b/i,
  /\bSetup una tantum\b/i,
  /\buna tantum\b/i,
  /\bCosa include il setup\b/i,
  /\bParla con noi\b/i,
  /\bRateizzabile\b/i,
  /\bPer team\b/i,
  /\bpersone\b/i,
  /\b\/mese\b/i,
  /\b€1\.400\b/,
  /\b€1\.900\b/,
  /\bTre piani:\s*Studio\s*\(€/i,
]

/** Exclude known non-Italian phrases (e.g. English "spread over 6 or 12 months"). */
function isExcluded(value) {
  const s = String(value)
  return (
    /spread over 6 or 12 months/i.test(s) ||
    /Setup can be spread over 6 or 12 months/i.test(s) ||
    /One-time setup at activation \(spread over 6 or 12 months\)/i.test(s)
  )
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (e) {
    console.error(`Error loading ${filePath}:`, e.message)
    return null
  }
}

function isCriticalKey(key) {
  return CRITICAL_PREFIXES.some((p) => key === p.slice(0, -1) || key.startsWith(p))
}

function checkValue(value, key) {
  if (value == null) return []
  const str = Array.isArray(value) ? value.join(' ') : String(value)
  if (isExcluded(str)) return []
  const matches = []
  for (const pat of ITALIAN_PATTERNS) {
    if (pat.test(str)) {
      matches.push(pat.toString())
      break
    }
  }
  return matches
}

function walk(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    const pathKey = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      walk(v, pathKey, out)
    } else {
      const hits = checkValue(v, pathKey)
      if (hits.length) out.push({ key: pathKey, value: v })
    }
  }
}

let hasCritical = false
for (const locale of nonItLocales) {
  const filePath = path.join(messagesDir, `${locale}.json`)
  const data = loadJson(filePath)
  if (!data) continue
  const matches = []
  walk(data, '', matches)
  if (matches.length === 0) {
    console.log(`${locale}: OK (no Italian patterns found)`)
    continue
  }
  const critical = matches.filter((m) => isCriticalKey(m.key))
  const other = matches.filter((m) => !isCriticalKey(m.key))
  if (critical.length > 0) {
    hasCritical = true
    console.error(`${locale}: FAIL — ${critical.length} critical key(s) with Italian`)
    critical.forEach((m) => console.error(`  ${m.key} | ${String(m.value).slice(0, 80)}...`))
  }
  if (other.length > 0) {
    console.warn(`${locale}: WARN — ${other.length} other key(s) with Italian`)
    other.slice(0, 15).forEach((m) => console.warn(`  ${m.key} | ${String(m.value).slice(0, 60)}...`))
    if (other.length > 15) console.warn(`  ... and ${other.length - 15} more`)
  }
}

if (hasCritical) {
  console.error('\naudit-non-it-italian FAILED: Italian found in critical namespaces.')
  process.exit(1)
}
console.log('\naudit-non-it-italian passed (0 critical matches).')
