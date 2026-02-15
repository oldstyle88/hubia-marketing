'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { HubiaLogo } from '@/components/HubiaLogo'

interface HeroProps {
  variant?: 'A' | 'B'
}

const metrics = [
  { value: '-35%', label: 'no-show medi in 90 giorni' },
  { value: '+22%', label: 'slot riempiti a parita di staff' },
  { value: '< 7gg', label: 'tempo medio di go-live' },
]

export function Hero({ variant = 'A' }: HeroProps) {
  const t = useTranslations('home.hero')
  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges)
    ? badges
    : ['PWA nativa', 'Provisioning assistito', 'Dashboard staff']

  const ctaText = variant === 'B' ? 'Inizia ora' : t('ctaPrimary')

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-16">
      <div className="hubia-grid-glow" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:gap-14">
        <HubiaLogo variant="hero" />

        <div className="max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {badgeList.map((label) => (
              <span key={label} className="hubia-pill">
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#cta" className="hubia-btn-primary px-8 py-3.5 text-sm sm:text-base">
              {ctaText}
            </Link>
            <Link href="/#pricing" className="hubia-btn-secondary px-8 py-3.5 text-sm sm:text-base">
              Vedi prezzi reali
            </Link>
          </div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((item) => (
            <article key={item.value} className="hubia-metric-card">
              <p className="text-3xl font-semibold tracking-tight text-cyan-200">{item.value}</p>
              <p className="mt-2 text-sm text-slate-300">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
