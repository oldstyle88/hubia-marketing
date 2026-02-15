'use client'

import dynamic from 'next/dynamic'

const LeadForm = dynamic(() => import('@/components/LeadForm').then((m) => m.LeadForm), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-[var(--line)] bg-white/70 p-4 text-sm text-[var(--gray)]">Caricamento form...</div>
  ),
})

interface DeferredLeadFormProps {
  onSuccess?: () => void
}

export function DeferredLeadForm({ onSuccess }: DeferredLeadFormProps) {
  return <LeadForm onSuccess={onSuccess} />
}
