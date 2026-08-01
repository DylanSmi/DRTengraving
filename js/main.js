/* ==========================================================================
   DRT Engraving — main.js
   Mobile nav · scroll reveal · form validation · footer year
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section, .hero-inner, .gallery-item, .service-card, .step"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(name, message) {
    var span = document.querySelector('.error[data-for="' + name + '"]');
    var field = document.getElementById(name);
    if (span) span.textContent = message || "";
    if (field && field.parentElement) {
      field.parentElement.classList.toggle("invalid", Boolean(message));
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name) { setError("name", "Please enter your name."); ok = false; }
      else { setError("name", ""); }

      if (!email) { setError("email", "Please enter your email."); ok = false; }
      else if (!isValidEmail(email)) { setError("email", "Please enter a valid email."); ok = false; }
      else { setError("email", ""); }

      if (!message) { setError("message", "Please tell us a little about your project."); ok = false; }
      else { setError("message", ""); }

      if (!ok) {
        if (status) { status.textContent = ""; status.className = "form-status"; }
        return;
      }

      /* No backend yet — this is a placeholder success handler.
         Swap this block for a real submission (e.g. fetch to a form
         service or your own endpoint) when you're ready to go live. */
      if (status) {
        status.textContent = "Thanks, " + name + "! Your message is ready — connect a form backend to send it.";
        status.className = "form-status success";
      }
      form.reset();
    });

    // Clear an error as soon as the user starts fixing it
    ["name", "email", "message"].forEach(function (id) {
      var field = document.getElementById(id);
      if (field) field.addEventListener("input", function () { setError(id, ""); });
    });
  }
})();
