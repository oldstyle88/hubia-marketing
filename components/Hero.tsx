import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

interface HeroProps {
  variant?: 'A' | 'B'
}

const valuePills = ['Beauty e Barber Studio', 'Cliniche e Studi professionali', 'Food, delivery e attivita locali']

export async function Hero({ variant = 'A' }: HeroProps) {
  const t = await getTranslations('home.hero')

  const ctaText = variant === 'B' ? 'Inizia gratis trial' : t('ctaPrimary')
  const ctaClass =
    variant === 'B'
      ? 'inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0c3f77] px-8 font-semibold text-white shadow-lg transition-colors hover:bg-[#0a3564] focus:outline-none focus:ring-2 focus:ring-[#7bc9f6]/50'
      : 'inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--primary)] px-8 font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60'

  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges) ? badges : ['GDPR Ready', 'PWA', 'White-label', 'Supporto umano']

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="hero-brand-bg" aria-hidden="true">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-orbit hero-orbit-1" />
        <div className="hero-orbit hero-orbit-2" />
        <img src="/brand/hubia-mark.png" alt="" className="hero-bg-logo" />
      </div>

      <div
        className="pointer-events-none absolute -top-36 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(123,201,246,0.22) 0%, rgba(123,201,246,0) 66%)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="text-center md:text-left">
          <HubiaLogo variant="hero" />

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gray)] sm:text-xs">
            HUBIA unisce operazioni, team e clienti in un unico sistema vivo
          </p>

          <h1
            className="mb-6 text-4xl font-bold leading-tight tracking-[0.01em] text-[var(--primary)] sm:text-5xl md:text-[58px]"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {t('title')}
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
            <Link href="/contact" className={ctaClass}>
              {ctaText}
            </Link>
            <Link
              href="/#setup"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--line)] bg-white/70 px-6 font-semibold text-[var(--primary)] transition hover:border-[var(--secondary)]/60"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {valuePills.map((item) => (
              <div key={item} className="card reveal-up rounded-xl bg-white/75 px-4 py-3 text-sm font-semibold text-[var(--primary)] backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel mx-auto w-full max-w-[390px] rounded-[28px] p-6">
          <div className="relative space-y-4">
            <div className="reveal-up rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-[#cae7ff]">Agenda live</p>
              <p className="mt-2 text-sm font-semibold">96 prenotazioni confermate questa settimana</p>
            </div>
            <div className="reveal-up delay-1 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-[#cae7ff]">Team sync</p>
              <p className="mt-2 text-sm font-semibold">Staff allineato su turni, servizi e disponibilita in tempo reale</p>
            </div>
            <div className="reveal-up delay-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-[#cae7ff]">Performance</p>
              <p className="mt-2 text-sm font-semibold">+23% ritorno clienti in 90 giorni con flusso operativo stabile</p>
            </div>
            <div className="reveal-up delay-3 rounded-2xl border border-[#8acdf8]/55 bg-[#8acdf8]/15 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#d8efff]">Contesto che costruisci</p>
              <p className="mt-2 text-sm font-semibold text-white">
                Esperienza cliente, operativita del team e crescita economica in un unico sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
