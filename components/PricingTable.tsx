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
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={plan.highlight ? 'relative border-cyan-300/60 bg-white/10 shadow-[0_20px_52px_rgba(34,132,227,0.3)]' : 'relative'}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge>{plan.badge}</Badge>
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-2 text-2xl font-semibold text-slate-50">{plan.name}</h3>
            <p className="mb-6 text-sm text-slate-300">{plan.description}</p>

            <div className="mb-6">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-cyan-200 sm:text-4xl">{plan.monthly}</span>
                <span className="text-slate-300">{perMonthLabel}</span>
              </div>
              <div className="text-sm text-slate-400">
                {plan.setupFee} {setupLabel}
              </div>
            </div>
          </div>

          <ul className="mb-8 space-y-3">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <span className="mt-1 text-cyan-200">✓</span>
                <span className="text-sm text-slate-200">{feature}</span>
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
