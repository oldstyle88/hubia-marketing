'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

const locales: { code: 'it' | 'en' | 'de' | 'es' | 'fr'; label: string; flag: string }[] = [
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
]

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function LanguageSwitcher() {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLElement>(null)

  const current = locales.find((l) => l.code === locale) ?? locales[0]

  useEffect(() => {
    if (!open || !dropdownRef.current) return
    const first = dropdownRef.current.querySelector<HTMLAnchorElement>('a')
    first?.focus()
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 text-[var(--text)] shadow-sm transition hover:border-[var(--secondary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50"
      >
        <GlobeIcon className="h-5 w-5 shrink-0" />
        <span className="text-sm font-semibold">{current.code.toUpperCase()}</span>
        <svg className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <nav
          ref={dropdownRef}
          aria-label={t('chooseLanguage')}
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] rounded-xl border border-[var(--line)] bg-white p-1.5 shadow-2xl"
        >
          <ul className="space-y-0.5" role="list">
            {locales.map((loc) => {
              const isActive = loc.code === locale
              return (
                <li key={loc.code} role="listitem">
                  <Link
                    href={pathname || '/'}
                    locale={loc.code}
                    onClick={() => setOpen(false)}
                    className={`mx-1 flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 focus:ring-inset ${
                      isActive
                        ? 'bg-[var(--bg-alt)] font-semibold text-[var(--primary)]'
                        : 'text-[var(--text)] hover:bg-[var(--bg-alt)]/70'
                    }`}
                  >
                    <span className="text-base leading-none" aria-hidden>{loc.flag}</span>
                    <span>{loc.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}
