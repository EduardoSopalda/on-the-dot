// Applies the texts, contact links, the load moment, step weights on scroll
// and the sticky contact bar.
(function () {
  "use strict";

  const TEXTS = window.TEXTS || {};
  const SITE = window.SITE || {};
  const EXAMPLES = window.EXAMPLES || [];
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Turns every full stop that ends a sentence into a round dot,
  // keeping the last word and its dot together so the dot never wraps alone.
  function dotify(el, text) {
    el.textContent = "";
    const parts = text.split(/\.(?=\s|$)/);
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        if (part) el.appendChild(document.createTextNode(part));
        return;
      }
      const cut = part.lastIndexOf(" ") + 1;
      if (cut) el.appendChild(document.createTextNode(part.slice(0, cut)));
      const word = document.createElement("span");
      word.className = "dot-word";
      word.textContent = part.slice(cut);
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.textContent = ".";
      word.appendChild(dot);
      el.appendChild(word);
    });
  }

  function setText(el, text) {
    if (el.hasAttribute("data-dots")) dotify(el, text);
    else el.textContent = text;
  }

  function applyTexts() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = TEXTS[el.getAttribute("data-i18n")];
      if (value) setText(el, value);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = TEXTS[el.getAttribute("data-i18n-aria")];
      if (value) el.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const value = TEXTS[el.getAttribute("data-i18n-alt")];
      if (value) el.setAttribute("alt", value);
    });
  }

  function renderExamples() {
    const host = document.getElementById("examples");
    if (!host || !EXAMPLES.length) return;
    host.textContent = "";

    EXAMPLES.forEach((example) => {
      const article = document.createElement("article");
      article.className = "story";

      example.beats.forEach((beat) => {
        const row = document.createElement("div");
        row.className = beat.insight ? "beat beat-insight" : "beat";

        const label = document.createElement("span");
        label.className = "beat-label";
        label.textContent = beat.label;

        const text = document.createElement("p");
        text.className = "beat-text";
        if (beat.insight) dotify(text, beat.text);
        else text.textContent = beat.text;

        row.append(label, text);
        article.appendChild(row);
      });

      host.appendChild(article);
    });
  }

  function setHref(selector, href) {
    document.querySelectorAll(selector).forEach((a) => a.setAttribute("href", href));
  }

  function applyContact() {
    if (SITE.whatsapp) {
      const message = SITE.whatsappMessage ? "?text=" + encodeURIComponent(SITE.whatsappMessage) : "";
      setHref('[data-contact="whatsapp"]', "https://wa.me/" + SITE.whatsapp + message);
    }
    if (SITE.phoneLink) setHref('[data-contact="phone"]', "tel:" + SITE.phoneLink);
    if (SITE.email) {
      setHref('[data-contact="email"]', "mailto:" + SITE.email);
      const subject = SITE.mailSubject ? "?subject=" + encodeURIComponent(SITE.mailSubject) : "";
      setHref('[data-contact="problem"]', "mailto:" + SITE.email + subject);
    }
    if (SITE.linkedin) setHref('[data-contact="linkedin"]', SITE.linkedin);

    document.querySelectorAll("[data-contact-text]").forEach((el) => {
      const kind = el.getAttribute("data-contact-text");
      if (kind === "phone" && SITE.phoneDisplay) el.textContent = SITE.phoneDisplay;
      if (kind === "email" && SITE.email) el.textContent = SITE.email;
    });
  }

  // The one orchestrated moment: words gain weight, then "gemacht" writes itself in.
  function startHero() {
    if (reduceMotion) {
      root.classList.add("is-ready");
      return;
    }
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-ready")));
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    setTimeout(go, 1200);
  }

  function watchSteps() {
    const steps = document.querySelectorAll(".step");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      steps.forEach((step) => step.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -18% 0px" }
    );
    steps.forEach((step) => observer.observe(step));
  }

  // Shows the compact contact bar once the hero has scrolled away,
  // and hides it while one of the full contact blocks is on screen.
  function stickyBar() {
    const bar = document.querySelector(".sticky-bar");
    const hero = document.querySelector(".hero");
    const blocks = document.querySelectorAll(".contact");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;

    let pastHero = false;
    const visibleBlocks = new Set();

    const update = () => {
      const show = pastHero && visibleBlocks.size === 0;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", String(!show));
      if (show) bar.removeAttribute("inert");
      else bar.setAttribute("inert", "");
    };

    new IntersectionObserver((entries) => {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(hero);

    const blockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleBlocks.add(entry.target);
        else visibleBlocks.delete(entry.target);
      });
      update();
    });
    blocks.forEach((block) => blockObserver.observe(block));
  }

  applyTexts();
  renderExamples();
  applyContact();
  startHero();
  watchSteps();
  stickyBar();
})();
