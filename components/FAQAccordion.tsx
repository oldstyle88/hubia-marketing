'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-2xl border border-[var(--line)] bg-white/85">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between rounded-2xl px-6 py-5 text-left transition-colors hover:bg-[var(--bg-alt)]/70"
            aria-expanded={openIndex === index}
          >
            <span className="pr-6 text-base font-semibold text-[var(--primary)]">{item.question}</span>
            <span className="flex-shrink-0 text-2xl text-[var(--secondary)]">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-5">
              <p className="leading-relaxed text-[var(--gray)]">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
