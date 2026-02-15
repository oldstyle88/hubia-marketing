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
        <span className="relative h-10 w-10">
          <img src="/brand/hubia-mark.png" alt="" width={40} height={40} className="h-full w-full object-contain drop-shadow-[0_8px_18px_rgba(0,23,48,0.38)]" />
        </span>
        <span className="text-[15px] font-semibold tracking-[0.2em] text-[var(--primary)]">HUBIA</span>
      </Link>
    )
  }

  return (
    <div className="mb-7 flex items-center justify-center gap-4 md:justify-start">
      <span className="animate-logo-float relative h-14 w-14 sm:h-16 sm:w-16">
        <img
          src="/brand/hubia-mark.png"
          alt="Logo HUBIA"
          width={64}
          height={64}
          className="h-full w-full object-contain drop-shadow-[0_14px_26px_rgba(0,23,48,0.4)]"
        />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--secondary)]">Connected Operating Core</p>
        <p className="text-xl font-semibold tracking-[0.24em] text-[var(--primary)] sm:text-2xl">HUBIA</p>
      </div>
    </div>
  )
}
