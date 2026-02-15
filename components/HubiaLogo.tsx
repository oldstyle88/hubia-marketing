'use client'

import { Link } from '@/i18n/navigation'

type Variant = 'header' | 'hero'

interface HubiaLogoProps {
  variant?: Variant
}

export function HubiaLogo({ variant = 'hero' }: HubiaLogoProps) {
  if (variant === 'header') {
    return (
      <Link
        href="/"
        className="inline-flex items-center gap-3 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60"
      >
        <span className="relative h-9 w-9 overflow-hidden rounded-full bg-[var(--bg-alt)] ring-1 ring-[var(--line)]">
          <img src="/logo.png" alt="" width={36} height={36} className="h-full w-full object-contain p-1.5" />
        </span>
        <span className="text-[15px] font-semibold tracking-[0.22em] text-[var(--primary)]">HŪBIA</span>
      </Link>
    )
  }

  return (
    <div className="relative mb-8 mt-2 w-full max-w-[520px]">
      <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]">
        <img src="/logo.png" alt="" width={340} height={340} className="hero-brand-watermark h-full w-full object-contain" />
      </div>
      <div className="relative z-10 text-center md:text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">Operating System</p>
        <p className="text-2xl font-semibold tracking-[0.3em] text-[var(--primary)] sm:text-3xl">HŪBIA</p>
      </div>
    </div>
  )
}
