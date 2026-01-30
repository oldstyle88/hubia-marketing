import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'

export default async function HomePage() {
  const t = await getTranslations('home')

  const forWhoCards = [
    { title: t('forWho.card1Title'), description: t('forWho.card1Desc') },
    { title: t('forWho.card2Title'), description: t('forWho.card2Desc') },
    { title: t('forWho.card3Title'), description: t('forWho.card3Desc') },
  ]

  const benefits = [
    { title: t('benefits.b1Title'), description: t('benefits.b1Desc') },
    { title: t('benefits.b2Title'), description: t('benefits.b2Desc') },
    { title: t('benefits.b3Title'), description: t('benefits.b3Desc') },
    { title: t('benefits.b4Title'), description: t('benefits.b4Desc') },
  ]

  const steps = [
    { title: t('howItWorks.step1Title'), description: t('howItWorks.step1Desc') },
    { title: t('howItWorks.step2Title'), description: t('howItWorks.step2Desc') },
    { title: t('howItWorks.step3Title'), description: t('howItWorks.step3Desc') },
  ]

  const studioIncludes = t.raw('plansHome.studioIncludes') as string[]
  const signatureIncludes = t.raw('plansHome.signatureIncludes') as string[]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-background">
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          ctaDemo={t('hero.ctaPrimary')}
          ctaPrices={t('hero.ctaSecondary')}
        />

        <Section id="product" className="bg-background pt-8 pb-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('forWho.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('forWho.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <p className="text-center text-secondary mt-8 text-sm">
            {t('forWho.microText')}
          </p>
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((item, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="come-funziona" className="bg-background">
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
          <p className="text-center text-secondary mt-8 text-sm">
            {t('howItWorks.setupNote')}
          </p>
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('plansHome.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('plansHome.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {t('plansHome.studioName')}
              </h3>
              <p className="text-secondary text-sm mb-6">
                {t('plansHome.studioForWho')}
              </p>
              <ul className="list-disc pl-5 text-secondary text-sm space-y-2 mb-6">
                {studioIncludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-primary font-semibold mt-4">
                {t('plansHome.studioSetup')}
                <span className="text-secondary font-normal text-sm block">
                  ({t('plansHome.studioSetupNote')})
                </span>
              </p>
              <p className="text-primary font-semibold">
                {t('plansHome.studioCanone')}
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {t('plansHome.signatureName')}
              </h3>
              <p className="text-secondary text-sm mb-6">
                {t('plansHome.signatureForWho')}
              </p>
              <ul className="list-disc pl-5 text-secondary text-sm space-y-2 mb-6">
                {signatureIncludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-primary font-semibold mt-4">
                {t('plansHome.signatureSetup')}
                <span className="text-secondary font-normal text-sm block">
                  ({t('plansHome.signatureSetupNote')})
                </span>
              </p>
              <p className="text-primary font-semibold">
                {t('plansHome.signatureCanone')}
              </p>
            </Card>
          </div>
        </Section>

        <Section className="bg-background">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-primary mb-4">
              {t('projectsCustom.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('projectsCustom.text')}
            </p>
          </div>
        </Section>

        <Section className="bg-surface/70">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-semibold text-primary mb-4">
              {t('notAnyApp.title')}
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {t('notAnyApp.subtitle')}
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4 text-secondary mb-8">
            <p>• {t('notAnyApp.point1')}</p>
            <p>• {t('notAnyApp.point2')}</p>
            <p>• {t('notAnyApp.point3')}</p>
          </div>
          {(t.raw('notAnyApp.positioning') as string[] | undefined)?.length ? (
            <div className="max-w-2xl mx-auto space-y-4 text-center text-secondary">
              {(t.raw('notAnyApp.positioning') as string[]).map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-center text-primary font-semibold text-lg">
              {t('notAnyApp.closing')}
            </p>
          )}
        </Section>

        <Section className="bg-background">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold text-primary mb-4">
              {t('ctaFinal.title')}
            </h2>
            <p className="text-xl text-secondary mb-8">
              {t('ctaFinal.subtitle')}
            </p>
            <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
              {t('ctaFinal.cta')}
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
