/* Shared JavaScript */

(function () {
  "use strict";

  /**
   * Initializes responsive mobile navigation with accessibility support.
   */
  function initMobileNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.querySelector(".primary-nav");
    const header = document.querySelector(".site-header");

    if (!navToggle || !primaryNav) {
      return;
    }

    // Toggle menu open/close state
    function toggleMenu(isOpen) {
      const willOpen = typeof isOpen === "boolean" ? isOpen : !primaryNav.classList.contains("is-open");

      primaryNav.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
      document.body.classList.toggle("nav-open", willOpen);

      if (willOpen) {
        // Focus first interactive link inside nav when opened
        const firstLink = primaryNav.querySelector("a");
        if (firstLink) {
          firstLink.focus();
        }
      } else {
        navToggle.focus();
      }
    }

    navToggle.addEventListener("click", function () {
      toggleMenu();
    });

    // Close on Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });

    // Close when clicking outside of the header and navigation
    document.addEventListener("click", function (event) {
      if (
        primaryNav.classList.contains("is-open") &&
        !header.contains(event.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close menu when navigating via an in-page anchor link
    const inPageLinks = primaryNav.querySelectorAll('a[href^="#"]');
    inPageLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (primaryNav.classList.contains("is-open")) {
          toggleMenu(false);
        }
      });
    });

    // Close mobile nav when resizing to desktop viewport
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && primaryNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  /**
   * Applies a subtle elevation state to the header on page scroll.
   */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) {
      return;
    }

    function onScroll() {
      if (window.scrollY > 24) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /*  Feature Scaffolding */

  function initRecipeFilters() {
   
  }

  function initFavorites() {
   
  }

  function initIngredientScaler() {
   
  }

  function initThemeToggle() {
   
  }

  function initContactForm() {
   
  }

  // Initializeinterface handlers when DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNavigation();
    initHeaderScroll();
    initRecipeFilters();
    initFavorites();
    initIngredientScaler();
    initThemeToggle();
    initContactForm();
  });
})();

