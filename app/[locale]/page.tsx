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

export default async function HomePage() {
  const t = await getTranslations('home')

  const offerCards = [
    { title: t('offer.clientPwa'), description: t('offer.clientPwaDesc') },
    { title: t('offer.staffDashboard'), description: t('offer.staffDashboardDesc') },
    { title: t('offer.analytics'), description: t('offer.analyticsDesc') },
  ]

  const forWhoCards = [
    { title: t('forWho.beauty'), description: t('forWho.beautyDesc') },
    { title: t('forWho.food'), description: t('forWho.foodDesc') },
  ]

  const features = [
    { title: t('features.booking'), description: t('features.bookingDesc') },
    { title: t('features.orders'), description: t('features.ordersDesc') },
    { title: t('features.notifications'), description: t('features.notificationsDesc') },
    { title: t('features.branding'), description: t('features.brandingDesc') },
  ]

  const steps = [
    { title: t('howItWorks.setup'), description: t('howItWorks.setupDesc') },
    { title: t('howItWorks.config'), description: t('howItWorks.configDesc') },
    { title: t('howItWorks.golive'), description: t('howItWorks.goliveDesc') },
  ]

  const faqs = []
  for (let i = 1; i <= 12; i++) {
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
        />

        <Section id="product" className="bg-background pt-8 pb-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('offer.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('offer.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <PwaOnlyBlock title={t('offer.pwaBlock.title')} body={t('offer.pwaBlock.body')} />
            <div className="grid grid-cols-1 gap-4">
              {offerCards.map((card, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-1">{card.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('forWho.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('forWho.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {forWhoCards.map((item, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
          <p className="text-center text-secondary mt-6 text-sm">
            {t('forWho.advancedNote')}
          </p>
        </Section>

        <Section className="bg-background">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <FeatureGrid features={features} columns={2} />
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-12">
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
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('pricingTeaser.title')}
            </h2>
            <p className="text-xl text-secondary mb-8">
              {t('pricingTeaser.subtitle')}
            </p>
            <Button href="/pricing" variant="primary" className="text-lg px-10 py-5">
              {t('pricingTeaser.cta')}
            </Button>
          </div>
        </Section>

        <Section id="faq" className="bg-surface/70">
          <div className="text-center mb-12">
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
