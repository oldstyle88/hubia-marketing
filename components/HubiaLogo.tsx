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
        className="inline-flex items-center rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60"
      >
        <img
          src="/brand/hubia-logo-clean.png"
          alt="Logo HUBIA"
          width={168}
          height={128}
          className="h-11 w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,23,48,0.24)] sm:h-12"
        />
      </Link>
    )
  }

  return (
    <div className="mb-7 flex justify-center md:justify-center">
      <div className="hero-logo-core">
        <div className="hero-logo-orbit hero-logo-orbit-a" />
        <div className="hero-logo-orbit hero-logo-orbit-b" />
        <img
          src="/brand/hubia-logo-clean.png"
          alt="Logo HUBIA"
          width={210}
          height={160}
          className="animate-logo-float h-24 w-auto object-contain drop-shadow-[0_14px_26px_rgba(0,23,48,0.24)] sm:h-28"
        />
      </div>
    </div>
  )
}
