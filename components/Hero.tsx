'use client'

import { Button } from './Button'
import { Logo } from './Logo'

export interface ProofCard {
  title: string
  description: string
  placeholder?: boolean
}

interface HeroProps {
  title: string
  subtitle: string
  ctaDemo: string
  ctaPrices: string
  proofCards?: ProofCard[]
}

export function Hero({ title, subtitle, ctaDemo, ctaPrices, proofCards = [] }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-aurora pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-veil opacity-30 pointer-events-none" aria-hidden />

      <div className="hero-grid mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="relative flex flex-col items-center text-center gap-12">
          <div className="flex flex-col items-center gap-6">
            <Logo variant="hero" href="/" />
          </div>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-primary leading-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-secondary leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
              {ctaDemo}
            </Button>
            <Button href="#come-funziona" variant="outline" className="text-lg px-10 py-5">
              {ctaPrices}
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-secondary uppercase tracking-[0.24em]">
            <span>GDPR Ready</span>
            <span>PWA White-label</span>
            <span>Supporto umano</span>
          </div>

          {(proofCards?.length ?? 0) > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {(proofCards ?? []).map((card, index) => (
              <div key={index} className="glass-card rounded-2xl border border-white/10 p-6 text-left">
                <p className="text-sm font-semibold text-primary mb-2">{card.title}</p>
                <p className="text-xs text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
