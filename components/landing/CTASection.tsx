'use client'

import { Button } from '@/components/Button'

interface CTASectionProps {
  title: string
  subtitle: string
  ctaText: string
}

/**
 * CTA finale: titolo + sottotitolo + bottone "Parliamone insieme" → /contact.
 */
export function CTASection({ title, subtitle, ctaText }: CTASectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-2xl px-6 sm:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight">
          {title}
        </h2>
        <p className="text-lg text-secondary mb-10">
          {subtitle}
        </p>
        <Button href="/contact" variant="primary" className="text-base px-10 py-4">
          {ctaText}
        </Button>
      </div>
    </section>
  )
}
