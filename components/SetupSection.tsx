import { getTranslations } from 'next-intl/server'

const steps = [
  { titleKey: 'step1Title', descKey: 'step1Desc' },
  { titleKey: 'step2Title', descKey: 'step2Desc' },
  { titleKey: 'step3Title', descKey: 'step3Desc' },
]

export async function SetupSection() {
  const t = await getTranslations('home.howItWorks')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="setup">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mb-14 text-center text-[var(--gray)]">{t('subtitle')}</p>
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-4">
          {steps.map(({ titleKey, descKey }, i) => (
            <div key={titleKey} className="reveal-up flex flex-col items-center md:flex-1 md:items-start">
              <div className="flex items-center gap-4 md:flex-col md:gap-2">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--secondary)] bg-[var(--secondary)]/42 text-lg font-bold text-[var(--primary)]"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="hidden h-0.5 min-w-[40px] flex-1 self-center bg-[var(--primary)]/20 md:block" />}
              </div>
              <div className="mt-4 text-center md:text-left">
                <h3 className="mb-2 text-lg font-semibold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--gray)]">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-[var(--gray)]">{t('setupNote')}</p>
      </div>
    </section>
  )
}
