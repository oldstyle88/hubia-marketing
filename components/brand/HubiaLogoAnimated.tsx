'use client'

import { useId } from 'react'

/** Lunghezze path per stroke-dasharray/dashoffset (viewBox 100x100) */
const LEN_LEFT = 100
const LEN_RIGHT = 100
const LEN_BAR = 50

export interface HubiaLogoAnimatedProps {
  /** Classe wrapper (flex col, gap, ecc.) */
  className?: string
  /** Dimensione SVG in rem o Tailwind (es. w-24 h-24) */
  iconClassName?: string
  /** Nasconde il wordmark "HUBIA" sotto */
  hideWordmark?: boolean
}

/**
 * Logo HUBIA animato per hero: H con linee che si connettono + glow pulse.
 * Solo SVG + CSS (keyframes in globals.css), nessun JS.
 * Colori: navy base, gradiente teal → oro sui tratti.
 */
export function HubiaLogoAnimated({
  className = '',
  iconClassName = 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  hideWordmark = false,
}: HubiaLogoAnimatedProps) {
  const id = useId().replace(/:/g, '')
  const gradId = `hubia-animated-grad-${id}`
  const glowId = `hubia-animated-glow-${id}`

  return (
    <div
      className={`hubia-logo-animated flex flex-col items-center justify-center gap-6 ${className}`.trim()}
      aria-hidden
    >
      <div className="hubia-logo-animated__icon relative inline-flex items-center justify-center">
        <svg
          viewBox="-2 -6 104 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconClassName} text-navy`}
          role="img"
          aria-label="HUBIA"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="60%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
              <feFlood floodColor="#00D4FF" floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* H: tre tratti che si "connettono" (stroke-dashoffset) */}
          <g filter={`url(#${glowId})`} className="hubia-logo-animated__lines">
            <path
              className="hubia-logo-line hubia-logo-line--left"
              d="M 26 0 L 26 100"
              stroke={`url(#${gradId})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={LEN_LEFT}
              strokeDashoffset={LEN_LEFT}
            />
            <path
              className="hubia-logo-line hubia-logo-line--right"
              d="M 74 0 L 74 100"
              stroke={`url(#${gradId})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={LEN_RIGHT}
              strokeDashoffset={LEN_RIGHT}
            />
            <path
              className="hubia-logo-line hubia-logo-line--bar"
              d="M 26 50 L 74 50"
              stroke={`url(#${gradId})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={LEN_BAR}
              strokeDashoffset={LEN_BAR}
            />
          </g>

          {/* Nodi ai vertici: pulsazione leggera */}
          <g className="hubia-logo-animated__nodes">
            <circle className="hubia-logo-node" cx="26" cy="0" r="4" fill="#00D4FF" />
            <circle className="hubia-logo-node" cx="26" cy="50" r="4" fill="#00D4FF" />
            <circle className="hubia-logo-node" cx="26" cy="100" r="4" fill="#EAB308" />
            <circle className="hubia-logo-node" cx="74" cy="0" r="4" fill="#00D4FF" />
            <circle className="hubia-logo-node" cx="74" cy="50" r="4" fill="#00D4FF" />
            <circle className="hubia-logo-node" cx="74" cy="100" r="4" fill="#EAB308" />
          </g>
        </svg>
      </div>

      {!hideWordmark && (
        <span className="hubia-logo-animated__wordmark font-display text-primary text-3xl sm:text-4xl md:text-5xl tracking-[0.14em] font-bold uppercase">
          HUBIA
        </span>
      )}
    </div>
  )
}
