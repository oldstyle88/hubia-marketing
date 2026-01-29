'use client'

const BLUE = '#60A5FA'
const VIOLET = '#8B5CF6'
const VIOLET_SOFT = '#A78BFA'
const RING_R = 48
const RING_LEN = Math.round(2 * Math.PI * RING_R)

interface HubiaLogoHeroProps {
  className?: string
}

export function HubiaLogoHero(props: HubiaLogoHeroProps) {
  const className = props.className ?? ''
  const base = 'inline-flex flex-col items-center gap-6'

  return (
    <div className={base + (className ? ' ' + className : '')}>
      <div className="relative flex items-center justify-center">
        <div className="logo-orbits">
          <div className="logo-orbit-ring logo-orbit-ring-1" aria-hidden />
          <div className="logo-orbit-ring logo-orbit-ring-2" aria-hidden />
          <div className="logo-orbit-ring logo-orbit-ring-3" aria-hidden />
        </div>
        <svg
          viewBox="0 0 120 120"
          className="relative z-10 h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-60 lg:w-60 hubia-logo-hero-icon"
          aria-hidden
        >
          <defs>
            <linearGradient id="hubia-hero-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BLUE} />
              <stop offset="45%" stopColor={VIOLET} />
              <stop offset="100%" stopColor={VIOLET_SOFT} />
            </linearGradient>
          </defs>
          <g className="hubia-logo-g">
            <path
              d="M 60 12 L 108 60 M 108 60 L 60 108 M 60 108 L 12 60 M 12 60 L 60 12"
              fill="none"
              stroke="url(#hubia-hero-g)"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              strokeLinecap="round"
              className="hubia-logo-connectors"
              strokeDasharray={400}
              strokeDashoffset={400}
            />
            <circle
              cx="60"
              cy="60"
              r={RING_R}
              fill="none"
              stroke="url(#hubia-hero-g)"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="hubia-logo-ring"
              strokeDasharray={RING_LEN}
              strokeDashoffset={RING_LEN}
            />
            <circle cx="60" cy="12" r="5.5" fill="url(#hubia-hero-g)" className="hubia-logo-node hubia-logo-node-0" />
            <circle cx="108" cy="60" r="5.5" fill="url(#hubia-hero-g)" className="hubia-logo-node hubia-logo-node-1" />
            <circle cx="60" cy="108" r="5.5" fill="url(#hubia-hero-g)" className="hubia-logo-node hubia-logo-node-2" />
            <circle cx="12" cy="60" r="5.5" fill="url(#hubia-hero-g)" className="hubia-logo-node hubia-logo-node-3" />
            <path
              d="M 37 28 L 37 92 M 83 28 L 83 92 M 37 58 L 83 58"
              fill="none"
              stroke="url(#hubia-hero-g)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hubia-logo-h"
            />
          </g>
        </svg>
      </div>
      <span className="hubia-logo-hero-wordmark text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.12em]">
        HŪBIA
      </span>
    </div>
  )
}
