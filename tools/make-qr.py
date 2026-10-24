"""Creates the QR code for Martin's page as SVG and PNG.

Usage (from the repository root):
    pip install segno
    python3 tools/make-qr.py https://your-final-url.de/

Waldgrün on Papierweiß, error correction M, standard quiet zone of 4 modules.
"""
import sys
from pathlib import Path

import segno

URL = sys.argv[1] if len(sys.argv) > 1 else "https://eduardosopalda.github.io/on-the-dot/"
OUT = Path(__file__).resolve().parent.parent / "qr"
OUT.mkdir(exist_ok=True)

qr = segno.make(URL, error="m", boost_error=False)
style = dict(dark="#1F3D2B", light="#F5F1EA", border=4)
qr.save(OUT / "martin-engel-qr.svg", scale=10, **style)
qr.save(OUT / "martin-engel-qr.png", scale=24, **style)
print(f"QR for {URL} (version {qr.version}, error {qr.error}) written to {OUT}")
