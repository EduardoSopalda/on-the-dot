// All visible text lives here. German is the default, English is optional.
// Writing rules: clear standard German, formal "Sie", short sentences,
// no hyphens or dashes anywhere in visible text.
// Full stops in headlines become orange dots automatically.

window.SITE = {
  // Contact details. The vCard (martin-engel.vcf) is built separately:
  // edit tools/build-assets.py and run it again when these change.
  phoneDisplay: "+49160 99 666 776",
  phoneLink: "+4916099666776",
  email: "martinengel1975@outlook.de",
  // TODO: paste the LinkedIn profile URL. The LinkedIn row stays hidden while this is empty.
  linkedin: ""
};

window.TEXTS = {
  de: {
    "meta.title": "Martin Engel. Aus dem Handel. Für den Handel. Mit KI.",
    "meta.description": "Martin Engel verbindet jahrzehntelange Erfahrung im Handel mit KI. Er findet für Läden den Weg vom Problem zur Lösung.",
    "skip": "Zum Inhalt springen",
    "lang.label": "Sprache",

    "hero.aria": "Daten. KI. Verständlich gemacht.",
    "portrait.alt": "Porträt von Martin Engel",

    "name": "Martin Engel",
    "oneliner": "Aus dem Handel. Für den Handel. Mit KI.",
    "intro": "Seit Jahrzehnten im Handel, von der Filiale bis zur Zentrale. Heute vermittle ich KI für den Laden um die Ecke.",

    "contact.save": "Kontakt speichern",
    "contact.call": "Anrufen",
    "contact.mail": "Mail",
    "contact.linkedin": "LinkedIn",
    "contact.linkedinValue": "Profil ansehen",
    "contact.heading": "Kontakt",

    "atob.title": "Von A nach B",
    "atob.lead": "Ich sehe ein Problem im Laden und finde den Weg zur Lösung. Mit Erfahrung und KI.",
    "atob.s1.word": "Zuhören.",
    "atob.s1.sub": "Mit dem Zuhören fängt alles an.",
    "atob.s1.text": "Ich gehe in den Laden und frage, wo es wirklich klemmt.",
    "atob.s2.word": "Verstehen.",
    "atob.s2.sub": "Das Problem verstehen führt zur Lösung.",
    "atob.s2.text": "Hinter dem sichtbaren Problem liegt meist ein anderes. Das finde ich.",
    "atob.s3.word": "Lösen.",
    "atob.s3.text": "Einfach, bezahlbar, sofort nutzbar. Keine Technik um der Technik willen.",

    "example.label": "Ein Beispiel",
    "example.a": "A",
    "example.thought": "Gedanke",
    "example.b": "B",

    "principle.a": "KI macht die Routine.",
    "principle.b": "Menschen",
    "principle.c": "machen den Unterschied.",

    "invite.title": "Zeigen Sie mir Ihr Problem.",
    "invite.sub": "Handel, Daten, KI. Ich finde den Weg von A nach B.",

    "footer.event": "Persönlich auf der AUTOMA Chem 2026 im Estrel Berlin.",
    "footer.imprint": "Impressum",
    "footer.privacy": "Datenschutz"
  },

  en: {
    "meta.title": "Martin Engel. From retail. For retail. With AI.",
    "meta.description": "Martin Engel combines decades of retail experience with AI. He finds the way from a shop's problem to its solution.",
    "skip": "Skip to content",
    "lang.label": "Language",

    "hero.aria": "Data. AI. Made understandable.",
    "portrait.alt": "Portrait of Martin Engel",

    "name": "Martin Engel",
    "oneliner": "From retail. For retail. With AI.",
    "intro": "Decades in retail, from the shop floor to head office. Today I bring AI to the shop around the corner.",

    "contact.save": "Save contact",
    "contact.call": "Call",
    "contact.mail": "Mail",
    "contact.linkedin": "LinkedIn",
    "contact.linkedinValue": "View profile",
    "contact.heading": "Contact",

    "atob.title": "From A to B",
    "atob.lead": "I see a problem in the shop and find the way to a solution. With experience and AI.",
    "atob.s1.word": "Listen.",
    "atob.s1.sub": "Everything starts with listening.",
    "atob.s1.text": "I go into the shop and ask where things really get stuck.",
    "atob.s2.word": "Understand.",
    "atob.s2.sub": "Understanding the problem leads to the solution.",
    "atob.s2.text": "Behind the visible problem there is usually another one. I find it.",
    "atob.s3.word": "Solve.",
    "atob.s3.text": "Simple, affordable, ready to use. No technology for its own sake.",

    "example.label": "An example",
    "example.a": "A",
    "example.thought": "Thought",
    "example.b": "B",

    "principle.a": "AI does the routine.",
    "principle.b": "People",
    "principle.c": "make the difference.",

    "invite.title": "Show me your problem.",
    "invite.sub": "Retail, data, AI. I find the way from A to B.",

    "footer.event": "In person at AUTOMA Chem 2026 at the Estrel Berlin.",
    "footer.imprint": "Legal notice",
    "footer.privacy": "Privacy"
  }
};

// Examples: copy one entry to add another case. They appear in this order.
window.EXAMPLES = [
  {
    de: {
      a: "Am Muttertag fehlen Blumen. Am Montag landen sie im Müll.",
      thought: "Kein Blumenproblem. Ein Planungsproblem.",
      b: "Vorbestellung, feste Lieferzeiten, einfache Prognosen. Bestellen auf den Punkt."
    },
    en: {
      a: "On Mother's Day the flowers run out. On Monday they end up in the bin.",
      thought: "Not a flower problem. A planning problem.",
      b: "Preorders, fixed delivery times, simple forecasts. Ordering on the dot."
    }
  }
];
