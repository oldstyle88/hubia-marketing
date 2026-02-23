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
            'radial-gradient(circle at 20% 20%, rgba(116,196,244,0.26) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(3,41,81,0.35) 0%, transparent 42%), linear-gradient(135deg, #04182f 0%, #0b315e 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl rounded-[28px] border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10">
        <h2
          className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-white/90">{t('subtitle')}</p>

        <Link
          href="/contact"
          className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#d4af37] px-10 font-semibold text-[#0a0a0a] shadow-lg transition hover:brightness-110"
        >
          {t('cta')}
        </Link>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">
          <span>{t('reassurance1')}</span>
          <span aria-hidden>·</span>
          <span>{t('reassurance2')}</span>
          <span aria-hidden>·</span>
          <span>{t('reassurance3')}</span>
        </p>
      </div>
    </section>
  )
}
