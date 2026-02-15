'use client'

import { useTranslations } from 'next-intl'
import { LeadForm } from '@/components/LeadForm'

export function FooterCTA() {
  const t = useTranslations('home.ctaFinal')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--primary)]" id="cta">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-white/90 mb-10">
          {t('subtitle')}
        </p>
        <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
