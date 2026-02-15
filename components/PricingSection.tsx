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

  const rateizzaOptions = useMemo(
    () => [
      { value: 6, label: '6 mesi' },
      { value: 12, label: '12 mesi' },
    ],
    []
  )

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold text-slate-50 sm:text-4xl">{t('title')}</h2>
        <p className="mx-auto mb-8 mt-4 max-w-2xl text-center text-slate-300">{t('subtitle')}</p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="inline-flex rounded-xl border border-white/15 bg-[#09162e] p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                !annual ? 'bg-[#7ec0ff] text-[#051226]' : 'text-slate-300'
              }`}
            >
              €/mese
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                annual ? 'bg-[#7ec0ff] text-[#051226]' : 'text-slate-300'
              }`}
            >
              Annuo (-10%)
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-200">
            <span>Rateizza in:</span>
            <select
              value={rateizzaMonths}
              onChange={(e) => setRateizzaMonths(Number(e.target.value) as 6 | 12)}
              className="rounded-lg border border-white/20 bg-[#09162e] px-3 py-2 text-slate-100"
            >
              {rateizzaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const includes = plan.includesKey ? (t.raw(plan.includesKey) as string[]) : []
            const isCustom = plan.cta === true
            const setupNum = plan.setupNum ?? 0
            const monthlyNum = plan.monthlyNum ?? 0
            const rateizzaMonthly = rateizzaMonths > 0 && setupNum > 0 ? Math.round(setupNum / rateizzaMonths) : 0
            const annualMonthly = annual && monthlyNum > 0 ? Math.round(monthlyNum * (1 - ANNUAL_DISCOUNT)) : monthlyNum

            return (
              <article
                key={plan.key}
                className={`relative rounded-2xl border p-7 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                  plan.featured
                    ? 'border-cyan-300/60 bg-gradient-to-b from-cyan-200/15 via-white/8 to-white/5 shadow-[0_20px_50px_rgba(34,132,227,0.28)]'
                    : 'border-white/15 bg-white/5 shadow-[0_18px_44px_rgba(2,10,26,0.45)]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-200/50 bg-[#7ec0ff] px-4 py-1 text-xs font-semibold text-[#051225]">
                    {tPricing('mostChosen')}
                  </div>
                )}

                <h3 className="mb-2 text-xl font-semibold text-slate-50">{t(plan.nameKey)}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-300">{t(plan.forWhoKey)}</p>

                {!isCustom && setupNum > 0 && (
                  <>
                    <p className="mb-1 text-sm font-semibold text-cyan-200">{t(plan.setupKey)}</p>
                    <p className="mb-1 text-lg font-semibold text-slate-100">
                      <span className="text-cyan-200">EUR {rateizzaMonthly}/mese</span> per {rateizzaMonths} mesi
                    </p>
                    {plan.setupNoteKey && <p className="mb-4 text-xs text-slate-400">{t(plan.setupNoteKey)}</p>}
                  </>
                )}

                {isCustom && (
                  <>
                    <p className="mb-1 text-sm font-semibold text-cyan-200">{t(plan.setupKey)}</p>
                    <p className="mb-4 text-xs text-slate-400">{t(plan.canoneKey)}</p>
                  </>
                )}

                {!isCustom && monthlyNum > 0 && (
                  <p className="mb-6 text-lg font-semibold text-slate-50">
                    {annual ? (
                      <>
                        EUR {annualMonthly} / mese <span className="text-sm font-normal text-slate-400">(annuo -10%)</span>
                      </>
                    ) : (
                      <>EUR {monthlyNum} / mese</>
                    )}
                  </p>
                )}

                {!isCustom && (
                  <ul className="mb-8 space-y-2.5">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-slate-200">
                        <span className="mt-0.5 text-cyan-200">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {isCustom ? (
                  <Link href="/#cta" className="hubia-btn-primary block w-full py-3 text-center text-sm">
                    Su Misura
                  </Link>
                ) : (
                  <Link href="/#cta" className="hubia-btn-secondary block w-full py-3 text-center text-sm">
                    {tNav('requestDemo')}
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
