// Language switch and small interactions.
(function () {
  const STORAGE_KEY = "onTheDotLang";
  const translations = window.translations || {};

  function readStoredLang() {
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
      // Storage can be blocked (private mode). The switch still works.
    }
  }

  function setLanguage(lang) {
    const selected = translations[lang] ? lang : "de";
    const texts = translations[selected];
    if (!texts) return;

    document.documentElement.lang = selected;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = texts[el.getAttribute("data-i18n")];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const value = texts[el.getAttribute("data-i18n-content")];
      if (value) el.setAttribute("content", value);
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.dataset.lang === selected;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    storeLang(selected);
  }

  function setupLanguage() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
    setLanguage(readStoredLang() || "de");
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function setupHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
      observer.observe(el);
    });
  }

  function setupYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupLanguage();
    setupMenu();
    setupHeader();
    setupReveal();
    setupYear();
  });
})();
