import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

interface HeroProps {
  variant?: 'A' | 'B'
}

const valuePills = ['Brand proprietario', 'Processi operativi chiari', 'Esperienza cliente premium']

export async function Hero({ variant = 'A' }: HeroProps) {
  const t = await getTranslations('home.hero')
  const title = t('title')
  const words = title.split(/\s+/).filter(Boolean)

  const ctaText = variant === 'B' ? 'Inizia gratis trial' : t('ctaPrimary')
  const ctaClass =
    variant === 'B'
      ? 'inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-8 font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400'
      : 'inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--secondary)] px-8 font-semibold text-[var(--primary)] shadow-lg transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60'

  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges) ? badges : ['GDPR Ready', 'PWA', 'White-label', 'Supporto umano']

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute -top-36 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(184,133,67,0.18) 0%, rgba(184,133,67,0) 66%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="relative text-center md:text-left">
          <HubiaLogo variant="hero" />

          <h1
            className="mb-6 text-4xl font-bold leading-tight tracking-[0.01em] text-[var(--primary)] sm:text-5xl md:text-[58px]"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {words.map((word: string, i: number) => (
              <span
                key={`${word}-${i}`}
                className="hero-word mr-[0.23em] inline-block"
                style={{ animation: `fadeInWord 0.55s ease-out ${i * 0.07}s forwards` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--gray)] sm:text-lg md:mx-0">
            {t('subtitle')}
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-2 md:justify-start">
            {badgeList.map((label) => (
              <span
                key={label}
                className="inline-flex min-h-9 items-center rounded-full border border-[var(--secondary)]/35 bg-[var(--secondary)]/15 px-4 text-xs font-semibold text-[var(--primary)] sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link href="/#cta" className={ctaClass}>
              {ctaText}
            </Link>
            <Link
              href="/#setup"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--line)] bg-white px-6 font-semibold text-[var(--primary)] transition hover:border-[var(--secondary)]/50"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {valuePills.map((item) => (
              <div key={item} className="card rounded-xl bg-white/75 px-4 py-3 text-sm font-semibold text-[var(--primary)] backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] border border-[var(--secondary)]/35 bg-[var(--bg-alt)] p-2 shadow-[0_30px_80px_rgba(16,24,40,0.18)]">
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[24px] bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <video
            src="/demo-pwa.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full rounded-[24px] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
