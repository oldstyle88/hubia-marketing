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
          <img src="/brand/hubia-mark.svg" alt="" width={36} height={36} className="h-full w-full object-contain p-1.5" />
        </span>
        <span className="text-[15px] font-semibold tracking-[0.22em] text-[var(--primary)]">HŪBIA</span>
      </Link>
    )
  }

  return (
    <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
      <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-[var(--line)] shadow-sm sm:h-14 sm:w-14">
        <img src="/brand/hubia-mark.svg" alt="" width={56} height={56} className="h-full w-full object-contain p-1.5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">Operating System</p>
        <p className="text-xl font-semibold tracking-[0.28em] text-[var(--primary)] sm:text-2xl">HŪBIA</p>
      </div>
    </div>
  )
}
