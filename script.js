(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Focal motion: the pole stripe only spins while it is actually on
  // screen, so the one continuous loop on the page never runs for free.
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var poleEls = document.querySelectorAll(".pole-stripe");
    var poleObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    poleEls.forEach(function (el) { poleObserver.observe(el); });
  }
})();
