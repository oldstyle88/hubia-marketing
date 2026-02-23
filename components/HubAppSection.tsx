import { getTranslations } from 'next-intl/server'

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-[#d4af37]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export async function HubAppSection() {
  const t = await getTranslations('home.hubApp')
  const features = t.raw('features') as string[]

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8" id="hub-app">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            {t('label')}
          </p>
          <h2
            className="mb-6 text-3xl font-bold leading-tight text-[var(--primary)] sm:text-4xl"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-[var(--gray)]">{t('body')}</p>
          <ul className="space-y-3">
            {features.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[var(--text)]">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--gray)]">{t('note')}</p>
        </div>
        <div className="flex justify-center">
          <div
            className="mockup-placeholder flex aspect-[9/19] w-full max-w-[280px] flex-col items-center justify-center rounded-[24px] p-6"
            style={{ background: '#111', border: '1px solid #d4af37' }}
          >
            <span className="text-center text-sm text-[#d4af37]">Hubia App · iOS & Android</span>
          </div>
        </div>
      </div>
    </section>
  )
}
