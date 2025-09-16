// ==========================
// app.js - Core Application
// ==========================

// ✅ Global App State
const App = {
  theme: localStorage.getItem("theme") || "light",
  snackbarTimeout: null,
};

// --------------------------
// 1. Theme Handling
// --------------------------
App.applyTheme = function () {
  document.body.setAttribute("data-theme", App.theme);
};

App.toggleTheme = function () {
  App.theme = App.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", App.theme);
  App.applyTheme();
};

// --------------------------
// 2. Snackbar Notifications
// --------------------------
App.showSnackbar = function (message, duration = 3000) {
  const snackbar = document.getElementById("snackbar");
  if (!snackbar) return;

  snackbar.textContent = message;
  snackbar.classList.add("show");

  clearTimeout(App.snackbarTimeout);
  App.snackbarTimeout = setTimeout(() => {
    snackbar.classList.remove("show");
  }, duration);
};

// --------------------------
// 3. Bottom Navigation
// --------------------------
App.initNav = function () {
  const navBtns = document.querySelectorAll(".nav-btn");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Example: Snackbar feedback
      App.showSnackbar(`${btn.textContent} opened`);
    });
  });
};

// --------------------------
// 4. Header Search
// --------------------------
App.initSearch = function () {
  const searchInput = document.querySelector(".top-nav input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const match = card.textContent.toLowerCase().includes(query);
      card.style.display = match ? "block" : "none";
    });
  });
};

// --------------------------
// 5. Scroll-to-Top (Optional)
// --------------------------
App.initScrollToTop = function () {
  const fab = document.querySelector(".fab");
  if (!fab) return;

  fab.addEventListener("click", () => {
    gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.out" });
  });
};

// --------------------------
// Init All
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  App.applyTheme();
  App.initNav();
  App.initSearch();
  App.initScrollToTop();

  // Example Snackbar on load
  App.showSnackbar("Welcome back 👋");
});
