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
  'w-full px-4 py-3 border border-border-strong bg-surface text-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:border-transparent placeholder:text-secondary/60'

export function ContactForm() {
  const t = useTranslations('contact')
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
    } catch (_error) {
      setSubmitStatus('error')
      setErrorMessage('Errore di connessione. Riprova più tardi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Section className="pt-28 pb-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-semibold text-primary mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-secondary leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
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
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                {t('name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={200}
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                {t('email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-primary mb-2">
                {t('business')} *
              </label>
              <select
                id="business"
                name="business"
                required
                value={formData.business}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">{t('businessPlaceholder')}</option>
                <option value="barber">{t('businessBarber')}</option>
                <option value="hair-salon">{t('businessHairSalon')}</option>
                <option value="beauty-center">{t('businessBeauty')}</option>
                <option value="other">{t('businessOther')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                {t('message')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                maxLength={2000}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                {t('success')}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full">
              {isSubmitting ? t('sending') : t('send')}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  )
}
