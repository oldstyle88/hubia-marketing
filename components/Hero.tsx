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
  proofCards: ProofCard[]
}

export function Hero({ title, subtitle, ctaDemo, ctaPrices, proofCards }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-aurora pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-veil opacity-30 pointer-events-none" aria-hidden />

      <div className="hero-grid mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none" aria-hidden>
            <div className="hero-orbit" />
            <div className="hero-orbit" />
            <div className="hero-orbit" />
          </div>

          <div className="space-y-8 relative z-10">
            <Logo variant="hero" href="/" />
            <div className="space-y-6">
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
              <Button href="/pricing" variant="outline" className="text-lg px-10 py-5">
                {ctaPrices}
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-secondary uppercase tracking-[0.24em]">
              <span>GDPR Ready</span>
              <span>PWA White-label</span>
              <span>Supporto umano</span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="glass-card rounded-[28px] p-10 shadow-soft animate-float">
              <div className="flex items-center justify-between mb-8">
                <div className="h-2 w-24 rounded-full bg-white/10" />
                <div className="w-10 h-10 rounded-full bg-accent-blue/30 shadow-glow" />
              </div>
              <div className="space-y-4">
                {proofCards.map((card, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                    <div>
                      <p className="text-sm font-semibold text-primary">{card.title}</p>
                      <p className="text-xs text-secondary">{card.description}</p>
                    </div>
                    <span className="text-accent-blue font-semibold">●</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border border-white/15 bg-surface/70 backdrop-blur-md shadow-glow" />
          </div>
        </div>
      </div>
    </section>
  )
}
