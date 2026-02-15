'use client'

import { useTranslations } from 'next-intl'

const steps = [
  { titleKey: 'step1Title', descKey: 'step1Desc' },
  { titleKey: 'step2Title', descKey: 'step2Desc' },
  { titleKey: 'step3Title', descKey: 'step3Desc' },
]

export function SetupSection() {
  const t = useTranslations('home.howItWorks')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-alt)]" id="setup">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-[var(--primary)] text-center mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[var(--gray)] text-center mb-14">
          {t('subtitle')}
        </p>
        <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-4">
          {steps.map(({ titleKey, descKey }, i) => (
            <div key={titleKey} className="flex flex-col md:flex-1 items-center md:items-start">
              <div className="flex items-center gap-4 md:flex-col md:gap-2">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-[var(--primary)] bg-[var(--secondary)]/30 border-2 border-[var(--secondary)]"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-0.5 bg-[var(--primary)]/20 min-w-[40px] self-center" />
                )}
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(titleKey)}
                </h3>
                <p className="text-sm text-[var(--gray)] leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--gray)] mt-10">
          {t('setupNote')}
        </p>
      </div>
    </section>
  )
}
