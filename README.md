# Taste of Africa — Digital Culinary Platform

A modern, responsive multi-page web platform celebrating and documenting the living culinary traditions, indigenous crops, and diverse foodways of the African continent.

---

## Project Overview

**Taste of Africa** is an educational, cultural food platform developed for the ALU BSE Web Development program. The website documents indigenous culinary techniques, heritage staple ingredients, regional histories, and traditional recipes across West Africa, North & Northeast Africa, and East Africa & the Indian Ocean Islands.

The interface follows a minimalist modern editorial aesthetic, pairing warm organic earth tones (Ivory, Sand, Terracotta, Charcoal, and Muted Olive) with high-contrast typography, semantic HTML5 structure, and client-side interactivity.

---

## Technologies Used

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<aside>`, `<details>`, `<summary>`, `<footer>`, `<mark>`).
- **CSS3:** Custom properties/tokens, CSS Grid, Flexbox, media queries, CSS transitions, and responsive typography (Google Fonts: *Playfair Display* for serif headings, *DM Sans* for body copy).
- **Vanilla JavaScript (ES6+):** Pure client-side DOM manipulation without external libraries or frameworks (no jQuery, Bootstrap, or React).
- **Embedded Media:** YouTube tutorial embeds (`<iframe>`) and Google Maps embeds for geographic and cultural landmarks.
- **Web Storage API:** `localStorage` for cross-session recipe favorites and user theme preference persistence.

---

## Website Structure

```text
taste_of_africa_website_project/
├── index.html                           # Main platform landing page
├── LICENSE                              # Project license
├── README.md                            # Documentation and running instructions
├── .gitignore                           # Git ignore rules
├── assets/
│   ├── icons/
│   │   ├── logo.svg                     # Primary vector brand mark
│   │   └── logo.png                     # Raster logo asset
│   └── images/
│       ├── hero-african-cuisine.jpg     # Hero banner photography
│       ├── jollof-rice.jpg              # Nigerian Jollof Rice
│       ├── ful-medames.jpg              # Sudanese Ful Medames
│       ├── doro-wat.jpg                 # Ethiopian Doro Wat
│       ├── zigni.jpg                    # Eritrean Zigni
│       ├── romazava.jpg                 # Malagasy Romazava
│       ├── west-africa.jpg              # West Africa regional banner
│       ├── north-northeast-africa.jpg   # North & Northeast Africa banner
│       ├── east-africa-islands.jpg      # East Africa & Islands banner
│       ├── african-spices.jpg           # Spice trade editorial banner
│       ├── food-preparation.jpg         # Food preparation editorial banner
│       └── coffee-ceremony.jpg          # Coffee ritual editorial banner
├── css/
│   └── styles.css                       # Consolidated, mobile-first design system
├── js/
│   └── script.js                        # Modular client-side interactivity
└── pages/
    ├── about.html                       # Cultural archive, mission & Terra Kulture map
    ├── contact.html                     # Contact form with validation & live feedback
    ├── recipes/
    │   ├── index.html                   # Recipe archive with region filters & favorites
    │   ├── jollof-rice.html             # Recipe: Nigerian Party Jollof Rice
    │   ├── ful-medames.html             # Recipe: Sudanese Ful Medames
    │   ├── doro-wat.html                # Recipe: Ethiopian Doro Wat
    │   ├── zigni.html                   # Recipe: Eritrean Zigni (Tsebhi Sga)
    │   └── romazava.html                # Recipe: Malagasy Romazava
    └── regions/
        ├── west-africa.html             # Region: West Africa (Nigeria)
        ├── north-northeast-africa.html  # Region: North & Northeast Africa (Sudan)
        └── east-africa-islands.html     # Region: East Africa & Islands (Ethiopia, Eritrea, Madagascar)
```

---

## Core Pages & Features

### 1. Landing Page (`index.html`)
- Editorial hero section with call-to-action buttons.
- Curated introductory video on African culinary heritage.
- Featured dishes grid with origin badges and direct recipe links.
- Culinary regions preview cards linking to deep-dive pages.
- Editorial food culture and historical trade route articles with `<mark>` text highlights.
- Global newsletter subscription form and social links.

### 2. Recipe Collection & Detail Pages (`pages/recipes/`)
- **Collection Archive:** Displays all five approved recipes in a responsive grid.
- **Dynamic Region Filtering:** Interactive filtering by culinary region (`All Dishes`, `West Africa`, `North & Northeast Africa`, `East Africa & Islands`) without page reloads.
- **Favorites System:** Persistent one-click favoriting (`♡ Favorite` / `♥ Saved`) saved to `localStorage` and synchronized across all views.
- **Interactive Serving Scaler:** Stepper controls (`−`, count, `+`, `Reset`) on all five recipe pages that scale ingredient amounts proportionally using base ratios while protecting descriptive and non-numeric quantities (`to taste`, `for serving`, `optional`).
- **Expandable Instructions:** Multi-step cooking tutorials organized with accessible native `<details>` and `<summary>` disclosure widgets.
- **Embedded Media:** YouTube cooking tutorials and country-of-origin Google Maps for each featured dish.

### 3. Culinary Regions (`pages/regions/`)
- In-depth culinary histories for West Africa, North & Northeast Africa, and East Africa & Indian Ocean Islands.
- Breakdowns of staple grains (teff, sorghum, fonio), indigenous aromatics (berbere, niter kibbeh, iru), and communal dining rituals.
- Embedded cultural heritage video tutorials and featured regional dish links.

### 4. About the Project (`pages/about.html`)
- The story and mission behind the digital archive.
- Analysis of transatlantic foodways and diaspora culinary influences.
- Living cultural heritage showcase on the Ethiopian *Buna Tetu* coffee ceremony.
- Interactive Google Map embed of cultural landmark *Terra Kulture* in Lagos, Nigeria.

### 5. Contact & Feedback (`pages/contact.html`)
- Accessible form featuring Name, Email, Country select, Supplementary country datalist suggestions for diaspora visitors, Regional Interest select, and Message textarea.
- Client-side validation enforcing non-empty fields, valid email structure, and messages containing **more than 20 characters** (minimum 21).
- Accessible live feedback replacing the form upon successful submission with a personalized confirmation greeting.

### 6. Accessibility & Theming
- **Dark/Light Mode:** Toggle button in the shared header supporting instant theme switching, system preference detection (`prefers-color-scheme`), and persistent choice storage.
- **Keyboard Navigation:** Dedicated `.skip-link`, explicit focus rings (`:focus-visible`), and accessible ARIA attributes (`aria-expanded`, `aria-controls`, `aria-pressed`, `aria-live`, `aria-label`).
- **Mobile Navigation Drawer:** Slide-down navigation drawer with body scroll lock and viewport constraint.

---

## Local Development and Running Instructions

The website is built with vanilla web technologies and requires no package installations, build steps, or compilation.

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer, or right-click and choose **Open with** > **Google Chrome** (or any modern browser).

### Option 2: Local HTTP Server (Recommended)
Using a local server ensures consistent handling of `localStorage`, iframe permissions, and relative paths:

- **Using Python 3:**
  ```bash
  cd taste_of_africa_website_project
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your web browser.

- **Using Node.js (via `npx serve`):**
  ```bash
  npx serve .
  ```

- **Using VS Code Live Server:**
  Right-click `index.html` in Visual Studio Code and select **Open with Live Server**.

---

## Implementation Notes

- **Preservation of Assets:** All media links reference the local assets provided in `assets/images/` and `assets/icons/`.
- **Standards Compliance:** Written to strict HTML5 and CSS Level 3 specifications.
- **Zero Dependencies:** All functionality operates natively without CDN scripts, external CSS frameworks, or runtime libraries.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

