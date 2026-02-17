import { getTranslations } from 'next-intl/server'

const icons = {
  scissors: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5h2v14H5zM19 5h2v14h-2zM5 12h14M9 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM15 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  ),
  cream: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4M12 18v4M4 12h4M16 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
    </svg>
  ),
  pizza: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  paw: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <path d="M18 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <path d="M6 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <path d="M15 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <path d="M9 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      <path d="M8 8c-2-2-4-2-5 0-1 1.5-1 4 2 6 2 1.5 4 2 6 2 2 2 4 2 6-2 3-4.5 3-6 2-1.5-1-2.5-3-2-5 1-2 0-4-2-5z" />
    </svg>
  ),
}

const cards = [
  { key: 'card1', icon: 'scissors' as const },
  { key: 'card2', icon: 'cream' as const },
  { key: 'card3', icon: 'pizza' as const },
  { key: 'card4', icon: 'paw' as const },
]

export async function TargetSection() {
  const t = await getTranslations('home.forWho')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="target">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[var(--gray)]">{t('subtitle')}</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ key, icon }) => (
            <div key={key} className="card card-deep reveal-up rounded-[20px] bg-white/72 p-8 transition duration-300 hover:-translate-y-1">
              <div className="mb-4 text-[var(--secondary)] [&_svg]:stroke-[var(--secondary)]">{icons[icon]}</div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                {t(`${key}Title`)}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--gray)]">{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[var(--gray)]">{t('microText')}</p>
      </div>
    </section>
  )
}
