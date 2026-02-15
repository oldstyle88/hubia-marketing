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

export async function generateMetadata() {
  const tHome = await getTranslations('home')
  const tMeta = await getTranslations('meta')
  return {
    title: `${tHome('hero.title')} — HŪBIA`,
    description: tMeta('desc'),
  }
}

// A/B: set to 'B' for variant B (CTA "Inizia gratis trial" + green). Deploy & A/B test variant su Vercel.
const CTA_VARIANT = (process.env.NEXT_PUBLIC_CTA_VARIANT as 'A' | 'B') || 'A'

export default async function HomePage() {
  await getTranslations('home')

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <Hero variant={CTA_VARIANT} />
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

// 10/10: Logo prominent, UX addictive. Deploy & A/B test variant su Vercel.
