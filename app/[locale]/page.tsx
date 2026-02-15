import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TargetSection } from '@/components/TargetSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { SetupSection } from '@/components/SetupSection'
import { PricingSection } from '@/components/PricingSection'
import { WhyUsSection } from '@/components/WhyUsSection'
import { FooterCTA } from '@/components/FooterCTA'
import { FooterMinimal } from '@/components/FooterMinimal'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage() {
  await getTranslations('home')

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <Hero />
        <TargetSection />
        <BenefitsSection />
        <SetupSection />
        <PricingSection />
        <WhyUsSection />
        <FooterCTA />
      </main>
      <FooterMinimal />
    </div>
  )
}

// Deploy: Rimuovi public/landing.html, aggiorna vercel.json. Test /it vs /en: identici luxury.
