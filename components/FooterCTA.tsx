import { getTranslations } from 'next-intl/server'
import { DeferredLeadForm } from '@/components/DeferredLeadForm'

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
        <p className="mx-auto mb-10 max-w-xl text-white/90">{t('subtitle')}</p>

        <div className="rounded-2xl border border-white/20 bg-white/90 p-6 sm:p-8">
          <DeferredLeadForm />
        </div>
      </div>
    </section>
  )
}
