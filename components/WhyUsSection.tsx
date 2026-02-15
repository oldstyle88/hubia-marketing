import { getTranslations } from 'next-intl/server'

const pillars = [
  { icon: 'no-market', pointKey: 'point1' },
  { icon: 'custom', pointKey: 'point2' },
  { icon: 'experience', pointKey: 'point3' },
  { icon: 'selettivo', closingKey: 'closing' },
]

const iconSvg = {
  'no-market': (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  custom: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  experience: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  selettivo: (
    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
}

export async function WhyUsSection() {
  const t = await getTranslations('home.notAnyApp')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="why-us">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mb-14 text-center font-medium text-[var(--secondary)]">{t('subtitle')}</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map(({ icon, pointKey, closingKey }) => (
            <div key={icon} className="card reveal-up rounded-[20px] bg-white/72 p-8 transition duration-300 hover:-translate-y-1">
              <div className="mb-4 text-[var(--secondary)] [&_svg]:stroke-[var(--secondary)]">{iconSvg[icon as keyof typeof iconSvg]}</div>
              <p className="leading-relaxed text-[var(--text)]">{pointKey ? t(pointKey) : closingKey ? t(closingKey) : null}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
