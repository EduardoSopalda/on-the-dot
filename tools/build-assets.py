"""Builds the photo, icons and contact card from tools/source.

Run from the repository root:  python3 tools/build-assets.py
Needs Pillow (pip install pillow).
"""
import base64
import io
from pathlib import Path

import random

from PIL import Image, ImageChops, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "tools" / "source" / "martin-headshot.jpg"

GREEN = (0x1F, 0x3D, 0x2B)
PAPER = (0xF5, 0xF1, 0xEA)
MANDARINE = (0xFF, 0x7A, 0x1A)

# Contact details. Edit here, then run this script again.
CONTACT = {
    "first": "Martin",
    "last": "Engel",
    "title": "Du kennst deinen Laden. Ich verbinde ihn mit KI.",
    "phone": "+4916099666776",
    "email": "martinengel1975@outlook.de",
    "url": "https://eduardosopalda.github.io/on-the-dot/",
    "linkedin": "https://www.linkedin.com/in/martin-engel-berlin",
    "note": "Kennengelernt auf der AUTOMA Chem 2026",
}


def square_crop(im):
    # Head and shoulders, centred on the face.
    side = 1040
    cx, top = 610, 40
    return im.crop((cx - side // 2, top, cx + side // 2, top + side))


def duotone(im, dark=GREEN, light=PAPER):
    gray = ImageOps.grayscale(im)
    gray = ImageOps.autocontrast(gray, cutoff=(1, 0.5))
    lut = []
    for channel in range(3):
        for v in range(256):
            t = (v / 255) ** 1.18
            lut.append(round(dark[channel] + (light[channel] - dark[channel]) * t))
    return Image.merge("RGB", (gray, gray, gray)).point(lut)


def add_grain(im, amount=16, seed=1975):
    # Subtle film grain: real, not polished.
    rng = random.Random(seed)
    noise = Image.new("L", im.size)
    noise.putdata([128 + int(rng.gauss(0, amount)) for _ in range(im.size[0] * im.size[1])])
    noise = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(im, ImageChops.overlay(im, noise), 0.5)


def build_photo(src):
    crop = square_crop(src)
    duo = add_grain(duotone(crop.resize((640, 640), Image.LANCZOS)))
    duo.save(ROOT / "images" / "martin.webp", quality=84, method=6)
    return crop


def build_icons():
    for size, name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        scale = 4
        big = Image.new("RGB", (size * scale, size * scale), GREEN)
        r = size * scale * 0.19
        c = size * scale / 2
        ImageDraw.Draw(big).ellipse((c - r, c - r, c + r, c + r), fill=MANDARINE)
        big.resize((size, size), Image.LANCZOS).save(ROOT / "icons" / name, optimize=True)


def fold(line):
    # vCard lines are folded at 75 octets.
    data = line.encode("utf-8")
    parts = []
    while len(data) > 75:
        cut = 75 if not parts else 74
        while (data[cut] & 0xC0) == 0x80:
            cut -= 1
        parts.append(data[:cut])
        data = data[cut:]
    parts.append(data)
    return b"\r\n ".join(parts).decode("utf-8")


def escape(value):
    for char in ("\\", ",", ";"):
        value = value.replace(char, "\\" + char)
    return value


def build_vcard(crop):
    buf = io.BytesIO()
    crop.resize((400, 400), Image.LANCZOS).save(buf, "JPEG", quality=82)
    photo = base64.b64encode(buf.getvalue()).decode("ascii")
    c = CONTACT
    lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        f"N:{escape(c['last'])};{escape(c['first'])};;;",
        f"FN:{escape(c['first'])} {escape(c['last'])}",
        f"TITLE:{escape(c['title'])}",
        f"TEL;TYPE=CELL,VOICE:{c['phone']}",
        f"EMAIL;TYPE=INTERNET:{c['email']}",
        f"URL:{c['url']}",
    ]
    if c["linkedin"]:
        lines.append(f"URL;TYPE=LinkedIn:{c['linkedin']}")
    lines += [
        f"NOTE:{escape(c['note'])}",
        f"PHOTO;ENCODING=b;TYPE=JPEG:{photo}",
        "END:VCARD",
    ]
    text = "\r\n".join(fold(line) for line in lines) + "\r\n"
    (ROOT / "martin-engel.vcf").write_bytes(text.encode("utf-8"))


if __name__ == "__main__":
    source = Image.open(SOURCE).convert("RGB")
    crop = build_photo(source)
    build_icons()
    build_vcard(crop)
    print("Photo, icons and contact card written.")
