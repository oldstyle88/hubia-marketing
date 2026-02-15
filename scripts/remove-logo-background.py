#!/usr/bin/env python3
"""Rimuove lo sfondo nero/scuro da logo.png: pixel sotto soglia -> trasparenti. Output: public/logo.png con alpha."""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Installa Pillow: pip install Pillow")
    sys.exit(1)

# Paths
root = Path(__file__).resolve().parents[1]
src = root / "public" / "logo.png"
dst = root / "public" / "logo.png"
# Soglia: sotto questo valore (0-255) il pixel diventa trasparente (nero/sfondo)
DARK_THRESHOLD = 40

if not src.exists():
    print(f"File non trovato: {src}")
    sys.exit(1)

img = Image.open(src).convert("RGBA")
pix = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pix[x, y]
        # Se il pixel è molto scuro (nero/sfondo), rendi trasparente
        if r <= DARK_THRESHOLD and g <= DARK_THRESHOLD and b <= DARK_THRESHOLD:
            pix[x, y] = (r, g, b, 0)
        # Sfumature scure: alpha proporzionale per bordi più morbidi
        elif (r + g + b) / 3 < 80:
            ratio = (r + g + b) / (3 * 80)
            pix[x, y] = (r, g, b, int(255 * ratio))

img.save(dst, "PNG")
print(f"Ok: {dst} (sfondo nero -> trasparente)")
