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
        <linearGradient id="hubia-metal-main" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#dff1ff" />
          <stop offset="22%" stopColor="#95cafb" />
          <stop offset="48%" stopColor="#2f74d2" />
          <stop offset="76%" stopColor="#103d82" />
          <stop offset="100%" stopColor="#061b43" />
        </linearGradient>
        <linearGradient id="hubia-metal-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fcff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#b8dcff" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#83bbff" stopOpacity="0.12" />
        </linearGradient>
        <filter id="hubia-metal-shadow" x="-25%" y="-20%" width="170%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#03102a" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#hubia-metal-shadow)" className="hubia-metal-core">
        <path d="M52 26H94V196H52Z" fill="url(#hubia-metal-main)" stroke="#beddff" strokeOpacity="0.55" strokeWidth="1.6" />
        <path d="M126 26H168V196H126Z" fill="url(#hubia-metal-main)" stroke="#beddff" strokeOpacity="0.55" strokeWidth="1.6" />

        <path d="M91 112L127 95V128L91 146Z" fill="url(#hubia-metal-main)" stroke="#beddff" strokeOpacity="0.42" strokeWidth="1.2" />
        <path d="M86 102L130 78L130 94L86 118Z" fill="url(#hubia-metal-main)" stroke="#beddff" strokeOpacity="0.5" strokeWidth="1.2" />

        <path d="M58 34H67V186H58Z" fill="url(#hubia-metal-gloss)" />
        <path d="M132 34H141V186H132Z" fill="url(#hubia-metal-gloss)" />
      </g>
    </svg>
  )
}

function HubiaInvestorWordmark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 128" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <defs>
        <linearGradient id="hubia-word-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f9ff" />
          <stop offset="22%" stopColor="#d3e8ff" />
          <stop offset="48%" stopColor="#6ca6ec" />
          <stop offset="78%" stopColor="#133f83" />
          <stop offset="100%" stopColor="#061d44" />
        </linearGradient>
      </defs>
      <text
        x="280"
        y="95"
        textAnchor="middle"
        fontFamily="Space Grotesk, Sora, sans-serif"
        fontWeight="700"
        fontSize="92"
        letterSpacing="8"
        fill="url(#hubia-word-metal)"
        stroke="#d8edff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        className="hubia-metal-word"
      >
        HUBIA
      </text>
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
    <div
      className={`hubia-investor-logo ${isHero ? 'hubia-investor-logo--hero' : 'hubia-investor-logo--header'} ${className}`.trim()}
      aria-label="HUBIA"
    >
      <HubiaInvestorMark className={isHero ? 'h-[166px] w-[166px] sm:h-[192px] sm:w-[192px]' : 'h-[56px] w-[56px]'} />
      {showWordmark && (
        <HubiaInvestorWordmark className={isHero ? 'w-[260px] sm:w-[340px]' : 'w-[110px] sm:w-[130px]'} />
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
