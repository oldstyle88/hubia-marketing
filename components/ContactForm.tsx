'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { Section } from '@/components/Section'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'

function getUtmFromWindow(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
  }
}

const inputClass =
  'w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 placeholder:text-[var(--gray)]'

export function ContactForm() {
  const t = useTranslations('contact')
  const tHero = useTranslations('home.hero')
  const locale = useLocale()
  const pathname = usePathname()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
    website: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) return
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          business: formData.business,
          message: formData.message,
          website: formData.website || undefined,
          locale,
          source_page: pathname || '/contact',
          page_path: pathname || '/contact',
          ...getUtmFromWindow(),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        }),
      })

      const data = await response.json().catch(() => ({ error: 'Server error.' }))

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', business: '', message: '', website: '' })
      } else {
        setSubmitStatus('error')
        setErrorMessage(typeof data.error === 'string' ? data.error : 'Si è verificato un errore. Riprova più tardi.')
      }
    } catch {
      setSubmitStatus('error')
      setErrorMessage('Errore di connessione. Riprova più tardi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const heroBadges = tHero.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(heroBadges) ? heroBadges : []

  return (
    <Section className="bg-[var(--bg)] pt-24 pb-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--primary)] sm:text-5xl">{t('title')}</h1>
        <p className="text-xl leading-relaxed text-[var(--gray)]">{t('subtitle')}</p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-white/92">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--text)]">{t('name')} *</label>
              <input type="text" id="name" name="name" required maxLength={200} value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text)]">{t('email')} *</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--text)]">{t('phone')}</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="business" className="mb-2 block text-sm font-medium text-[var(--text)]">{t('business')} *</label>
              <select id="business" name="business" required value={formData.business} onChange={handleChange} className={inputClass}>
                <option value="">{t('businessPlaceholder')}</option>
                <option value="barber">{t('businessBarber')}</option>
                <option value="medical">{t('businessMedical')}</option>
                <option value="pet">{t('businessPet')}</option>
                <option value="gym">{t('businessGym')}</option>
                <option value="other">{t('businessOther')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--text)]">{t('message')} *</label>
              <textarea id="message" name="message" required rows={6} maxLength={2000} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
            </div>

            {submitStatus === 'success' && <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-700">{t('success')}</div>}
            {submitStatus === 'error' && <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>}

            <Button type="submit" variant="primary" className="w-full">{isSubmitting ? t('sending') : t('send')}</Button>
          </form>
        </Card>

        <div className="space-y-6">
          <div className="card-deep rounded-[24px] border border-[var(--line)] bg-[var(--bg-alt)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">Processo</p>
            <div className="mt-4 space-y-3 text-[var(--text)]">
              <p className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm">1. Call di allineamento operativo</p>
              <p className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm">2. Setup e configurazione guidata</p>
              <p className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm">3. Go-live con supporto dedicato</p>
            </div>
          </div>

          {badgeList.length > 0 && (
            <div className="card rounded-[24px] border border-[var(--line)] bg-white/82 p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">Standard</p>
              <div className="flex flex-wrap gap-2">
                {badgeList.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--line)] bg-white px-3 text-xs font-semibold text-[var(--primary)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
