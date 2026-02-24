import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function PricingSection() {
  const t = await getTranslations('home.plansHome')

  const studioFeatures = t.raw('studioFeatures') as string[]
  const proFeatures = t.raw('proFeatures') as string[]
  const signatureFeatures = t.raw('signatureFeatures') as string[]

  const cards = [
    {
      key: 'studio',
      name: t('studioName'),
      forWho: t('studioForWho'),
      setup: t('studioSetup'),
      setupNote: t('studioSetupNote'),
      canone: t('studioCanone'),
      cta: t('studioCta'),
      features: studioFeatures,
      tag: null as string | null,
    },
    {
      key: 'pro',
      name: t('proName'),
      forWho: t('proForWho'),
      setup: t('proSetup'),
      setupNote: t('proSetupNote'),
      canone: t('proCanone'),
      cta: t('proCta'),
      features: proFeatures,
      tag: t('proTag'),
    },
    {
      key: 'signature',
      name: t('signatureName'),
      forWho: t('signatureForWho'),
      setup: t('signatureSetup'),
      setupNote: t('signatureSetupNote'),
      canone: t('signatureCanone'),
      cta: t('signatureCta'),
      features: signatureFeatures,
      tag: t('signatureTag'),
    },
  ]

  const comparisonRows = [
    { labelKey: 'compareAppWhiteLabel' as const, studio: true, pro: true, signature: true },
    { labelKey: 'compareLoyalty' as const, studio: true, pro: true, signature: true },
    { labelKey: 'comparePush' as const, studio: true, pro: true, signature: true },
    { labelKey: 'compareHubiaApp' as const, studio: false, pro: true, signature: true },
    { labelKey: 'compareAnalytics' as const, studio: false, pro: true, signature: true },
    { labelKey: 'compareBroadcast' as const, studio: false, pro: true, signature: true },
    { labelKey: 'compareRecurring' as const, studio: false, pro: true, signature: true },
    { labelKey: 'compareCoachAi' as const, studio: false, pro: false, signature: true },
    { labelKey: 'compareForecast' as const, studio: false, pro: false, signature: true },
    { labelKey: 'comparePromo' as const, studio: false, pro: false, signature: true },
    { labelKey: 'compareSetup' as const, studio: '€800', pro: '€1.400', signature: '€1.900' },
    { labelKey: 'compareCanone' as const, studio: t('studioCanone'), pro: t('proCanone'), signature: t('signatureCanone') },
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--gray)]">{t('subtitle')}</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`card-deep reveal-up relative rounded-[20px] bg-white/78 p-8 transition-all duration-300 hover:-translate-y-1 ${card.tag ? 'ring-2 ring-[#d4af37]/50' : ''}`}
            >
              {card.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d4af37] px-4 py-1 text-xs font-semibold text-[#0a0a0a]">
                  {card.tag}
                </div>
              )}

              <h3
                className="mb-2 text-xl font-bold text-[var(--primary)]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {card.name}
              </h3>
              <p className="mb-6 text-sm text-[var(--gray)]">{card.forWho}</p>

              <p className="mb-1 font-semibold text-[var(--gray)]">
                {card.setup} <span className="text-xs font-normal">({card.setupNote})</span>
              </p>
              <p className="mb-6 text-lg font-bold text-[var(--primary)]">{card.canone}</p>

              <ul className="mb-8 space-y-2">
                {card.features.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-[var(--text)]">
                    <span className="text-[#d4af37]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="block w-full rounded-xl bg-[var(--primary)] py-3 text-center font-semibold text-white transition hover:brightness-110"
              >
                {card.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[var(--gray)]">{t('coachNote')}</p>

        <div className="mt-14 overflow-x-auto rounded-xl border border-[var(--line)] bg-white/70">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="p-4 font-semibold text-[var(--primary)]"></th>
                <th className="p-4 font-semibold text-[var(--primary)]">{t('studioName')}</th>
                <th className="p-4 font-semibold text-[var(--primary)]">{t('proName')}</th>
                <th className="p-4 font-semibold text-[var(--primary)]">{t('signatureName')}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.labelKey} className="border-b border-[var(--line)]/60">
                  <td className="p-4 text-[var(--gray)]">{t(row.labelKey)}</td>
                  <td className="p-4">
                    {typeof row.studio === 'boolean'
                      ? row.studio
                        ? '✓'
                        : '—'
                      : row.studio}
                  </td>
                  <td className="p-4">
                    {typeof row.pro === 'boolean' ? (row.pro ? '✓' : '—') : row.pro}
                  </td>
                  <td className="p-4">
                    {typeof row.signature === 'boolean'
                      ? row.signature
                        ? '✓'
                        : '—'
                      : row.signature}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
