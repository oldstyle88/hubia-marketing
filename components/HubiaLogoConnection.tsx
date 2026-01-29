'use client'

import { useId } from 'react'

/**
 * HubiaLogoConnection — Logo HŪBIA con significato di connessione.
 *
 * Concept: due archi che si avvicinano e si connettono in un nodo centrale
 * (simbolo di connessione) + wordmark "HŪBIA".
 *
 * Stile: premium elegante, minimal, sofisticato.
 * Palette: oro caldo #C8A65A (simbolo) + charcoal #111111 (testo) + sfondo chiaro.
 *
 * Animazione: loop 3s, ease-in-out — gli archi si disegnano, il nodo appare,
 * poi si dissolvono con discrezione (stroke-dashoffset + opacity nodo).
 * Leggibile anche statico; l’animazione aggiunge “wow”.
 *
 * Solo SVG inline + CSS, nessuna immagine esterna.
 */

const GOLD = '#C8A65A'
const CHARCOAL = '#111111'

/** Lunghezza approssimativa del path degli archi (per stroke-dasharray/offset). */
const ARC_PATH_LENGTH = 62

interface HubiaLogoConnectionProps {
  /** Su sfondo scuro (es. Hero) usare "dark" per wordmark chiaro. */
  variant?: 'light' | 'dark'
}

export function HubiaLogoConnection({ variant = 'light' }: HubiaLogoConnectionProps) {
  const gradientId = `hubia-conn-gold-${useId().replace(/:/g, '')}`
  const isDark = variant === 'dark'

  return (
    <div
      className={`inline-flex flex-col items-center gap-4 ${isDark ? 'text-primary' : ''}`}
      style={isDark ? undefined : { color: CHARCOAL }}
    >
      {/* Simbolo: due archi + nodo centrale */}
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16 sm:h-20 sm:w-20"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.95" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0.75" />
          </linearGradient>
        </defs>
        {/* Arco sinistro: si disegna e si dissolve (stroke-dashoffset) */}
        <path
          d="M 18 22 Q 18 78 50 78"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={ARC_PATH_LENGTH}
          className="hubia-arc hubia-arc-left"
        />
        {/* Arco destro: stesso ritmo, leggermente in ritardo per sensazione di incontro */}
        <path
          d="M 82 22 Q 82 78 50 78"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={ARC_PATH_LENGTH}
          className="hubia-arc hubia-arc-right"
        />
        {/* Nodo centrale: appare quando gli archi si congiungono, poi si dissolve */}
        <circle
          cx="50"
          cy="78"
          r="5"
          fill={GOLD}
          className="hubia-node"
        />
      </svg>

      {/* Wordmark: HŪBIA, statico e leggibile */}
      <span
        className={`text-2xl font-semibold tracking-[0.14em] sm:text-3xl ${isDark ? 'text-primary' : ''}`}
        style={isDark ? undefined : { color: CHARCOAL }}
      >
        HŪBIA
      </span>
    </div>
  )
}
