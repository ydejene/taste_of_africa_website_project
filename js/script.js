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

    function toggleMenu(isOpen) {
      const willOpen = typeof isOpen === "boolean" ? isOpen : !primaryNav.classList.contains("is-open");

      primaryNav.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", String(willOpen));
      document.body.classList.toggle("nav-open", willOpen);

      if (willOpen) {
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

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        primaryNav.classList.contains("is-open") &&
        header &&
        !header.contains(event.target)
      ) {
        toggleMenu(false);
      }
    });

    const inPageLinks = primaryNav.querySelectorAll('a[href^="#"]');
    inPageLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (primaryNav.classList.contains("is-open")) {
          toggleMenu(false);
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && primaryNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  /**
   * Applies an elevation class to the header on vertical page scroll.
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

  /**
   * Initializes light and dark theme switching with system preference detection and localStorage persistence.
   */
  function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const STORAGE_KEY = "taste_of_africa_theme";

    function getSavedTheme() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return null;
      }
    }

    function saveTheme(theme) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {}
    }

    function getSystemTheme() {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }

    function applyTheme(theme) {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }

      if (toggle) {
        const isDark = theme === "dark";
        toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
        toggle.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
        toggle.setAttribute("aria-pressed", String(isDark));
        const icon = toggle.querySelector(".theme-toggle-icon");
        if (icon) {
          icon.innerHTML = isDark ? "&#9728;" : "&#9790;";
        }
      }
    }

    const savedTheme = getSavedTheme();
    const initialTheme = savedTheme ? savedTheme : getSystemTheme();
    applyTheme(initialTheme);

    if (toggle) {
      toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
      });
    }

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
        if (!getSavedTheme()) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  }

  /**
   * Initializes dynamic region filtering for recipe collection cards.
   */
  function initRecipeFilters() {
    const filterButtons = document.querySelectorAll(".filter-bar .filter-btn");
    const recipeCards = document.querySelectorAll(".featured-dish-card[data-region]");

    if (!filterButtons.length || !recipeCards.length) {
      return;
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const selectedFilter = this.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
          const isActive = btn === button;
          btn.classList.toggle("active", isActive);
          btn.setAttribute("aria-pressed", String(isActive));
        });

        recipeCards.forEach(function (card) {
          const region = card.getAttribute("data-region");
          const matches = selectedFilter === "all" || region === selectedFilter;
          card.style.display = matches ? "" : "none";
        });
      });
    });
  }

  /**
   * Initializes recipe favorites with localStorage persistence across the website.
   */
  function initFavorites() {
    const STORAGE_KEY = "taste_of_africa_favorites";

    function getFavorites() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    function saveFavorites(favorites) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {}
    }

    function updateButtonUI(btn, isFavorite) {
      btn.classList.toggle("is-favorite", isFavorite);
      btn.setAttribute("aria-pressed", String(isFavorite));
      const icon = isFavorite ? "&#9829;" : "&#9825;";
      const text = isFavorite ? "Saved" : "Favorite";
      btn.innerHTML = `<span aria-hidden="true">${icon}</span> ${text}`;
    }

    function syncAllButtons() {
      const favorites = getFavorites();
      const buttons = document.querySelectorAll(".btn-favorite");
      buttons.forEach(function (btn) {
        const recipeId = btn.getAttribute("data-recipe-id");
        const isFav = favorites.includes(recipeId);
        updateButtonUI(btn, isFav);
      });
    }

    syncAllButtons();

    document.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn-favorite");
      if (!btn) {
        return;
      }

      const recipeId = btn.getAttribute("data-recipe-id");
      if (!recipeId) {
        return;
      }

      const favorites = getFavorites();
      const index = favorites.indexOf(recipeId);

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(recipeId);
      }

      saveFavorites(favorites);
      syncAllButtons();
    });
  }

  /**
   * Formats a numeric quantity into clean whole numbers, standard culinary fractions, or decimals.
   */
  function formatQuantity(qty) {
    if (qty <= 0) {
      return "0";
    }

    if (Math.abs(qty - Math.round(qty)) < 0.04) {
      return String(Math.round(qty));
    }

    const integerPart = Math.floor(qty);
    const fractionPart = qty - integerPart;
    let fractionSymbol = "";

    if (Math.abs(fractionPart - 0.25) < 0.06) {
      fractionSymbol = "¼";
    } else if (Math.abs(fractionPart - 0.333) < 0.06) {
      fractionSymbol = "⅓";
    } else if (Math.abs(fractionPart - 0.5) < 0.06) {
      fractionSymbol = "½";
    } else if (Math.abs(fractionPart - 0.667) < 0.06) {
      fractionSymbol = "⅔";
    } else if (Math.abs(fractionPart - 0.75) < 0.06) {
      fractionSymbol = "¾";
    } else if (Math.abs(fractionPart - 0.125) < 0.04) {
      fractionSymbol = "⅛";
    }

    if (fractionSymbol) {
      return integerPart > 0 ? integerPart + fractionSymbol : fractionSymbol;
    }

    if (qty >= 10) {
      return String(Math.round(qty));
    }

    return String(parseFloat(qty.toFixed(2)));
  }

  /**
   * Initializes serving-size adjustment and proportional ingredient scaling for individual recipe pages.
   */
  function initIngredientScaler() {
    const ingredientsPanel = document.querySelector(".ingredients-panel");
    const ingredientsList = document.getElementById("ingredients-list");
    const servingsDisplay = document.getElementById("servings-display");

    if (!ingredientsPanel || !ingredientsList || !servingsDisplay) {
      return;
    }

    const baseServingsMatch = servingsDisplay.textContent.match(/\d+/);
    if (!baseServingsMatch) {
      return;
    }

    const baseServings = parseInt(baseServingsMatch[0], 10);
    let currentServings = baseServings;

    const items = ingredientsList.querySelectorAll(".ingredient-amount");
    const nonScalableTerms = ["to taste", "for serving", "optional", "garnish", "to serve", "as needed"];

    const ingredientData = [];
    items.forEach(function (el) {
      const originalText = el.textContent.trim();
      const baseQtyAttr = el.getAttribute("data-base-qty");
      const unitAttr = el.getAttribute("data-unit") || "";
      const baseQty = parseFloat(baseQtyAttr);
      const isNonScalable =
        isNaN(baseQty) ||
        nonScalableTerms.some(function (term) {
          return (
            originalText.toLowerCase() === term ||
            unitAttr.toLowerCase() === term
          );
        });

      ingredientData.push({
        element: el,
        originalText: originalText,
        baseQty: baseQty,
        unit: unitAttr,
        isNonScalable: isNonScalable
      });
    });

    const subtleNote = ingredientsPanel.querySelector(".subtle-text");
    const originalSubtleText = subtleNote ? subtleNote.textContent : "";

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "servings-control";
    controlWrapper.setAttribute("role", "group");
    controlWrapper.setAttribute("aria-label", "Adjust recipe servings");
    controlWrapper.innerHTML = `
      <span class="servings-label">Servings:</span>
      <div class="servings-stepper">
        <button type="button" class="btn-servings btn-servings-dec" aria-label="Decrease servings" title="Decrease servings">−</button>
        <span class="servings-count" aria-live="polite" aria-atomic="true">${currentServings}</span>
        <button type="button" class="btn-servings btn-servings-inc" aria-label="Increase servings" title="Increase servings">+</button>
      </div>
      <button type="button" class="btn-servings-reset" aria-label="Reset servings to original quantity" title="Reset servings">Reset</button>
    `;

    if (subtleNote && subtleNote.nextSibling) {
      ingredientsPanel.insertBefore(controlWrapper, subtleNote.nextSibling);
    } else {
      ingredientsPanel.insertBefore(controlWrapper, ingredientsList);
    }

    const countDisplay = controlWrapper.querySelector(".servings-count");
    const decBtn = controlWrapper.querySelector(".btn-servings-dec");
    const incBtn = controlWrapper.querySelector(".btn-servings-inc");
    const resetBtn = controlWrapper.querySelector(".btn-servings-reset");

    function updateScaling() {
      countDisplay.textContent = String(currentServings);
      decBtn.disabled = currentServings <= 1;

      servingsDisplay.textContent = `${currentServings} ${currentServings === 1 ? "serving" : "servings"}`;

      if (subtleNote) {
        if (currentServings === baseServings) {
          subtleNote.textContent = originalSubtleText;
        } else {
          subtleNote.textContent = `Scaled for ${currentServings} servings (base recipe: ${baseServings}).`;
        }
      }

      ingredientData.forEach(function (item) {
        if (item.isNonScalable || currentServings === baseServings) {
          item.element.textContent = item.originalText;
          return;
        }

        const scaledQty = (item.baseQty * currentServings) / baseServings;
        const formatted = formatQuantity(scaledQty);
        let displayUnit = item.unit;
        if (scaledQty === 1 && displayUnit) {
          if (displayUnit === "cups") {
            displayUnit = "cup";
          } else if (
            displayUnit.endsWith("s") &&
            !displayUnit.endsWith("ss") &&
            displayUnit !== "tbsp each" &&
            displayUnit !== "on side"
          ) {
            displayUnit = displayUnit.slice(0, -1);
          }
        }
        item.element.textContent = displayUnit ? `${formatted} ${displayUnit}` : formatted;
      });
    }

    decBtn.addEventListener("click", function () {
      if (currentServings > 1) {
        currentServings -= 1;
        updateScaling();
      }
    });

    incBtn.addEventListener("click", function () {
      if (currentServings < 30) {
        currentServings += 1;
        updateScaling();
      }
    });

    resetBtn.addEventListener("click", function () {
      currentServings = baseServings;
      updateScaling();
    });

    updateScaling();
  }

  /**
   * Escapes HTML entities to prevent injection in dynamic feedback rendering.
   */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Initializes accessible client-side form validation and personalized feedback for the contact form.
   */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-feedback");

    if (!form || !feedback) {
      return;
    }

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const countrySelect = document.getElementById("contact-country");
    const countryOtherInput = document.getElementById("contact-country-other");
    const messageInput = document.getElementById("contact-message");

    const clearErrors = function (input) {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    };

    [nameInput, emailInput, countrySelect, countryOtherInput, messageInput].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", function () {
        clearErrors(field);
      });
      field.addEventListener("change", function () {
        clearErrors(field);
      });
    });

    if (countrySelect && countryOtherInput) {
      countrySelect.addEventListener("change", function () {
        if (countrySelect.value === "other") {
          countryOtherInput.focus();
        }
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const errors = [];

      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (!nameVal || nameVal.length < 2) {
        errors.push({
          element: nameInput,
          message: "Please enter your full name (at least 2 characters)."
        });
      }

      const emailVal = emailInput ? emailInput.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        errors.push({
          element: emailInput,
          message: "Please enter a valid email address (e.g., name@example.com)."
        });
      }

      const countryVal = countrySelect ? countrySelect.value : "";
      if (!countryVal) {
        errors.push({
          element: countrySelect,
          message: "Please select your primary country of residence or origin."
        });
      } else if (countryVal === "other") {
        const otherVal = countryOtherInput ? countryOtherInput.value.trim() : "";
        if (!otherVal || otherVal.length < 2) {
          errors.push({
            element: countryOtherInput,
            message: "Please specify your location or diaspora region (at least 2 characters)."
          });
        }
      }

      const messageVal = messageInput ? messageInput.value.trim() : "";
      if (!messageVal || messageVal.length < 21) {
        errors.push({
          element: messageInput,
          message: "Your message must contain more than 20 characters (currently " + messageVal.length + ")."
        });
      }

      if (errors.length > 0) {
        feedback.className = "form-feedback is-visible is-error";
        feedback.setAttribute("role", "alert");

        let errorListHtml = "<strong>Please correct the following fields before submitting:</strong><ul>";
        errors.forEach(function (err) {
          if (err.element) {
            err.element.classList.add("is-invalid");
            err.element.setAttribute("aria-invalid", "true");
          }
          errorListHtml += `<li>${escapeHtml(err.message)}</li>`;
        });
        errorListHtml += "</ul>";

        feedback.innerHTML = errorListHtml;
        feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
        if (errors[0].element) {
          errors[0].element.focus();
        }
        return;
      }

      form.style.display = "none";
      feedback.className = "form-feedback is-visible is-success";
      feedback.setAttribute("role", "status");
      feedback.tabIndex = -1;

      feedback.innerHTML = `
        <h3>Thank you, ${escapeHtml(nameVal)}!</h3>
        <p>Your culinary message has been received. Our editorial team reviews community contributions, diaspora perspectives, and recipe recommendations regularly.</p>
        <p class="mt-md"><a href="../index.html" class="btn btn-secondary btn-fit">&larr; Return to Homepage</a></p>
      `;

      feedback.focus();
      feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNavigation();
    initHeaderScroll();
    initThemeToggle();
    initRecipeFilters();
    initFavorites();
    initIngredientScaler();
    initContactForm();
  });
})();
