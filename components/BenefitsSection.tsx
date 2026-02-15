import { getTranslations } from 'next-intl/server'

const benefits = [
  { titleKey: 'b1Title', descKey: 'b1Desc' },
  { titleKey: 'b2Title', descKey: 'b2Desc' },
  { titleKey: 'b3Title', descKey: 'b3Desc' },
  { titleKey: 'b4Title', descKey: 'b4Desc' },
]

function CheckIcon() {
  return (
    <svg className="h-5 w-5 flex-shrink-0 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export async function BenefitsSection() {
  const t = await getTranslations('home.benefits')

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="benefits">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mb-14 text-center font-medium text-[var(--secondary)]">{t('subtitle')}</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map(({ titleKey, descKey }) => (
            <div key={titleKey} className="card reveal-up rounded-[20px] bg-white/72 p-8 transition duration-300 hover:-translate-y-1">
              <div className="mb-3 flex gap-3">
                <CheckIcon />
                <h3 className="text-lg font-semibold text-[var(--secondary)]" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(titleKey)}
                </h3>
              </div>
              <p className="pl-8 text-sm leading-relaxed text-[var(--gray)]">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
