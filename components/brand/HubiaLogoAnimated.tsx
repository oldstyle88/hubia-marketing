'use client'

import { useId } from 'react'

export interface HubiaLogoAnimatedProps {
  className?: string
  iconClassName?: string
  hideWordmark?: boolean
}

/**
 * Logo HUBIA per hero: identico al riferimento (H con barra diagonale, navy-teal, wordmark con riflesso).
 * H = due barre verticali + barra diagonale; testo HUBIA metallico silver con riflesso sotto.
 */
export function HubiaLogoAnimated({
  className = '',
  iconClassName = 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  hideWordmark = false,
}: HubiaLogoAnimatedProps) {
  const id = useId().replace(/:/g, '')
  const gradId = `hubia-hero-grad-${id}`
  const shadowId = `hubia-hero-shadow-${id}`

  return (
    <div
      className={`hubia-logo-animated flex flex-col items-center justify-center gap-6 ${className}`.trim()}
      aria-hidden
    >
      {/* H come nell’immagine: verticali + diagonale, gradiente navy-teal, ombra */}
      <div className="hubia-logo-animated__icon relative inline-flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClassName} block`}
          role="img"
          aria-label="HUBIA"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="35%" stopColor="#0EA5E9" />
              <stop offset="70%" stopColor="#1E3A5F" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id={shadowId} x="-20%" y="-10%" width="140%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter={`url(#${shadowId})`} className="hubia-logo-animated__lines">
            <path d="M 15 0 L 35 0 L 35 100 L 15 100 Z" fill={`url(#${gradId})`} />
            <path d="M 65 0 L 85 0 L 85 100 L 65 100 Z" fill={`url(#${gradId})`} />
            <path d="M 28 8 L 42 2 L 72 92 L 58 98 Z" fill={`url(#${gradId})`} />
          </g>
        </svg>
      </div>

      {!hideWordmark && (
        <div className="hubia-logo-animated__wordmark-wrap relative flex flex-col items-center pb-[0.5em]">
          <span
            className="hubia-logo-animated__wordmark font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] font-bold uppercase"
            style={{
              background: 'linear-gradient(180deg, #F8FAFC 0%, #CBD5E1 50%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            HUBIA
          </span>
          {/* Riflesso sulla superficie sotto il testo */}
          <span
            className="hubia-logo-animated__wordmark-reflection font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] font-bold uppercase absolute left-1/2 top-full w-full text-center"
            aria-hidden
            style={{
              background: 'linear-gradient(180deg, rgba(248,250,252,0.25) 0%, rgba(148,163,184,0.08) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: 'translateX(-50%) scaleY(-1)',
              transformOrigin: 'top center',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 75%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 75%)',
              paddingTop: '0.05em',
            }}
          >
            HUBIA
          </span>
        </div>
      )}
    </div>
  )
}
