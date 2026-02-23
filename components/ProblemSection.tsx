import { getTranslations } from 'next-intl/server'

export async function ProblemSection() {
  const t = await getTranslations('home.problem')

  return (
    <section className="bg-[var(--bg-alt)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2
          className="mb-8 text-center text-3xl font-bold text-[var(--primary)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <div className="space-y-6 text-[var(--gray)]">
          <p className="text-base leading-relaxed">{t('p1')}</p>
          <p className="text-base leading-relaxed">{t('p2')}</p>
          <p className="text-base font-medium leading-relaxed text-[var(--text)]">{t('p3')}</p>
        </div>
        <p className="mt-12 text-center text-sm uppercase tracking-widest text-[var(--gray)]">
          {t('transition')}
        </p>
      </div>
    </section>
  )
}
