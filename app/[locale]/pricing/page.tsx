import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { PricingTable } from '@/components/PricingTable'
import { PwaOnlyBlock } from '@/components/PwaOnlyBlock'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/Button'

function safeTranslation(value: string, key: string, fallback: string): string {
  const v = value.trim()
  const looksLikeKey =
    v === key ||
    v.toLowerCase().includes('pwablock') ||
    v.toLowerCase().includes('home.pwa')
  return looksLikeKey ? fallback : value
}

export async function generateMetadata() {
  const t = await getTranslations('pricing')
  return {
    title: `${t('title')} - HŪBIA`,
    description:
      'Due piani: Studio (€900 setup + €89/mese) e Signature (€1.400 setup + €120/mese). Setup una tantum rateizzabile. Gestionale per attività locali.',
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

  const verticalRows = t.raw('verticalPricing.rows') as Array<{ label: string; pro: string; max: string }>

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 bg-background">
        <Section className="bg-transparent pb-16 pt-28">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-semibold text-slate-50 sm:text-5xl">{t('title')}</h1>
            <p className="mb-6 text-lg leading-relaxed text-slate-300 sm:text-xl">{t('subtitle')}</p>
            <PwaOnlyBlock
              className="text-left"
              title={safeTranslation(t('pwaBlock.title'), 'pwaBlock.title', 'Solo PWA, zero app da store')}
              body={safeTranslation(
                t('pwaBlock.body'),
                'pwaBlock.body',
                'App installabile su smartphone (iOS e Android) con logo e colori della tua attività. Un solo software, aggiornamenti inclusi.'
              )}
            />
          </div>

          <PricingTable plans={plans} perMonthLabel={t('perMonth')} setupLabel={t('setupOneTime')} requestDemoLabel={t('requestDemo')} />

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="mb-2 text-slate-300">{t('footer')}</p>
            <p className="mb-10 text-sm text-slate-400">{t('setupIncludes')}</p>
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/12 bg-white/5 p-7 text-center shadow-[0_18px_44px_rgba(2,10,26,0.45)]">
            <h2 className="mb-4 text-2xl font-semibold text-slate-50">{t('setupSectionTitle')}</h2>
            <p className="leading-relaxed text-slate-300">{t('setupSectionBody')}</p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="mb-4 text-center text-2xl font-semibold text-slate-50">{t('verticalPricing.title')}</h2>
            <p className="mb-6 text-center text-sm text-slate-400">{t('verticalPricing.note')}</p>

            <div className="hidden overflow-hidden rounded-2xl border border-white/12 bg-white/5 md:block">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.18em] text-cyan-200">
                <span>{t('verticalPricing.columns.vertical')}</span>
                <span>{t('verticalPricing.columns.pro')}</span>
                <span>{t('verticalPricing.columns.max')}</span>
              </div>
              {verticalRows.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 border-b border-white/5 px-6 py-4 text-sm text-slate-300 last:border-b-0"
                >
                  <span className="font-medium text-slate-100">{row.label}</span>
                  <span>{row.pro}</span>
                  <span>{row.max}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 md:hidden">
              {verticalRows.map((row, index) => (
                <article key={index} className="rounded-2xl border border-white/12 bg-white/5 p-5">
                  <p className="mb-3 text-sm font-semibold text-slate-100">{row.label}</p>
                  <div className="space-y-1 text-sm text-slate-300">
                    <p>
                      <span className="text-cyan-200">{t('verticalPricing.columns.pro')}: </span>
                      {row.pro}
                    </p>
                    <p>
                      <span className="text-cyan-200">{t('verticalPricing.columns.max')}: </span>
                      {row.max}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="faq" className="mx-auto mt-20 max-w-3xl scroll-mt-28">
            <h2 className="mb-8 text-center text-2xl font-semibold text-slate-50">{t('faqTitle')}</h2>
            <FAQAccordion items={faqItems} />
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" className="px-10 py-4 text-lg">
              {t('requestDemo')}
            </Button>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
