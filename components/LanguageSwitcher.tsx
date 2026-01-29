'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

const locales: { code: 'it' | 'en' | 'de' | 'es' | 'fr'; label: string; flag: string }[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
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
        aria-label={t('chooseLanguage')}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-strong bg-surface/80 hover:bg-surface hover:border-white/15 text-secondary hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:ring-offset-2 focus:ring-offset-background"
      >
        <GlobeIcon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium hidden sm:inline">{current.code.toUpperCase()}</span>
        <svg className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <nav
          ref={dropdownRef}
          aria-label={t('chooseLanguage')}
          className="absolute right-0 top-full mt-2 min-w-[180px] py-2 rounded-xl border border-border-strong bg-surface-elevated shadow-xl shadow-black/20 z-50"
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
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-accent-violet/50 focus:ring-inset rounded-lg mx-1 ${
                        isActive
                          ? 'text-accent-violet-soft bg-accent-violet/10'
                          : 'text-secondary hover:text-primary hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg leading-none" aria-hidden>{loc.flag}</span>
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
