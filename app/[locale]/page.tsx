import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProblemSection } from '@/components/ProblemSection'
import { ThreeLevelsSection } from '@/components/ThreeLevelsSection'
import { HubAppSection } from '@/components/HubAppSection'
import { TargetSection } from '@/components/TargetSection'
import { SetupSection } from '@/components/SetupSection'
import { PricingSection } from '@/components/PricingSection'
import { SoluzioniDedicateSection } from '@/components/SoluzioniDedicateSection'
import { WhyUsSection } from '@/components/WhyUsSection'
import { FooterCTA } from '@/components/FooterCTA'
import { FooterMinimal } from '@/components/FooterMinimal'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tMeta = await getTranslations('meta')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.hubiasystem.com'
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${baseUrl}/${l}`])
  )

  const title = tMeta('title')
  const description = tMeta('desc')
  const ogLocale = locale === 'it' ? 'it_IT' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'es' ? 'es_ES' : 'fr_FR'

  return {
    title: title || 'HŪBIA',
    description: description || undefined,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/`,
      },
    },
    openGraph: {
      url: `${baseUrl}/${locale}`,
      title: title || 'HŪBIA',
      description: description || undefined,
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'HŪBIA',
      description: description || undefined,
    },
  }
}

export default async function HomePage() {
  await getTranslations('home')

  return (
    <div className="site-shell min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ThreeLevelsSection />
        <HubAppSection />
        <TargetSection />
        <SetupSection />
        <PricingSection />
        <SoluzioniDedicateSection />
        <WhyUsSection />
        <FooterCTA />
      </main>
      <FooterMinimal />
    </div>
  )
}
