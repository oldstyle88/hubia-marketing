import { getTranslations, getLocale } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'

const localeToDateLocale: Record<string, string> = {
  it: 'it-IT',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
}

const LEGAL_ADDRESS = process.env.NEXT_PUBLIC_LEGAL_ADDRESS || '—'

export async function generateMetadata() {
  const t = await getTranslations('privacy')
  return {
    title: `${t('title')} — HŪBIA`,
    description: t('metaDescription'),
  }
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')
  const locale = await getLocale()
  const dateLocale = localeToDateLocale[locale] || 'it-IT'

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />

      <main className="flex-1 bg-[var(--bg)]">
        <Section className="pt-32 pb-16 bg-[var(--bg)]">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-[var(--line)]/80 bg-white/82 p-8 shadow-[0_24px_70px_rgba(16,24,40,0.09)] sm:p-12">
            <h1 className="mb-8 text-4xl font-semibold text-[var(--primary)] sm:text-5xl">
              {t('title')}
            </h1>

            <p className="mb-6 text-[var(--text)]">
              <strong>{t('lastUpdate')}:</strong>{' '}
              {new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-8 text-[var(--text)] leading-relaxed">
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p1Title')}</h2>
                <p>{t('p1Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p2Title')}</h2>
                <p className="mb-3">{t('p2Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('p2Li1')}</li>
                  <li>{t('p2Li2')}</li>
                  <li>{t('p2Li3')}</li>
                  <li>{t('p2Li4')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p3Title')}</h2>
                <p className="mb-3">{t('p3Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('p3Li1')}</li>
                  <li>{t('p3Li2')}</li>
                  <li>{t('p3Li3')}</li>
                  <li>{t('p3Li4')}</li>
                  <li>{t('p3Li5')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p4Title')}</h2>
                <p>{t('p4Intro')}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t('p4Li1')}</li>
                  <li>{t('p4Li2')}</li>
                  <li>{t('p4Li3')}</li>
                  <li>{t('p4Li4')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p5Title')}</h2>
                <p>{t('p5Intro')}</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>{t('p5Li1')}</li>
                  <li>{t('p5Li2')}</li>
                  <li>{t('p5Li3')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p6Title')}</h2>
                <p>{t('p6Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p7Title')}</h2>
                <p className="mb-3">{t('p7Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('p7Li1')}</li>
                  <li>{t('p7Li2')}</li>
                  <li>{t('p7Li3')}</li>
                  <li>{t('p7Li4')}</li>
                  <li>{t('p7Li5')}</li>
                  <li>{t('p7Li6')}</li>
                  <li>{t('p7Li7')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p8Title')}</h2>
                <p>{t('p8Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p9Title')}</h2>
                <p>{t('p9Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p10Title')}</h2>
                <p>{t('p10Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('p11Title')}</h2>
                <p>{t('p11Body')}</p>
                <p className="mt-3">
                  <strong>{t('p11EmailLabel')}</strong> privacy@hubia.com<br />
                  <strong>{t('p11AddressLabel')}</strong> {LEGAL_ADDRESS}
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
