import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { PricingTable } from '@/components/PricingTable'
import { PwaOnlyBlock } from '@/components/PwaOnlyBlock'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/Button'

/** Evita di mostrare chiavi i18n in UI: se il valore sembra una chiave non risolta (es. home.pwaBlock.title), usa il fallback (sempre, anche in prod). */
function safeTranslation(value: string, key: string, fallback: string): string {
  const v = value.trim()
  const looksLikeKey =
    v === key ||
    v.toLowerCase().includes('pwablock') ||
    v.toLowerCase().includes('home.pwa')
  if (looksLikeKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Chiave non risolta su pricing: "${key}" (valore: "${value}") → mostrato fallback. Verificare messages/*.json.`)
    }
    return fallback
  }
  return value
}

export async function generateMetadata() {
  const t = await getTranslations('pricing')
  return {
    title: `${t('title')} — HŪBIA`,
    description: 'Due piani: Studio (€900 setup + €89/mese) e Signature (€1.400 setup + €120/mese). Setup una tantum rateizzabile. Gestionale per attività locali.',
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing')
  const tPlans = await getTranslations('plans')

  const plans = [
    {
      name: tPlans('pro.name'),
      description: tPlans('pro.description'),
      setupFee: t('prices.pro.setup'),
      monthly: t('prices.pro.monthly'),
      features: tPlans.raw('pro.features') as string[],
      highlight: true,
      badge: null,
    },
    {
      name: tPlans('max.name'),
      description: tPlans('max.description'),
      setupFee: t('prices.max.setup'),
      monthly: t('prices.max.monthly'),
      features: tPlans.raw('max.features') as string[],
      highlight: false,
      badge: null,
    },
  ]

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />

      <main className="flex-1 bg-[var(--bg)]">
        <Section className="relative overflow-hidden pt-28 pb-16 bg-[var(--bg-alt)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-8 h-64 w-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(184,133,67,0.16) 0%, rgba(184,133,67,0) 68%)' }}
          />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="mb-6 text-4xl font-semibold text-[var(--primary)] sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text)] sm:text-xl">
              {t('subtitle')}
            </p>
            <PwaOnlyBlock
              className="text-left"
              title={safeTranslation(t('pwaBlock.title'), 'pwaBlock.title', 'Solo PWA, zero app da store')}
              body={safeTranslation(t('pwaBlock.body'), 'pwaBlock.body', 'App installabile su smartphone (iOS e Android) con logo e colori della tua attività. Un solo software, aggiornamenti inclusi.')}
            />
          </div>

          <PricingTable
            plans={plans}
            perMonthLabel={t('perMonth')}
            setupLabel={t('setupOneTime')}
            requestDemoLabel={t('requestDemo')}
          />

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="mb-2 text-[var(--text)]">
              {t('footer')}
            </p>
            <p className="mb-2 text-sm text-[var(--gray)]">
              {t('setupIncludes')}
            </p>
            <p className="mb-10 text-sm font-medium text-[var(--primary)]">
              {t('multiSiteNote')}
            </p>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--primary)]">
              {t('setupSectionTitle')}
            </h2>
            <p className="text-center leading-relaxed text-[var(--text)]">
              {t('setupSectionBody')}
            </p>
          </div>


          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--primary)]">
              {t('verticalPricing.title')}
            </h2>
            <p className="mb-6 text-center text-sm text-[var(--gray)]">
              {t('verticalPricing.note')}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[var(--line)]/75 bg-white/88 shadow-[0_18px_52px_rgba(16,24,40,0.08)]">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-[var(--line)]/70 px-6 py-4 text-xs uppercase tracking-[0.18em] text-[var(--gray)]">
                <span>{t('verticalPricing.columns.vertical')}</span>
                <span>{t('verticalPricing.columns.pro')}</span>
                <span>{t('verticalPricing.columns.max')}</span>
              </div>
              {(t.raw('verticalPricing.rows') as Array<any>).map((row, index) => (
                <div key={index} className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-[var(--line)]/50 px-6 py-4 text-sm text-[var(--text)] last:border-b-0">
                  <span className="font-medium text-[var(--primary)]">{row.label}</span>
                  <span>{row.pro}</span>
                  <span>{row.max}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="faq" className="mt-20 max-w-2xl mx-auto scroll-mt-28">
            <h2 className="mb-8 text-center text-2xl font-semibold text-[var(--primary)]">
              {t('faqTitle')}
            </h2>
            <FAQAccordion items={faqItems} />
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
              {t('requestDemo')}
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
