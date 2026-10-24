# Martin Engel

**Daten. KI. Verständlich gemacht.**
You know your shop. I know AI. Du kennst deinen Laden. Ich verbinde ihn mit KI.

Personal page of Martin Engel. The page sells a person, not a product: 20 years in retail, and the way he gets from a problem to a solution. Visitors at AUTOMA Chem 2026 (Estrel Berlin, 26 and 27 October 2026) scan a QR code on his phone, land here and contact him in one tap.

Live: https://eduardosopalda.github.io/on-the-dot/

## Structure

    index.html              The page
    css/style.css           Design: colours, typography, layout, motion, dark mode
    js/i18n.js              All text, contact details, WhatsApp message, examples
    js/main.js              Applies texts and links, load animation, step weights, sticky contact bar
    martin-engel.vcf        Contact card behind "Kontakt speichern" (UTF 8, with photo)
    impressum.html          Legal notice (draft, see checklist)
    datenschutz.html        Privacy policy (draft, see checklist)
    manifest.webmanifest    Home screen app settings
    icons/                  Favicon and home screen icons
    images/                 Portrait (duotone) and share image og.png
    fonts/                  Self hosted Fraunces, Instrument Sans, Caveat Brush (OFL licences included)
    qr/                     QR code as SVG and PNG
    tools/                  Scripts that rebuild portrait, icons, vCard, share image and QR code

No framework, no build step, no backend, no cookies, no analytics. Fonts are served from the same host, so no data goes to Google.

## Editing

**Text.** Open `js/i18n.js`. Every visible string is there. Key headlines come in pairs: `.en` is the English headline, `.de` the German line beneath it. Body text is German. Rules: always "Martin Engel" or "Martin", German uses "du", short sentences, no hyphens or dashes in visible text. Full stops in headlines turn into orange dots automatically. `index.html` holds the same text as a fallback for search engines; keep them in step when you change a line.

**Add a story.** In `js/i18n.js`, copy one entry of `window.EXAMPLES` and change the beats. Each beat has a `label` and a `text`; the beat with `insight: true` is set large.

**WhatsApp message.** `whatsappMessage` in `window.SITE`. It is encoded into the link automatically.

**Phone, mail or LinkedIn.** Change them in `window.SITE` in `js/i18n.js`, in `CONTACT` in `tools/build-assets.py` (then rebuild the vCard), and in `impressum.html` and `datenschutz.html`.

**Final URL.** When the page moves to its own domain, replace `https://eduardosopalda.github.io/on-the-dot/` in `index.html` (Open Graph tags), `tools/build-assets.py` and `tools/make-qr.py`, then rebuild the vCard and the QR code.

## Rebuilding assets

From the repository root:

    pip install pillow segno
    python3 tools/build-assets.py                  # portrait, icons, vCard
    python3 tools/make-qr.py https://final-url/    # QR code into qr/
    python3 -m http.server 8765                    # in a second terminal, then:
    node tools/make-og.js                          # share image (needs Playwright)

The portrait comes from `tools/source/martin-headshot.jpg`. To use a different photo, replace that file and run `build-assets.py`.

## Viewing locally

Run `python3 -m http.server 8765` in the repository root and open http://localhost:8765. Opening `index.html` directly from disk works, but browsers block the self hosted fonts on `file://`.

## Hosting

**GitHub Pages (free, current).** Repository Settings, Pages, Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`. Every push to `main` goes live within a minute or two. The `.nojekyll` file makes GitHub serve the files as they are.

**IONOS.** Either connect this repository with IONOS Deploy Now (static site, no build command, publish directory `/`), or upload all files by SFTP into the webspace root. `.htaccess` sets the right file types, so the vCard opens the contact dialog on phones. When moving to IONOS, switch the hosting paragraph in `datenschutz.html` (the IONOS text is prepared in a comment there) and update the URLs (see "Final URL").

## QR code

`qr/martin-engel-qr.svg` and `qr/martin-engel-qr.png`: Waldgrün `#1F3D2B` on Papierweiß `#F5F1EA`, error correction M, quiet zone of 4 modules. Regenerate with `tools/make-qr.py` whenever the URL changes. To show it on the iPhone, save the PNG to Photos and open it full screen at maximum brightness.

## Pre launch checklist

1. Impressum: fill in Martin's address in `impressum.html` and `datenschutz.html`, then remove the draft notices. Required in Germany before the page is shared.
2. WhatsApp button on a phone: opens a chat with Martin and the prepared message.
3. vCard import on iPhone (Safari: tap "Kontakt speichern", then "Kontakt hinzufügen"). Check the photo, the LinkedIn link and the note "Kennengelernt auf der AUTOMA Chem 2026".
4. vCard import on Android (Chrome downloads the file, open it with Contacts).
5. QR scan from another phone's screen, with the iPhone at full brightness.
6. "gemacht" not clipped at 320px width (narrowest iPhone SE setting) and on desktop.
7. No hyphens or dashes in visible text.
8. Dark mode on iPhone (Settings, Display, Dark).
9. Share the link once in WhatsApp or LinkedIn and check the preview image.
10. After the fair: update the footer line, the WhatsApp message and the vCard note, which all mention AUTOMA Chem 2026.
