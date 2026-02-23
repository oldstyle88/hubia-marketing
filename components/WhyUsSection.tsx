import { getTranslations } from 'next-intl/server'

const blocks = [
  { titleKey: 'block1Title' as const, bodyKey: 'block1Body' as const },
  { titleKey: 'block2Title' as const, bodyKey: 'block2Body' as const },
  { titleKey: 'block3Title' as const, bodyKey: 'block3Body' as const },
]

export async function WhyUsSection() {
  const t = await getTranslations('home.differenziatori')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="why-us">
      <div className="mx-auto max-w-4xl">
        <h2
          className="mb-14 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <div className="space-y-12">
          {blocks.map(({ titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="reveal-up border-l-4 border-[#d4af37] pl-8 pr-4 py-2"
            >
              <h3
                className="mb-3 text-lg font-semibold text-[var(--primary)]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {t(titleKey)}
              </h3>
              <p className="leading-relaxed text-[var(--gray)]">{t(bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
