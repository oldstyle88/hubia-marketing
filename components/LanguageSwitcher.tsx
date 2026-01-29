'use client'

import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const locales = [
  { code: 'it' as const, label: 'IT' },
  { code: 'en' as const, label: 'EN' },
  { code: 'de' as const, label: 'DE' },
  { code: 'es' as const, label: 'ES' },
  { code: 'fr' as const, label: 'FR' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1" aria-label="Scegli lingua">
      {locales.map(({ code, label }) =>
        code === locale ? (
          <span
            key={code}
            className="px-2 py-1 text-xs font-medium text-primary rounded bg-accent-violet/20 text-accent-violet-soft border border-accent-violet/30"
            aria-current="true"
          >
            {label}
          </span>
        ) : (
          <Link
            key={code}
            href={pathname || '/'}
            locale={code}
            className="px-2 py-1 text-xs text-secondary hover:text-primary rounded hover:bg-white/5 transition-colors"
          >
            {label}
          </Link>
        )
      )}
    </nav>
  )
}
