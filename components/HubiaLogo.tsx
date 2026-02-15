'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export function HubiaLogo() {
  return (
    <Link href="/" className="inline-block drop-shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 rounded" aria-label="HŪBIA home">
      <Image
        src="/logo.png"
        alt="HŪBIA"
        width={180}
        height={90}
        className="object-contain"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(212, 165, 116, 0.3))' }}
        priority
      />
    </Link>
  )
}
