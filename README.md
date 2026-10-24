# Martin Engel

**Daten. KI. Verständlich gemacht.**
Aus dem Handel. Für den Handel. Mit KI.

Personal page of Martin Engel. Visitors at AUTOMA Chem 2026 (Estrel Berlin, 26 and 27 October 2026) scan a QR code on his phone, land here and save his contact in one tap.

Live: https://eduardosopalda.github.io/on-the-dot/

## Presentation Card

A phone-sized digital card for Martin Engel is at `card.html`. Live URL: https://eduardosopalda.github.io/on-the-dot/card.html

It shows the brand stack (Daten. KI. Verständlich. gemacht), Martin's name, the one-liner, a QR code linking to the live site, and his phone and email. Open it on a phone and hold it up for someone to scan.

Keep the same branding rules as the rest of the site: Waldgrün `#1F3D2B`, Papierweiß `#F5F1EA`, Holz `#A67C52`, and Mandarine `#FF7A1A` only on dots and the handwritten signature. Fraunces for display, Caveat Brush for "gemacht", Instrument Sans for body text.

## Structure

    index.html              The page
    css/style.css           Design: colours, typography, layout, motion, dark mode
    js/i18n.js              All text (German default, English optional), contact details
    js/main.js              Language toggle, load animation, step weights, sticky contact bar
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

**Text.** Open `js/i18n.js`. Every visible string is there, in `de` and `en`. Rules: clear standard German, formal "Sie", short sentences, no hyphens or dashes in visible text. Full stops in headlines turn into orange dots automatically.

**The example.** The example section now shows the business idea as a fixed bilingual headline in `index.html`.

**LinkedIn.** In `js/i18n.js`, set `linkedin` in `window.SITE` to the profile URL. The LinkedIn row appears by itself. Also add it to `CONTACT` in `tools/build-assets.py` and rebuild the vCard (below).

**Phone or mail.** Change them in `window.SITE` in `js/i18n.js`, in `CONTACT` in `tools/build-assets.py` (then rebuild the vCard), and in `impressum.html` and `datenschutz.html`.

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
2. vCard import on iPhone (Safari: tap "Kontakt speichern", then "Kontakt hinzufügen"). Check umlauts in "Für" and the photo.
3. vCard import on Android (Chrome downloads the file, open it with Contacts).
4. QR scan from another phone's screen, with the iPhone at full brightness.
5. "gemacht" not clipped at 320px width (narrowest iPhone SE setting) and on desktop.
6. No hyphens or dashes in visible text, in German and English.
7. Dark mode on iPhone (Settings, Display, Dark).
8. LinkedIn URL set, or the row stays hidden.
9. Share the link once in WhatsApp or LinkedIn and check the preview image.
10. After the fair: update the footer line about AUTOMA Chem 2026 in `js/i18n.js` and the note in the vCard.
