import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { PricingTable } from '@/components/PricingTable'
import { PwaOnlyBlock } from '@/components/PwaOnlyBlock'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/Button'

export async function generateMetadata() {
  const t = await getTranslations('pricing')
  return {
    title: `${t('title')} — HŪBIA`,
    description: 'PRO e MAX. Setup una tantum e canone mensile. PWA-only, no app nativa.',
  }
}

export default async function PricingPage() {
  const t = await getTranslations('pricing')
  const tPlans = await getTranslations('plans')
  const tHome = await getTranslations('home')

  const plans = [
    {
      name: tPlans('pro.name'),
      description: tPlans('pro.description'),
      setupFee: 499,
      monthly: 149,
      features: tPlans.raw('pro.features') as string[],
      highlight: true,
      badge: t('mostChosen'),
    },
    {
      name: tPlans('max.name'),
      description: tPlans('max.description'),
      setupFee: 799,
      monthly: 249,
      features: tPlans.raw('max.features') as string[],
      highlight: false,
      badge: null,
    },
  ]

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Section className="pt-28 pb-16 bg-background-alt">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold text-primary mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-secondary leading-relaxed mb-6">
              {t('subtitle')}
            </p>
            <PwaOnlyBlock className="text-left" title={tHome('pwaBlock.title')} body={tHome('pwaBlock.body')} />
          </div>

          <PricingTable
            plans={plans}
            perMonthLabel={t('perMonth')}
            setupLabel={t('setupOneTime')}
            requestDemoLabel={t('requestDemo')}
          />

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-secondary mb-2">
              {t('footer')}
            </p>
            <p className="text-secondary/80 text-sm mb-10">
              {t('setupIncludes')}
            </p>
          </div>

          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary mb-8 text-center">
              {t('faqTitle')}
            </h2>
            <FAQAccordion items={faqItems} />
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
              {t('requestDemo')}
            </Button>
            <p className="mt-4 text-secondary text-sm">
              <Link href="/contact" className="text-accent-violet-soft hover:text-accent-blue transition-colors">
                {t('contactCta')}
              </Link>
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
