import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

interface HeroProps {
  variant?: 'A' | 'B'
}

const valuePills = ['Brand proprietario', 'Processi operativi chiari', 'Esperienza cliente premium']

export async function Hero({ variant = 'A' }: HeroProps) {
  const t = await getTranslations('home.hero')

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
        <div className="text-center md:text-left">
          <HubiaLogo variant="hero" />

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

        <div className="card-deep relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] bg-[var(--bg-alt)] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,133,67,0.20),transparent_55%)]" />
          <div className="relative space-y-4">
            <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--gray)]">Agenda</p>
              <p className="mt-2 text-sm font-semibold text-[var(--primary)]">96 prenotazioni confermate questa settimana</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--gray)]">Team</p>
              <p className="mt-2 text-sm font-semibold text-[var(--primary)]">Staff allineato su turni, servizi e disponibilita in tempo reale</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white/85 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--gray)]">Performance</p>
              <p className="mt-2 text-sm font-semibold text-[var(--primary)]">+23% ritorno clienti in 90 giorni con flusso operativo stabile</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
