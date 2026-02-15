'use client'

import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'
import { Link } from '@/i18n/navigation'

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
    setupNum: 900,
    monthlyNum: 89,
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
    setupNum: 1400,
    monthlyNum: 120,
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
    setupNum: 0,
    monthlyNum: 0,
  },
]

const ANNUAL_DISCOUNT = 0.1

export function PricingSection() {
  const t = useTranslations('home.plansHome')
  const tNav = useTranslations('nav')
  const tPricing = useTranslations('pricing')
  const [annual, setAnnual] = useState(false)
  const [rateizzaMonths, setRateizzaMonths] = useState<6 | 12>(6)

  const rateizzaOptions = useMemo(() => [
    { value: 6, label: '6 mesi' },
    { value: 12, label: '12 mesi' },
  ], [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="pricing">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-[var(--primary)] text-center mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[var(--gray)] text-center mb-6 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!annual ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-alt)] text-[var(--gray)]'}`}
            >
              €/mese
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${annual ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-alt)] text-[var(--gray)]'}`}
            >
              Annuo (−10%)
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--text)]">
            <span>Rateizza in:</span>
            <select
              value={rateizzaMonths}
              onChange={(e) => setRateizzaMonths(Number(e.target.value) as 6 | 12)}
              className="px-2 py-1 rounded-lg border border-[var(--gray)]/40 bg-[var(--bg)] text-[var(--text)]"
            >
              {rateizzaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const includes = plan.includesKey ? (t.raw(plan.includesKey) as string[]) : []
            const isCustom = plan.cta === true
            const setupNum = plan.setupNum ?? 0
            const monthlyNum = plan.monthlyNum ?? 0
            const rateizzaMonthly = rateizzaMonths > 0 && setupNum > 0 ? Math.round(setupNum / rateizzaMonths) : 0
            const annualMonthly = annual && monthlyNum > 0 ? Math.round(monthlyNum * (1 - ANNUAL_DISCOUNT)) : monthlyNum

            return (
              <div
                key={plan.key}
                className={`card-deep rounded-[20px] p-8 bg-[var(--bg)] border-2 transition-all duration-300 hover:scale-[1.02] ${plan.featured ? 'border-[var(--secondary)] relative' : 'border-transparent'}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-[var(--primary)] bg-[var(--secondary)]">
                    {tPricing('mostChosen')}
                  </div>
                )}
                <h3 className="text-xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(plan.nameKey)}
                </h3>
                <p className="text-sm text-[var(--gray)] mb-6">
                  {t(plan.forWhoKey)}
                </p>
                {!isCustom && setupNum > 0 && (
                  <>
                    <p className="text-[var(--secondary)] font-semibold mb-1">
                      {t(plan.setupKey)}
                    </p>
                    {rateizzaMonths > 0 && (
                      <p className="text-[var(--primary)] font-bold mb-1">
                        <span className="text-[var(--secondary)]">€{rateizzaMonthly}/mese</span> per {rateizzaMonths} mesi
                      </p>
                    )}
                    {plan.setupNoteKey && (
                      <p className="text-xs text-[var(--gray)] mb-4">
                        {t(plan.setupNoteKey)}
                      </p>
                    )}
                  </>
                )}
                {isCustom && (
                  <>
                    <p className="text-[var(--secondary)] font-semibold mb-1">
                      {t(plan.setupKey)}
                    </p>
                    <p className="text-xs text-[var(--gray)] mb-4">
                      {t(plan.canoneKey)}
                    </p>
                  </>
                )}
                {!isCustom && monthlyNum > 0 && (
                  <p className="text-lg font-bold text-[var(--primary)] mb-6">
                    {annual ? (
                      <>€{annualMonthly} / mese <span className="text-sm font-normal text-[var(--gray)]">(annuo −10%)</span></>
                    ) : (
                      <>€{monthlyNum} / mese</>
                    )}
                  </p>
                )}
                {!isCustom && (
                  <ul className="space-y-2 mb-8">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[var(--text)]">
                        <span className="text-[var(--primary)]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {isCustom ? (
                  <Link
                    href="/#cta"
                    className="block w-full py-4 rounded-xl font-semibold text-center text-[var(--primary)] bg-[var(--secondary)] hover:opacity-95 transition-opacity"
                  >
                    Su Misura
                  </Link>
                ) : (
                  <Link
                    href="/#cta"
                    className="block w-full py-3 rounded-xl font-medium text-center text-[var(--secondary)] border-2 border-[var(--secondary)] hover:bg-[var(--secondary)]/10 transition-colors"
                  >
                    {tNav('requestDemo')}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
