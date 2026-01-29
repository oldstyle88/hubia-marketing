# Concept logo animato HUBIA (hero)

**Vincoli:** Solo on-load, no loop. Tipografia "HUBIA". Luxury, minimal, system (Linear / Stripe / Vercel). React + Tailwind + CSS/SVG, no immagini, no Lottie, no framer-motion.

---

## Concept A — Reveal letter-by-letter

**Descrizione:** Ogni carattere appare in sequenza con un breve delay (es. 60–80 ms). Opacity 0 → 1 e un lieve translateY(6px) → 0. Dopo che l’ultima lettera è visibile, una linea oro sottile sotto la parola si “disegna” (scaleX 0 → 1, origin left).

**Preview mentale:** Effetto “stampa” o “boot di sistema”: controllo, precisione. Ricorda titoli di prodotto high-end.

**Pro:** Molto riconoscibile, sensazione di “costruzione”.  
**Contro:** Richiede un wrapper per lettera o un solo keyframe con delay multipli; leggermente più complesso.

---

## Concept B — Mask sweep (scelta implementata)

**Descrizione:** La parola "HUBIA" è già nel DOM ma nascosta da un clip-path o da un wrapper con overflow hidden e una “finestra” che si sposta da sinistra a destra. In ~0,6 s la parola viene rivelata in un unico movimento fluido. Subito dopo (o in overlap), una linea oro sottile sotto si anima (width o scaleX 0 → 100%).

**Preview mentale:** Come i reveal di Linear/Stripe: un solo gesto pulito, niente “effetti”, solo ordine e chiarezza.

**Pro:** Una sola animazione principale, facile da controllare, zero JS per l’animazione, performance ottima.  
**Contro:** Meno “character” per-lettera rispetto ad A.

---

## Concept C — Weight + tracking

**Descrizione:** "HUBIA" parte con letter-spacing molto ampio (es. 0.3em) e peso leggero (300), opacity 0. Poi in ~0,5 s transizione a tracking finale (es. 0.08em), peso 600 e opacity 1. Opzionale: una lineetta oro sotto che appare in fade.

**Preview mentale:** Tipografia che “si mette a fuoco”: da etereo a solido. Molto system / design tool.

**Pro:** Differenziazione forte, sensazione “product”.  
**Contro:** Su alcuni font la differenza di weight può essere poco evidente; bisogna bilanciare duration per non sembrare lento.

---

## Scelta: Concept B (Mask sweep)

Implementato per coerenza con Linear/Stripe/Vercel, massima semplicità (solo CSS), e effetto WOW con un solo movimento elegante. Colori: testo avorio/primary; linea e accento oro soft (champagne) in linea con “luxury”.
