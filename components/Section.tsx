import { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export function Section({ children, className = '', containerSize = 'lg', id }: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-32 ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
