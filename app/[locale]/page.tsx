import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { FeatureGrid } from '@/components/FeatureGrid'
import { FAQAccordion } from '@/components/FAQAccordion'
import { PwaOnlyBlock } from '@/components/PwaOnlyBlock'
import { ReliabilitySection } from '@/components/ReliabilitySection'
import { PricingTable } from '@/components/PricingTable'

export default async function HomePage() {
  const t = await getTranslations('home')
  const tPlans = await getTranslations('plans')
  const tPricing = await getTranslations('pricing')

  const proofCards = [
    { title: t('proof.clientPwa'), description: t('proof.clientPwaDesc'), placeholder: true },
    { title: t('proof.staffDashboard'), description: t('proof.staffDashboardDesc'), placeholder: true },
    { title: t('proof.analytics'), description: t('proof.analyticsDesc'), placeholder: true },
  ]

  const targetAudience = [
    { title: t('forWho.barber'), description: t('forWho.barberDesc') },
    { title: t('forWho.pizzeria'), description: t('forWho.pizzeriaDesc') },
    { title: t('forWho.gym'), description: t('forWho.gymDesc') },
    { title: t('forWho.food'), description: t('forWho.foodDesc') },
  ]

  const features = [
    { title: t('features.booking'), description: t('features.bookingDesc') },
    { title: t('features.orders'), description: t('features.ordersDesc') },
    { title: t('features.staffPanel'), description: t('features.staffPanelDesc') },
    { title: t('features.notifications'), description: t('features.notificationsDesc') },
    { title: t('features.branding'), description: t('features.brandingDesc') },
    { title: t('features.analytics'), description: t('features.analyticsDesc') },
  ]

  const steps = [
    { title: t('howItWorks.setup'), description: t('howItWorks.setupDesc') },
    { title: t('howItWorks.config'), description: t('howItWorks.configDesc') },
    { title: t('howItWorks.golive'), description: t('howItWorks.goliveDesc') },
  ]

  const faqs = []
  for (let i = 1; i <= 10; i++) {
    faqs.push({
      question: t(`faqItems.q${i}`),
      answer: t(`faqItems.a${i}`),
    })
  }

  const reliabilityBullets = [
    { title: t('reliability.b1title'), desc: t('reliability.b1desc') },
    { title: t('reliability.b2title'), desc: t('reliability.b2desc') },
    { title: t('reliability.b3title'), desc: t('reliability.b3desc') },
    { title: t('reliability.b4title'), desc: t('reliability.b4desc') },
    { title: t('reliability.b5title'), desc: t('reliability.b5desc') },
    { title: t('reliability.b6title'), desc: t('reliability.b6desc') },
  ]

  const plans = [
    {
      name: tPlans('pro.name'),
      description: tPlans('pro.description'),
      setupFee: tPricing('prices.pro.setup'),
      monthly: tPricing('prices.pro.monthly'),
      features: tPlans.raw('pro.features') as string[],
      highlight: true,
      badge: tPricing('mostChosen'),
    },
    {
      name: tPlans('max.name'),
      description: tPlans('max.description'),
      setupFee: tPricing('prices.max.setup'),
      monthly: tPricing('prices.max.monthly'),
      features: tPlans.raw('max.features') as string[],
      highlight: false,
      badge: null,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-background">
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          ctaDemo={t('hero.requestDemo')}
          ctaPrices={t('hero.viewPrices')}
          proofCards={proofCards}
        />

        <Section className="bg-background pt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <PwaOnlyBlock title={t('pwaBlock.title')} body={t('pwaBlock.body')} />
            <div className="grid grid-cols-1 gap-4">
              {proofCards.map((card, index) => (
                <Card key={index} className="p-6"><h3 className="text-lg font-semibold text-primary mb-1">{card.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section id="product" className="bg-background">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('forWho.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('forWho.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetAudience.map((item, index) => (
              <Card key={index}>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <FeatureGrid features={features} columns={3} />
        </Section>

        <Section className="bg-background">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center glass-card rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent text-2xl font-semibold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <ReliabilitySection
          title={t('reliability.title')}
          subtitle={t('reliability.subtitle')}
          bullets={reliabilityBullets}
        />

        <Section className="bg-background">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('pricingTeaser.title')}
            </h2>
            <p className="text-xl text-secondary mb-4">
              {t('pricingTeaser.subtitle')}
            </p>
            <Button href="/pricing" variant="primary" className="text-lg px-10 py-5">
              {t('pricingTeaser.cta')}
            </Button>
          </div>
          <PricingTable
            plans={plans}
            perMonthLabel={tPricing('perMonth')}
            setupLabel={tPricing('setupOneTime')}
            requestDemoLabel={tPricing('requestDemo')}
          />
        </Section>

        <Section id="faq" className="bg-surface/70">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={faqs} />
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
