import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

const plans = [
  {
    key: 'studio',
    nameKey: 'studioName',
    forWhoKey: 'studioForWho',
    setupKey: 'studioSetup',
    setupNoteKey: 'studioSetupNote',
    canoneKey: 'studioCanone',
    includesKey: 'studioIncludes',
    featured: false,
  },
  {
    key: 'signature',
    nameKey: 'signatureName',
    forWhoKey: 'signatureForWho',
    setupKey: 'signatureSetup',
    setupNoteKey: 'signatureSetupNote',
    canoneKey: 'signatureCanone',
    includesKey: 'signatureIncludes',
    featured: true,
  },
  {
    key: 'custom',
    nameKey: 'customName',
    forWhoKey: 'customForWho',
    setupKey: 'customSetup',
    setupNoteKey: null,
    canoneKey: 'customMonthly',
    includesKey: 'customIncludes',
    featured: false,
    cta: true,
  },
]

export async function PricingSection() {
  const t = await getTranslations('home.plansHome')
  const tNav = await getTranslations('nav')
  const tPricing = await getTranslations('pricing')

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mx-auto mb-3 max-w-2xl text-center text-[var(--gray)]">{t('subtitle')}</p>
        <p className="mb-10 text-center text-sm font-medium text-[var(--secondary)]">Setup rateizzabile in 6 o 12 mesi. Nessun costo nascosto.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const includes = plan.includesKey ? (t.raw(plan.includesKey) as string[]) : []
            const isCustom = plan.cta === true

            return (
              <div
                key={plan.key}
                className={`card-deep reveal-up relative rounded-[20px] bg-white/78 p-8 transition-all duration-300 hover:-translate-y-1 ${plan.featured ? 'ring-2 ring-[var(--secondary)]/60' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-semibold text-white">
                    {tPricing('mostChosen')}
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(plan.nameKey)}
                </h3>
                <p className="mb-6 text-sm text-[var(--gray)]">{t(plan.forWhoKey)}</p>

                <p className="mb-1 font-semibold text-[var(--secondary)]">{t(plan.setupKey)}</p>
                {plan.setupNoteKey && <p className="mb-2 text-xs text-[var(--gray)]">{t(plan.setupNoteKey)}</p>}
                <p className="mb-6 text-lg font-bold text-[var(--primary)]">{t(plan.canoneKey)}</p>

                {!isCustom && (
                  <ul className="mb-8 space-y-2">
                    {includes.map((item) => (
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
                    isCustom
                      ? 'bg-[var(--primary)] text-white hover:brightness-110'
                      : 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/8'
                  }`}
                >
                  {isCustom ? 'Su Misura' : tNav('requestDemo')}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
