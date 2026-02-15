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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <article
            key={index}
            className="overflow-hidden rounded-2xl border border-white/12 bg-white/5 shadow-[0_16px_40px_rgba(2,10,26,0.42)] backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
              aria-expanded={open}
            >
              <span className="pr-6 text-base font-medium text-slate-100 sm:text-lg">{item.question}</span>
              <span className="text-2xl text-cyan-200">{open ? '−' : '+'}</span>
            </button>

            {open && (
              <div className="px-6 pb-5">
                <p className="leading-relaxed text-slate-300">{item.answer}</p>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
