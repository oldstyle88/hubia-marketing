'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'

const BUSINESS_OPTIONS = [
  { value: 'barber', labelKey: 'businessBarber' },
  { value: 'medical', labelKey: 'businessMedical' },
  { value: 'pet', labelKey: 'businessPet' },
  { value: 'gym', labelKey: 'businessGym' },
  { value: 'other', labelKey: 'businessOther' },
] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LeadFormProps {
  onSuccess?: () => void
  className?: string
  compact?: boolean
}

function validate(
  name: string,
  email: string,
  business: string,
  message: string,
  compact: boolean
): string | null {
  if (!name.trim()) return 'Nome obbligatorio.'
  if (!email.trim()) return 'Email obbligatoria.'
  if (!EMAIL_REGEX.test(email)) return 'Indirizzo email non valido.'
  if (!compact && !business.trim()) return 'Tipo attività obbligatorio.'
  if (!compact && !message.trim()) return 'Messaggio obbligatorio.'
  return null
}

export function LeadForm({ onSuccess, className = '', compact = false }: LeadFormProps) {
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
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)

  const getUtm = () => {
    if (typeof window === 'undefined') return {}
    const p = new URLSearchParams(window.location.search)
    return {
      utm_source: p.get('utm_source') ?? undefined,
      utm_medium: p.get('utm_medium') ?? undefined,
      utm_campaign: p.get('utm_campaign') ?? undefined,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) return
    const validationError = validate(formData.name, formData.email, formData.business, formData.message, compact)
    if (validationError) {
      setFieldError(validationError)
      setStatus('error')
      setErrorMessage(validationError)
      return
    }
    setFieldError(null)
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          business: formData.business,
          message: formData.message,
          locale,
          source_page: pathname || '/',
          page_path: pathname || '/',
          ...getUtm(),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', business: '', message: '', website: '' })
        onSuccess?.()
      } else {
        setStatus('error')
        setErrorMessage(typeof data.error === 'string' ? data.error : 'Errore. Riprova.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Errore di connessione. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 border border-[var(--gray)]/40 bg-[var(--bg)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 placeholder:text-[var(--gray)]'

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="hidden" aria-hidden>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-[var(--text)] mb-1">
          {t('name')} *
        </label>
        <input
          type="text"
          id="lead-name"
          name="name"
          required
          className={inputClass}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-[var(--text)] mb-1">
          {t('email')} *
        </label>
        <input
          type="email"
          id="lead-email"
          name="email"
          required
          className={inputClass}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      {!compact && (
        <>
          <div>
            <label htmlFor="lead-phone" className="block text-sm font-medium text-[var(--text)] mb-1">
              {t('phone')}
            </label>
            <input
              type="tel"
              id="lead-phone"
              name="phone"
              className={inputClass}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="lead-business" className="block text-sm font-medium text-[var(--text)] mb-1">
              {t('business')} *
            </label>
            <select
              id="lead-business"
              name="business"
              required
              className={inputClass}
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
            >
              <option value="">{t('businessPlaceholder')}</option>
              {BUSINESS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lead-message" className="block text-sm font-medium text-[var(--text)] mb-1">
              {t('message')} *
            </label>
            <textarea
              id="lead-message"
              name="message"
              required
              rows={4}
              className={inputClass}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
        </>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-600" role="status">
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 font-medium py-2 px-3 rounded-lg bg-red-50 border border-red-200" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl font-medium text-[var(--primary)] bg-[var(--secondary)] hover:opacity-95 transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? t('sending') : t('send')}
      </button>
    </form>
  )
}
