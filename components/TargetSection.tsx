'use client'

import { useTranslations } from 'next-intl'

const icons = {
  scissors: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5h2v14H5zM19 5h2v14h-2zM5 12h14M9 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM15 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  ),
  cream: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4M12 18v4M4 12h4M16 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
    </svg>
  ),
  pizza: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
}

const cards = [
  { key: 'card1', icon: 'scissors' as const },
  { key: 'card2', icon: 'cream' as const },
  { key: 'card3', icon: 'pizza' as const },
]

export function TargetSection() {
  const t = useTranslations('home.forWho')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-alt)]" id="target">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-[var(--primary)] text-center mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[var(--gray)] text-center mb-14 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ key, icon }) => (
            <div
              key={key}
              className="card card-deep rounded-[20px] p-8 bg-[var(--bg)] transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-[var(--secondary)] mb-4 [&_svg]:stroke-[var(--secondary)]">
                {icons[icon]}
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-title)' }}>
                {t(`${key}Title`)}
              </h3>
              <p className="text-[var(--gray)] text-sm leading-relaxed">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--gray)] mt-8">
          {t('microText')}
        </p>
      </div>
    </section>
  )
}
