'use client'

import { useTranslations } from 'next-intl'
import { LeadForm } from '@/components/LeadForm'

export function FooterCTA() {
  const t = useTranslations('home.ctaFinal')

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      id="cta"
      style={{
        background:
          'radial-gradient(70% 50% at 50% 0%, rgba(108, 180, 255, 0.25) 0%, rgba(108, 180, 255, 0) 70%), linear-gradient(180deg, #061127 0%, #0a1d3a 100%)',
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-10 text-slate-300">{t('subtitle')}</p>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
