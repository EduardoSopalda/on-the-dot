# On the Dot

**Frisch und pünktlich. Order on the Dot.**

Working name. The final brand name will be decided later.

## What this is

The website for On the Dot, a startup founded by Lars in Berlin.

On the Dot helps small, owner run shops sell more and waste less. Florists come first, then bakeries, delis and caterers. Shops offer a small online menu of ready made products. Customers preorder and book an exact delivery time.

Behind the scenes, simple demand forecasting helps each shop order exactly what it will sell.

## The mission

Bring AI from the big chains to owner run shops, and make it easy to understand.

German: *KI für inhabergeführte Läden. Einfach erklärt.*
English: *AI for owner run shops. Simply explained.*

Lars is the Vermittler: the person who connects AI and the shop counter.

## Audience

1. Owners of small, owner run shops in big German cities, starting in Berlin.
2. Their customers, who live in German and English.

## Languages

German is the default. English is available through a language switch.
All visible text lives in one file so both languages are easy to edit.

## Writing rules

1. The tagline is the only hook. All other German copy is clear, standard German that works equally well in Berlin, Munich, Hamburg or Mannheim. No dialect or slang.
2. Plain, warm words. No tech jargon on shop pages.
3. Sell moments, not logistics.
4. No hyphens or em dashes in visible text. Use colons, periods or rewritten sentences.
5. Placeholder shop stories stay clearly marked until real shops agree to appear.

## Tech

Static site: HTML, CSS and a little vanilla JavaScript.
No framework, no build step, no backend.
Hosted on IONOS.

## Project structure

    /index.html          Main page
    /css/style.css       Styles
    /js/i18n.js          All texts in German and English
    /js/main.js          Language switch and small interactions
    /images/             Photos and placeholders
    /impressum.html      Legal notice (required in Germany)
    /datenschutz.html    Privacy policy (required in Germany)

## Editing

**Texts:** open `js/i18n.js` and change the German and English strings.
**Images:** replace files in `/images/` and keep the same file names, or update the paths in `index.html`.

## Running locally

Open `index.html` in a browser. Nothing to install.

## Deploying to IONOS

Option 1: upload all files to your IONOS webspace with SFTP.
Option 2: connect this repository to IONOS Deploy Now for automatic deploys on every push.

## Before going live

1. Real Impressum and Datenschutz texts.
2. Real photos and shop stories, with permission.
3. Lars's photo and LinkedIn link.
4. A working contact form service, or keep the email link.
5. Check that the domain and trademark are free.

## Status

Early prototype. Built to test the idea with the first shops in Schöneberg.
