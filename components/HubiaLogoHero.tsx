'use client'

import { useId } from 'react'

/**
 * HubiaLogoHero — Logo HŪBIA dalla Hubiaimg.
 * H stilizzata al centro, anello con 4 nodi luminosi, wordmark "HŪBIA".
 * Gradient blu→viola, glow, effetto WOW per hero.
 */

const BLUE = '#60A5FA'
const VIOLET = '#8B5CF6'
const VIOLET_SOFT = '#A78BFA'

interface HubiaLogoHeroProps {
  className?: string
}

export function HubiaLogoHero({ className = '' }: HubiaLogoHeroProps) {
  const uid = useId().replace(/:/g, '')
  const g = `hubia-g-${uid}`
  const glow = `hubia-glow-${uid}`

  return (
    <div className={`inline-flex flex-col items-center gap-5 ${className}`}>
      {/* Icon: H + ring + 4 nodes + connector lines */}
      <svg
        viewBox="0 0 120 120"
        className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 hubia-logo-hero-icon"
        aria-hidden
      >
        <defs>
          <linearGradient id={g} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BLUE} />
            <stop offset="45%" stopColor={VIOLET} />
            <stop offset="100%" stopColor={VIOLET_SOFT} />
          </linearGradient>
          <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feFlood floodColor={VIOLET} floodOpacity="0.35" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${glow})`}>
          {/* Connector lines between nodes (subtle) */}
          <path
            d="M 60 12 L 108 60 M 108 60 L 60 108 M 60 108 L 12 60 M 12 60 L 60 12"
            fill="none"
            stroke={`url(#${g})`}
            strokeWidth="0.8"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />
          {/* Ring */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke={`url(#${g})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            className="hubia-logo-ring"
          />
          {/* 4 nodes — 12, 3, 6, 9 o'clock */}
          <circle cx="60" cy="12" r="5.5" fill={`url(#${g})`} className="hubia-logo-node" />
          <circle cx="108" cy="60" r="5.5" fill={`url(#${g})`} className="hubia-logo-node" />
          <circle cx="60" cy="108" r="5.5" fill={`url(#${g})`} className="hubia-logo-node" />
          <circle cx="12" cy="60" r="5.5" fill={`url(#${g})`} className="hubia-logo-node" />
          {/* H: crossbar slightly below midpoint, rounded */}
          <path
            d="M 37 28 L 37 92 M 83 28 L 83 92 M 37 58 L 83 58"
            fill="none"
            stroke={`url(#${g})`}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hubia-logo-h"
          />
        </g>
      </svg>
      {/* Wordmark */}
      <span className="hubia-logo-hero-wordmark text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.12em]">
        HŪBIA
      </span>
    </div>
  )
}
