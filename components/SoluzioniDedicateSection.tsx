import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

const cardIcons = ['🏗️', '📱', '🔗']

export async function SoluzioniDedicateSection() {
  const t = await getTranslations('home.soluzioniDedicate')

  const cards = [
    { icon: cardIcons[0], titleKey: 'card1Title' as const, descKey: 'card1Desc' as const },
    { icon: cardIcons[1], titleKey: 'card2Title' as const, descKey: 'card2Desc' as const },
    { icon: cardIcons[2], titleKey: 'card3Title' as const, descKey: 'card3Desc' as const },
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="soluzioni-dedicate">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
          {t('label')}
        </p>
        <h2
          className="mb-6 text-center text-3xl font-bold leading-tight text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--gray)]">{t('body')}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map(({ icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="card reveal-up rounded-[20px] bg-white/72 p-8 transition duration-300 hover:-translate-y-1"
            >
              <span className="mb-4 block text-2xl" aria-hidden>
                {icon}
              </span>
              <h3
                className="mb-3 text-lg font-semibold text-[var(--primary)]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {t(titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--gray)]">{t(descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-xl border border-[var(--line)] bg-[var(--bg-alt)] px-6 py-6 text-center">
          <p className="text-sm text-[var(--gray)]">{t('closingBox')}</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d4af37] px-10 font-semibold text-[#0a0a0a] shadow-lg transition hover:brightness-110"
          >
            {t('cta')}
          </Link>
          <p className="text-xs text-[var(--gray)]">{t('ctaNote')}</p>
        </div>
      </div>
    </section>
  )
}
