'use client'

import { useLocale } from 'next-intl'
import { useEffect } from 'react'

/**
 * Sets document.documentElement.lang to the current locale for a11y and SEO.
 * Root layout uses lang="it" by default; this updates it on client for other locales.
 */
export function HtmlLang() {
  const locale = useLocale()

  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}
