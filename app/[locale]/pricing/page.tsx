import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { PricingTable } from '@/components/PricingTable'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/Button'

export async function generateMetadata() {
  const t = await getTranslations('pricing')
  return {
    title: `${t('title')} — HŪBIA`,
    description: t('metaDescription'),
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing')
  const tPlans = await getTranslations('plans')

  const plans = [
    {
      name: tPlans('pro.name'),
      description: tPlans('pro.description'),
      setupFee: t('prices.studio.setup'),
      monthly: t('prices.studio.monthly'),
      features: tPlans.raw('pro.features') as string[],
      highlight: false,
      badge: null,
    },
    {
      name: tPlans('pro2.name'),
      description: tPlans('pro2.description'),
      setupFee: t('prices.pro.setup'),
      monthly: t('prices.pro.monthly'),
      features: tPlans.raw('pro2.features') as string[],
      highlight: true,
      badge: t('mostChosen'),
    },
    {
      name: tPlans('max.name'),
      description: tPlans('max.description'),
      setupFee: t('prices.max.setup'),
      monthly: t('prices.max.monthly'),
      features: tPlans.raw('max.features') as string[],
      highlight: false,
      badge: 'Coach AI',
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

  const verticalRows = t.raw('verticalPricing.rows') as Array<{ label: string; studio: string; pro: string; signature: string }>

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
          </div>

          <PricingTable
            plans={plans}
            perMonthLabel={t('perMonth')}
            setupLabel={t('setupOneTime')}
            requestDemoLabel={t('requestDemo')}
          />

          {/* Nota setup — una riga sola */}
          <div className="mt-10 text-center max-w-2xl mx-auto">
            <p className="text-sm text-[var(--gray)]">
              {t('footer')}
            </p>
            <p className="mt-1 text-xs text-[var(--gray)]/70">
              {t('multiSiteNote')}
            </p>
          </div>

          {/* Comparison table — 3 colonne */}
          <div className="mt-16 max-w-4xl mx-auto" id="confronto">
            <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--primary)]">
              {t('verticalPricing.title')}
            </h2>
            <p className="mb-6 text-center text-sm text-[var(--gray)]">
              {t('verticalPricing.note')}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[var(--line)]/75 bg-white/88 shadow-[0_18px_52px_rgba(16,24,40,0.08)]">
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 border-b border-[var(--line)]/70 px-6 py-4 text-xs uppercase tracking-[0.18em] text-[var(--gray)]">
                <span>{t('verticalPricing.columns.vertical')}</span>
                <span className="text-center">{t('verticalPricing.columns.studio')}</span>
                <span className="text-center">{t('verticalPricing.columns.pro')}</span>
                <span className="text-center">{t('verticalPricing.columns.signature')}</span>
              </div>
              {verticalRows.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2 border-b border-[var(--line)]/50 px-6 py-3 text-sm last:border-b-0 ${
                    index >= verticalRows.length - 2
                      ? 'font-semibold text-[var(--primary)]'
                      : 'text-[var(--text)]'
                  }`}
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="text-center">{row.studio}</span>
                  <span className="text-center">{row.pro}</span>
                  <span className="text-center">{row.signature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="mt-20 max-w-2xl mx-auto scroll-mt-28">
            <h2 className="mb-8 text-center text-2xl font-semibold text-[var(--primary)]">
              {t('faqTitle')}
            </h2>
            <FAQAccordion items={faqItems} />
          </div>

          {/* CTA finale */}
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
