import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import {
  BenefitsSection,
  PricingSection,
  PlaceholderDemo,
  CTASection,
} from '@/components/landing'

export default async function HomePage() {
  const t = await getTranslations('home')
  const tPlans = await getTranslations('home.plansHome')

  const benefits = [
    { iconKey: 'calendar' as const, title: t('benefits.b1Title'), description: t('benefits.b1Desc') },
    { iconKey: 'users' as const, title: t('benefits.b2Title'), description: t('benefits.b2Desc') },
    { iconKey: 'refresh' as const, title: t('benefits.b3Title'), description: t('benefits.b3Desc') },
    { iconKey: 'chart' as const, title: t('benefits.b4Title'), description: t('benefits.b4Desc') },
  ]

  const studioIncludes = tPlans.raw('studioIncludes') as string[]
  const signatureIncludes = tPlans.raw('signatureIncludes') as string[]
  const customIncludes = tPlans.raw('customIncludes') as string[]

  const plans = [
    {
      name: tPlans('studioName'),
      description: tPlans('studioForWho'),
      setup: tPlans('studioSetup'),
      setupNote: tPlans('studioSetupNote'),
      monthly: tPlans('studioCanone'),
      features: studioIncludes,
      cta: t('ctaFinal.cta'),
      featured: false,
    },
    {
      name: tPlans('signatureName'),
      description: tPlans('signatureForWho'),
      setup: tPlans('signatureSetup'),
      setupNote: tPlans('signatureSetupNote'),
      monthly: tPlans('signatureCanone'),
      features: signatureIncludes,
      cta: t('ctaFinal.cta'),
      featured: true,
    },
    {
      name: tPlans('customName'),
      description: tPlans('customForWho'),
      setup: tPlans('customSetup'),
      monthly: tPlans('customMonthly'),
      features: customIncludes,
      cta: t('ctaFinal.cta'),
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero forte */}
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          ctaDemo={t('hero.ctaPrimary')}
          ctaPrices={t('hero.ctaSecondary')}
        />

        {/* Benefici: 4 card con icone */}
        <BenefitsSection
          title={t('benefits.title')}
          subtitle={t('benefits.subtitle')}
          benefits={benefits}
        />

        {/* Come funziona: breve (id per link secondario) */}
        <section id="come-funziona" className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-secondary mb-8">{t('howItWorks.subtitle')}</p>
            <p className="text-secondary text-sm">{t('howItWorks.setupNote')}</p>
          </div>
        </section>

        {/* Piani prezzi: Studio, Signature, Custom */}
        <PricingSection
          title={t('plansHome.title')}
          subtitle={t('plansHome.subtitle')}
          plans={plans}
        />

        {/* Placeholder demo/testimonianze */}
        <PlaceholderDemo />

        {/* CTA finale */}
        <CTASection
          title={t('ctaFinal.title')}
          subtitle={t('ctaFinal.subtitle')}
          ctaText={t('ctaFinal.cta')}
        />
      </main>
      <Footer />
    </div>
  )
}
