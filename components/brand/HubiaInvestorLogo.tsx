'use client'

import { Link } from '@/i18n/navigation'

interface HubiaInvestorLogoProps {
  variant?: 'header' | 'hero'
  showWordmark?: boolean
  link?: boolean
  className?: string
}

function HubiaInvestorMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="hubia-steel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6f2ff" />
          <stop offset="28%" stopColor="#8ec5ff" />
          <stop offset="55%" stopColor="#2f74d7" />
          <stop offset="82%" stopColor="#133f87" />
          <stop offset="100%" stopColor="#091d43" />
        </linearGradient>
        <linearGradient id="hubia-edge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9cc9ff" stopOpacity="0.35" />
        </linearGradient>
        <filter id="hubia-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.49 0 0 0 0 0.74 0 0 0 0 1 0 0 0 0.45 0"
          />
        </filter>
      </defs>

      <g className="hubia-mark-orbit hubia-mark-orbit-1">
        <circle cx="110" cy="110" r="84" fill="none" stroke="url(#hubia-steel)" strokeWidth="4" strokeLinecap="round" strokeDasharray="360 178" />
      </g>
      <g className="hubia-mark-orbit hubia-mark-orbit-2">
        <circle cx="110" cy="110" r="66" fill="none" stroke="url(#hubia-steel)" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="220 194" />
      </g>
      <g className="hubia-mark-orbit hubia-mark-orbit-3">
        <ellipse cx="110" cy="110" rx="90" ry="58" fill="none" stroke="url(#hubia-edge)" strokeWidth="2.6" transform="rotate(-26 110 110)" strokeDasharray="210 170" />
      </g>

      <g className="hubia-mark-nodes" filter="url(#hubia-soft-glow)">
        <circle cx="110" cy="25" r="5.8" fill="#7ec0ff" />
        <circle cx="188" cy="110" r="5.8" fill="#7ec0ff" />
        <circle cx="110" cy="195" r="5.8" fill="#7ec0ff" />
        <circle cx="32" cy="110" r="5.8" fill="#7ec0ff" />
      </g>

      <g className="hubia-mark-core">
        <path d="M66 45H92V175H66z" fill="url(#hubia-steel)" />
        <path d="M128 45H154V175H128z" fill="url(#hubia-steel)" />
        <path d="M90 121L132 95V120L90 146Z" fill="url(#hubia-steel)" />
        <path d="M84 52H91V168H84z" fill="url(#hubia-edge)" fillOpacity="0.34" />
        <path d="M146 52H153V168H146z" fill="url(#hubia-edge)" fillOpacity="0.3" />
      </g>
    </svg>
  )
}

export function HubiaInvestorLogo({
  variant = 'hero',
  showWordmark = true,
  link = false,
  className = '',
}: HubiaInvestorLogoProps) {
  const isHero = variant === 'hero'

  const block = (
    <div className={`hubia-investor-logo ${isHero ? 'hubia-investor-logo--hero' : 'hubia-investor-logo--header'} ${className}`.trim()}>
      <HubiaInvestorMark className={isHero ? 'h-[170px] w-[170px] sm:h-[196px] sm:w-[196px]' : 'h-[58px] w-[58px]'} />
      {showWordmark && (
        <span className={isHero ? 'hubia-investor-wordmark text-4xl sm:text-5xl md:text-6xl' : 'hubia-investor-wordmark text-xl sm:text-2xl'}>
          HUBIA
        </span>
      )}
    </div>
  )

  if (!link) return block

  return (
    <Link href="/" className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60">
      {block}
    </Link>
  )
}
