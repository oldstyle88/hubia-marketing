import { ReactNode } from 'react'
import { Card } from './Card'

interface Feature {
  title: string
  description: string
  icon?: ReactNode
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
      {features.map((feature, index) => (
        <Card key={index}>
          {feature.icon && (
            <div className="mb-4 text-accent-violet-soft">
              {feature.icon}
            </div>
          )}
          <h3 className="text-xl font-semibold text-primary mb-3">
            {feature.title}
          </h3>
          <p className="text-secondary leading-relaxed">
            {feature.description}
          </p>
        </Card>
      ))}
    </div>
  )
}
