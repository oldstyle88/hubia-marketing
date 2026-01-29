'use client'

import { useId } from 'react'

/** HubiaLogoHero: logo HUBIA (H + anello + nodi + wordmark), anelli orbitali, union. */

const BLUE = '#60A5FA'
const VIOLET = '#8B5CF6'
const VIOLET_SOFT = '#A78BFA'
const RING_R = 48
const RING_LEN = Math.round(2 * Math.PI * RING_R)

interface HubiaLogoHeroProps {
  className?: string
}

export function HubiaLogoHero({ className = '' }: HubiaLogoHeroProps) {
  const uid = useId().replace(/:/g, '')
  const g = 'hubia-g-' + uid
  const filterId = 'hubia-glow-' + uid
  const cn = 'inline-flex flex-col items-center gap-6 ' + (className || '').trim()

  return (
    <div className={cn}>
      {/* Orbital rings + icon container */}
      <div className="relative flex items-center justify-center">
        {/* Rotating rings around logo */}
        <div className="logo-orbits">
          <div className="logo-orbit-ring logo-orbit-ring-1" aria-hidden />
          <div className="logo-orbit-ring logo-orbit-ring-2" aria-hidden />
          <div className="logo-orbit-ring logo-orbit-ring-3" aria-hidden />
        </div>
        {/* Icon: H + ring + nodes + connectors */}
        <svg
          viewBox="0 0 120 120"
          className="relative z-10 h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60 hubia-logo-hero-icon"
          aria-hidden
        >
          <defs>
            <linearGradient id={g} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BLUE} />
              <stop offset="45%" stopColor={VIOLET} />
              <stop offset="100%" stopColor={VIOLET_SOFT} />
            </linearGradient>
            <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feFlood floodColor={VIOLET} floodOpacity="0.35" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </feMerge>
          </defs>
          <g filter={'url(#' + filterId + ')'}>
            {/* Connectors draw-in */}
            <path
              d="M 60 12 L 108 60 M 108 60 L 60 108 M 60 108 L 12 60 M 12 60 L 60 12"
              fill="none"
              stroke={'url(#' + g + ')'}
              strokeWidth="0.8"
              strokeOpacity="0.3"
              strokeLinecap="round"
              className="hubia-logo-connectors"
              strokeDasharray={400}
              strokeDashoffset={400}
            />
            {/* Ring draws closed */}
            <circle
              cx="60"
              cy="60"
              r={RING_R}
              fill="none"
              stroke={'url(#' + g + ')'}
              strokeWidth="1.8"
              strokeLinecap="round"
              className="hubia-logo-ring"
              strokeDasharray={RING_LEN}
              strokeDashoffset={RING_LEN}
            />
            {/* 4 nodes appear in sequence */}
            <circle cx="60" cy="12" r="5.5" fill={'url(#' + g + ')'} className="hubia-logo-node hubia-logo-node-0" />
            <circle cx="108" cy="60" r="5.5" fill={'url(#' + g + ')'} className="hubia-logo-node hubia-logo-node-1" />
            <circle cx="60" cy="108" r="5.5" fill={'url(#' + g + ')'} className="hubia-logo-node hubia-logo-node-2" />
            <circle cx="12" cy="60" r="5.5" fill={'url(#' + g + ')'} className="hubia-logo-node hubia-logo-node-3" />
            {/* H */}
            <path
              d="M 37 28 L 37 92 M 83 28 L 83 92 M 37 58 L 83 58"
              fill="none"
              stroke={'url(#' + g + ')'}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hubia-logo-h"
            />
          </g>
        </svg>
      </div>
      {/* Wordmark */}
      <span className="hubia-logo-hero-wordmark text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.12em]">
        HŪBIA
      </span>
    </div>
  )
}
