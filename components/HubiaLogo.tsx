'use client'

import { HubiaInvestorLogo } from '@/components/brand/HubiaInvestorLogo'

type Variant = 'header' | 'hero'

interface HubiaLogoProps {
  variant?: Variant
}

export function HubiaLogo({ variant = 'hero' }: HubiaLogoProps) {
  return (
    <HubiaInvestorLogo
      variant={variant}
      showWordmark={true}
      link={true}
      className={variant === 'hero' ? 'mx-auto' : ''}
    />
  )
}
