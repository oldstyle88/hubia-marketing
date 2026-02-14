'use client'

import { Link } from '@/i18n/navigation'
import { Button } from './Button'

interface HeroProps {
  title: string
  subtitle: string
  ctaDemo: string
  ctaPrices: string
}

/**
 * Hero forte: logo + titolo + sottotitolo + CTAs primario e secondario.
 * Stile 2025: navy, teal, minimalista, alto contrasto.
 */
export function Hero({ title, subtitle, ctaDemo, ctaPrices }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-24">
      <div className="absolute inset-0 bg-gradient-subtle pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
        <div className="flex flex-col items-center gap-10">
          <Link href="/" className="inline-flex flex-col items-center" aria-label="HUBIA Home">
            <img
              src="/brand/hubia-logo-extracted.png"
              alt="HUBIA"
              className="w-48 sm:w-56 md:w-64 h-auto object-contain"
              loading="eager"
            />
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary" className="text-base px-8 py-4">
              {ctaDemo}
            </Button>
            <Button href="#come-funziona" variant="outline" className="text-base px-8 py-4">
              {ctaPrices}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-secondary uppercase tracking-[0.2em]">
            <span>GDPR Ready</span>
            <span>PWA White-label</span>
            <span>Supporto umano</span>
          </div>
        </div>
      </div>
    </section>
  )
}
