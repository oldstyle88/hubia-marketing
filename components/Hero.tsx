import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

export async function Hero() {
  const t = await getTranslations('home.hero')
  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges) ? badges : []

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="hero-brand-bg" aria-hidden="true">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-orbit hero-orbit-1" />
        <div className="hero-orbit hero-orbit-2" />
        <img src="/brand/hubia-logo-clean.png" alt="" className="hero-bg-logo" />
      </div>

      <div
        className="pointer-events-none absolute -top-36 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(123,201,246,0.22) 0%, rgba(123,201,246,0) 66%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="text-center md:text-left">
          <HubiaLogo variant="hero" />

          <h1
            className="mb-6 mt-4 text-4xl font-bold leading-tight tracking-[0.01em] text-[var(--primary)] sm:text-5xl md:text-[58px]"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
            <br />
            {t('titleLine3')}
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--gray)] sm:text-lg md:mx-0">
            {t('subtitle')}
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {badgeList.map((label) => (
              <span
                key={label}
                className="inline-flex min-h-9 items-center rounded-full border border-[var(--secondary)]/35 bg-[var(--secondary)]/15 px-4 text-xs font-semibold text-[var(--primary)] sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-8 font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href="/#come-funziona"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--line)] bg-white/70 px-6 font-semibold text-[var(--primary)] transition hover:border-[var(--secondary)]/60"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <p className="text-sm text-[var(--gray)]">{t('statRow')}</p>
        </div>

        <div
          className="mockup-placeholder hero-panel mx-auto flex w-full max-w-[480px] flex-col items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] p-10 text-center shadow-xl"
          style={{ aspectRatio: '16/10' }}
        >
          <span className="text-xs uppercase tracking-widest text-[#d4af37]/60">
            Preview
          </span>
          <span className="mt-2 text-sm font-semibold text-[#d4af37]">
            HŪBIA Dashboard
          </span>
          <span className="mt-1 text-xs text-white/30">
            Staff · Analytics · Coach AI
          </span>
        </div>
      </div>
    </section>
  )
}
