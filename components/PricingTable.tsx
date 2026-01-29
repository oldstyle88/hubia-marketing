import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

interface Plan {
  name: string
  description: string
  setupFee: number
  monthly: number
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={
            plan.highlight
              ? 'relative border-2 border-accent-violet/40 shadow-glow-sm bg-surface-elevated'
              : 'relative bg-surface'
          }
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge>{plan.badge}</Badge>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              {plan.name}
            </h3>
            <p className="text-secondary text-sm mb-6">{plan.description}</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-semibold text-primary">
                  €{plan.monthly}
                </span>
                <span className="text-secondary">{perMonthLabel}</span>
              </div>
              <div className="text-sm text-secondary">
                + €{plan.setupFee} {setupLabel}
              </div>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <span className="text-accent-violet-soft mt-1">✓</span>
                <span className="text-secondary text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            href="/contact"
            variant={plan.highlight ? 'primary' : 'outline'}
            className="w-full"
          >
            {requestDemoLabel}
          </Button>
        </Card>
      ))}
    </div>
  )
}
