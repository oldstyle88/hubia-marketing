'use client'

import { useTranslations } from 'next-intl'

const pillars = [
  { icon: 'no-market', pointKey: 'point1' },
  { icon: 'custom', pointKey: 'point2' },
  { icon: 'experience', pointKey: 'point3' },
  { icon: 'selettivo', closingKey: 'closing' },
]

const iconSvg: Record<string, JSX.Element> = {
  'no-market': (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  custom: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  experience: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  selettivo: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
}

export function WhyUsSection() {
  const t = useTranslations('home.notAnyApp')

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-alt)]" id="why-us">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-[var(--primary)] text-center mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[var(--secondary)] font-medium text-center mb-14">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map(({ icon, pointKey, closingKey }) => (
            <div
              key={icon}
              className="card rounded-[20px] p-8 bg-[var(--bg)] border border-[var(--gray)]/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-[var(--secondary)] mb-4 [&_svg]:stroke-[var(--secondary)]">
                {iconSvg[icon]}
              </div>
              <p className="text-[var(--text)] leading-relaxed">
                {pointKey ? t(pointKey) : closingKey ? t(closingKey) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
