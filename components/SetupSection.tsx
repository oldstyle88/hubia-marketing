import { getTranslations } from 'next-intl/server'

const steps = [
  { titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
  { titleKey: 'step4Title' as const, descKey: 'step4Desc' as const },
]

export async function SetupSection() {
  const t = await getTranslations('home.howItWorks')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="come-funziona">
      <div className="mx-auto max-w-4xl">
        <h2
          className="mb-14 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <div className="flex flex-col gap-10">
          {steps.map(({ titleKey, descKey }, i) => (
            <div key={titleKey} className="reveal-up flex gap-6">
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#d4af37]/15 text-2xl font-bold text-[#d4af37]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3
                  className="mb-2 text-lg font-semibold text-[var(--primary)]"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  {t(titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--gray)]">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
