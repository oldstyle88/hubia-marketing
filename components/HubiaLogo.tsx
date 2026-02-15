'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'

type Variant = 'header' | 'hero'

interface HubiaLogoProps {
  variant?: Variant
}

export function HubiaLogo({ variant = 'hero' }: HubiaLogoProps) {
  const isHero = variant === 'hero'

  return (
    <Link
      href="/"
      className={`
        inline-block focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 rounded
        transition-all duration-[0.4s] ease-out
        ${isHero ? 'mx-auto mt-4 mb-2 drop-shadow-lg hover:scale-[1.08] glow-gold-hover' : 'drop-shadow-md hover:scale-105'}
      `}
      aria-label="HŪBIA home"
    >
      <span className={isHero ? 'block w-[140px] h-[70px] sm:w-[160px] sm:h-[80px] md:w-[220px] md:h-[110px]' : 'block w-[180px] h-[90px]'}>
        <Image
          src="/logo.png"
          alt="HŪBIA"
          width={isHero ? 220 : 180}
          height={isHero ? 110 : 90}
          className="object-contain w-full h-full"
          style={
            isHero
              ? { filter: 'drop-shadow(0 2px 12px rgba(212, 165, 116, 0.35))' }
              : { filter: 'drop-shadow(0 2px 8px rgba(212, 165, 116, 0.3))' }
          }
          priority
          sizes={isHero ? '(max-width: 480px) 140px, (max-width: 768px) 160px, 220px' : '180px'}
        />
      </span>
    </Link>
  )
}
