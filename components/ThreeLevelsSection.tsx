import { getTranslations } from 'next-intl/server'

const cardIcons = {
  app: '📱',
  dashboard: '🖥️',
  coach: '🤖',
}

export async function ThreeLevelsSection() {
  const t = await getTranslations('home.threeLevels')

  const cards = [
    { icon: cardIcons.app, titleKey: 'card1Title' as const, bodyKey: 'card1Body' as const },
    { icon: cardIcons.dashboard, titleKey: 'card2Title' as const, bodyKey: 'card2Body' as const },
    { icon: cardIcons.coach, titleKey: 'card3Title' as const, bodyKey: 'card3Body' as const },
  ]

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="coach-ai">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--gray)]">{t('subtitle')}</p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {cards.map(({ icon, titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="card reveal-up rounded-[20px] bg-white/72 p-8 transition duration-300 hover:-translate-y-1"
            >
              <span className="mb-4 block text-3xl" aria-hidden>
                {icon}
              </span>
              <h3
                className="mb-4 text-xl font-semibold text-[var(--primary)]"
                style={{ fontFamily: 'var(--font-title)' }}
              >
                {t(titleKey)}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--gray)]">{t(bodyKey)}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs font-medium text-[var(--secondary)]">
          {t('coachBadge')}
        </p>
      </div>
    </section>
  )
}
