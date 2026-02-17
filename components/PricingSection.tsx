import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function PricingSection() {
  const t = await getTranslations('home.plansHome')
  const tPlans = await getTranslations('plans')
  const tNav = await getTranslations('nav')
  const tPricing = await getTranslations('pricing')

  const studioIncludes = tPlans.raw('pro.features') as string[]
  const signatureIncludes = tPlans.raw('max.features') as string[]

  const cards: Array<{
    key: string
    name: string
    forWho: string
    setup: string
    setupNote: string | null
    canone: string
    includes: string[]
    featured: boolean
    isCustom: boolean
  }> = [
    {
      key: 'studio',
      name: tPlans('pro.name'),
      forWho: tPlans('pro.description'),
      setup: t('studioSetup'),
      setupNote: 'studioSetupNote',
      canone: t('studioCanone'),
      includes: studioIncludes,
      featured: false,
      isCustom: false,
    },
    {
      key: 'signature',
      name: tPlans('max.name'),
      forWho: tPlans('max.description'),
      setup: t('signatureSetup'),
      setupNote: 'signatureSetupNote',
      canone: t('signatureCanone'),
      includes: signatureIncludes,
      featured: true,
      isCustom: false,
    },
    {
      key: 'custom',
      name: t('customName'),
      forWho: t('customForWho'),
      setup: t('customSetup'),
      setupNote: null,
      canone: t('customMonthly'),
      includes: [],
      featured: false,
      isCustom: true,
    },
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mx-auto mb-3 max-w-2xl text-center text-[var(--gray)]">{t('subtitle')}</p>
        <p className="mb-10 text-center text-sm font-medium text-[var(--secondary)]">Setup rateizzabile in 6 o 12 mesi. Nessun costo nascosto.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`card-deep reveal-up relative rounded-[20px] bg-white/78 p-8 transition-all duration-300 hover:-translate-y-1 ${card.featured ? 'ring-2 ring-[var(--secondary)]/60' : ''}`}
            >
              {card.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-semibold text-white">
                  {tPricing('mostChosen')}
                </div>
              )}

              <h3 className="mb-2 text-xl font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                {card.name}
              </h3>
              <p className="mb-6 text-sm text-[var(--gray)]">{card.forWho}</p>

              <p className="mb-1 font-semibold text-[var(--secondary)]">{card.setup}</p>
              {card.setupNote && <p className="mb-2 text-xs text-[var(--gray)]">{t(card.setupNote)}</p>}
              <p className="mb-6 text-lg font-bold text-[var(--primary)]">{card.canone}</p>

              {!card.isCustom && (
                <ul className="mb-8 space-y-2">
                  {card.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[var(--text)]">
                      <span className="text-[var(--primary)]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/contact"
                className={`block w-full rounded-xl py-3 text-center font-medium transition-colors ${
                  card.isCustom
                    ? 'bg-[var(--primary)] text-white hover:brightness-110'
                    : 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/8'
                }`}
              >
                {card.isCustom ? 'Su Misura' : tNav('requestDemo')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
