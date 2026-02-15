import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

interface Plan {
  name: string
  description: string
  setupFee: string
  monthly: string
  features: string[]
  highlight?: boolean
  badge?: string | null
}

interface PricingTableProps {
  plans: Plan[]
  perMonthLabel?: string
  setupLabel?: string
  requestDemoLabel?: string
}

export function PricingTable({
  plans,
  perMonthLabel = '/mese',
  setupLabel = 'setup (una tantum)',
  requestDemoLabel = 'Richiedi demo',
}: PricingTableProps) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={plan.highlight ? 'relative bg-white/94 ring-2 ring-[var(--secondary)]/60 shadow-[0_28px_72px_rgba(16,24,40,0.12)]' : 'relative bg-white/90'}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge>{plan.badge}</Badge>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-2 text-2xl font-semibold text-[var(--primary)]">{plan.name}</h3>
            <p className="mb-6 text-[15px] leading-relaxed text-[var(--text)]">{plan.description}</p>

            <div className="mb-6">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-[var(--primary)] sm:text-4xl">{plan.monthly}</span>
                <span className="text-sm text-[var(--gray)]">{perMonthLabel}</span>
              </div>
              <div className="text-sm text-[var(--text)]">
                {plan.setupFee} {setupLabel}
              </div>
            </div>
          </div>

          <ul className="mb-8 space-y-3.5">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <span className="mt-1 text-[var(--secondary)]">✓</span>
                <span className="text-[15px] text-[var(--text)]">{feature}</span>
              </li>
            ))}
          </ul>

          <Button href="/contact" variant={plan.highlight ? 'primary' : 'outline'} className="w-full">
            {requestDemoLabel}
          </Button>
        </Card>
      ))}
    </div>
  )
}
