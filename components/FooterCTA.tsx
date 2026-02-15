import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function FooterCTA() {
  const t = await getTranslations('home.ctaFinal')

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8" id="cta">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(184,133,67,0.22) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(16,24,40,0.16) 0%, transparent 42%), linear-gradient(135deg, #151d2d 0%, #1d2433 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl rounded-[28px] border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-title)' }}>
          {t('title')}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/90">{t('subtitle')}</p>

        <div className="mx-auto mb-8 grid max-w-2xl gap-3 text-left text-sm text-white/90 sm:grid-cols-3">
          <p className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Analisi operativa del tuo locale</p>
          <p className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Piano implementazione in 30 giorni</p>
          <p className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">Roadmap di crescita e controllo KPI</p>
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-[var(--primary)] shadow-lg transition hover:bg-white/90"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
