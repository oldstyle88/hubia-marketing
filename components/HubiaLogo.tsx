'use client'

/**
 * HubiaLogo — Logo tipografico "HUBIA" per hero, solo codice (no immagini).
 *
 * Direzione: Linear / Stripe / Vercel — luxury moderno, minimal, system.
 * Animazione: solo on-load, una volta (no loop).
 *
 * Cosa è animato e perché:
 * 1. Reveal (clip-path): la parola è nascosta a destra e viene rivelata da sinistra
 *    a destra in ~0.7s. Un solo gesto pulito, sensazione di "sistema che si attiva".
 * 2. Linea oro sotto: si disegna (scaleX 0 → 1) con un leggero delay rispetto al
 *    reveal, per dare profondità e un accento luxury senza distrarre.
 *
 * Colori: testo primary (avorio), accento oro soft (champagne) per la linea.
 * Performance: solo CSS, nessuna libreria, nessun JS per l’animazione.
 */

export function HubiaLogo() {
  return (
    <div className="inline-flex flex-col items-center">
      {/* Wrapper con overflow hidden: il testo viene “tagliato” e animato con clip-path. */}
      <div className="overflow-hidden">
        {/* Animazione: .hubia-reveal in globals.css — clip-path da 100% nascosto a visibile, una sola volta. */}
        <span
          className="hubia-reveal block text-5xl font-semibold tracking-[0.12em] text-primary sm:text-6xl md:text-7xl md:tracking-[0.14em]"
          style={{ fontFeatureSettings: '"ss01", "ss02"' }}
        >
          HUBIA
        </span>
      </div>
      {/* Animazione: .hubia-line in globals.css — scaleX(0) → scaleX(1) con delay 0.35s, una sola volta. */}
      <div
        className="hubia-line mt-3 h-px w-full max-w-[90%] rounded-full bg-champagne/80 sm:mt-4 sm:max-w-full"
        aria-hidden
      />
    </div>
  )
}
