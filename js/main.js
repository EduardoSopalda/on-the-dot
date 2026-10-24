// Language toggle, the load moment, step weights on scroll and the sticky contact bar.
(function () {
  "use strict";

  const STORAGE_KEY = "martinEngelLang";
  const TEXTS = window.TEXTS || {};
  const SITE = window.SITE || {};
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Storage can be blocked. The toggle still works for this visit.
    }
  }

  // Turns every full stop that ends a sentence into a round dot.
  function dotify(el, text) {
    el.textContent = "";
    const parts = text.split(/\.(?=\s|$)/);
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        if (part) el.appendChild(document.createTextNode(part));
        return;
      }
      // Keep the last word and its dot together so the dot never wraps alone.
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

  function setLanguage(lang) {
    const selected = TEXTS[lang] ? lang : "de";
    const t = TEXTS[selected];
    if (!t) return;

    root.lang = selected;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t[el.getAttribute("data-i18n")];
      if (value) setText(el, value);
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const value = t[el.getAttribute("data-i18n-content")];
      if (value) el.setAttribute("content", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = t[el.getAttribute("data-i18n-aria")];
      if (value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const value = t[el.getAttribute("data-i18n-alt")];
      if (value) el.setAttribute("alt", value);
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === selected));
    });

    storeLang(selected);
  }

  function applyContact() {
    if (SITE.phoneLink) {
      document.querySelectorAll('[data-contact="phone"]').forEach((a) => a.setAttribute("href", "tel:" + SITE.phoneLink));
    }
    if (SITE.phoneDisplay) {
      document.querySelectorAll('[data-contact-text="phone"]').forEach((el) => (el.textContent = SITE.phoneDisplay));
    }
    if (SITE.email) {
      document.querySelectorAll('[data-contact="email"]').forEach((a) => a.setAttribute("href", "mailto:" + SITE.email));
      document.querySelectorAll('[data-contact-text="email"]').forEach((el) => (el.textContent = SITE.email));
    }
    if (SITE.linkedin) {
      document.querySelectorAll("[data-linkedin]").forEach((li) => {
        li.hidden = false;
        li.querySelector("a").setAttribute("href", SITE.linkedin);
      });
    }
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

  // Shows the compact "Kontakt speichern" bar once the hero has scrolled away,
  // and hides it while one of the full contact blocks is on screen.
  function stickyBar() {
    const bar = document.querySelector(".sticky-save");
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

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  applyContact();
  setLanguage(readLang() || "de");
  startHero();
  watchSteps();
  stickyBar();
})();
