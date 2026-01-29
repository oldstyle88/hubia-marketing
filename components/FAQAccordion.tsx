'use client'

import { useState } from 'react'

interface FAQItem { question: string; answer: string }
interface FAQAccordionProps { items: FAQItem[] }

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="glass-card rounded-2xl border border-white/10">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-medium text-primary pr-8">{item.question}</span>
            <span className="text-secondary text-2xl flex-shrink-0">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="px-8 pb-6">
              <p className="text-secondary leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
