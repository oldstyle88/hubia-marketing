'use client'

import { Button } from '@/components/Button'

/* Check verde per feature list */
const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

interface Plan {
  name: string
  description: string
  setup: string
  setupNote?: string
  monthly: string
  features: string[]
  cta: string
  featured?: boolean
}

interface PricingSectionProps {
  title: string
  subtitle: string
  plans: Plan[]
}

/**
 * Sezione prezzi: 2–3 piani con lista feature (check verde) e bottone CTA.
 */
export function PricingSection({ title, subtitle, plans }: PricingSectionProps) {
  return (
    <section id="prezzi" className="py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-modern p-8 flex flex-col ${
                plan.featured ? 'ring-2 ring-teal/50 shadow-glow' : ''
              }`}
            >
              <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
              <p className="text-secondary text-sm mb-6">{plan.description}</p>

              <div className="space-y-1 mb-6">
                <p className="text-primary font-semibold">{plan.setup}</p>
                {plan.setupNote && (
                  <p className="text-secondary text-xs">{plan.setupNote}</p>
                )}
                <p className="text-primary font-semibold">{plan.monthly}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button href="/contact" variant={plan.featured ? 'primary' : 'outline'} className="w-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
