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
  const t = await getTranslations('terms')
  return {
    title: `${t('title')} — HŪBIA`,
    description: t('metaDescription'),
  }
}

export default async function TermsPage() {
  const t = await getTranslations('terms')
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
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s1Title')}</h2>
                <p>{t('s1Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s2Title')}</h2>
                <p>{t('s2Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s3Title')}</h2>
                <p className="mb-3">{t('s3Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('s3Li1')}</li>
                  <li>{t('s3Li2')}</li>
                  <li>{t('s3Li3')}</li>
                  <li>{t('s3Li4')}</li>
                  <li>{t('s3Li5')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s4Title')}</h2>
                <p className="mb-3">{t('s4Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('s4Li1')}</li>
                  <li>{t('s4Li2')}</li>
                  <li>{t('s4Li3')}</li>
                  <li>{t('s4Li4')}</li>
                  <li>{t('s4Li5')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s5Title')}</h2>
                <p className="mb-3">{t('s5Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('s5Li1')}</li>
                  <li>{t('s5Li2')}</li>
                  <li>{t('s5Li3')}</li>
                  <li>{t('s5Li4')}</li>
                  <li>{t('s5Li5')}</li>
                  <li>{t('s5Li6')}</li>
                  <li>{t('s5Li7')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s6Title')}</h2>
                <p>{t('s6Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s7Title')}</h2>
                <p>{t('s7Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s8Title')}</h2>
                <p>{t('s8Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s9Title')}</h2>
                <p className="mb-3">{t('s9Intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('s9Li1')}</li>
                  <li>{t('s9Li2')}</li>
                  <li>{t('s9Li3')}</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s10Title')}</h2>
                <p>{t('s10Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s11Title')}</h2>
                <p>{t('s11Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s12Title')}</h2>
                <p>{t('s12Body')}</p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-[var(--primary)]">{t('s13Title')}</h2>
                <p>{t('s13Body')}</p>
                <p className="mt-3">
                  <strong>{t('s13EmailLabel')}</strong> legal@hubia.com<br />
                  <strong>{t('s13AddressLabel')}</strong> {LEGAL_ADDRESS}
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
