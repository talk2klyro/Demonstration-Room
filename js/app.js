// =========================
// Circle ⭕ App.js
// =========================

// ---------- 1. Bottom Navigation ----------
document.querySelectorAll(".bottom-nav .nav-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const pages = [
      "index.html",
      "circles.html",
      "marketplace.html",
      "academics.html",
      "profile.html"
    ];
    window.location.href = pages[i];
  });
});

// ---------- 2. Snackbar Notifications ----------
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  if (!snackbar) return;
  snackbar.textContent = message;
  snackbar.classList.add("show");
  setTimeout(() => snackbar.classList.remove("show"), 3000);
}

// Example trigger:
setTimeout(() => showSnackbar("Welcome to Circle ⭕! 🎉"), 1000);

// ---------- 3. Tabs Switching (Circles, Academics) ----------
const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      tabContents.forEach(tc => (tc.style.display = "none"));
      document.getElementById(tab.dataset.tab).style.display = "block";
    });
  });
}

// ---------- 4. Floating Action Button (FAB) ----------
const fab = document.querySelector(".fab");
if (fab) {
  fab.addEventListener("click", () => {
    const modal = document.getElementById("uploadModal");
    if (modal) modal.style.display = "flex";
  });
}

// ---------- 5. File Upload Modal ----------
const modal = document.getElementById("uploadModal");
if (modal) {
  const uploadBtn = document.getElementById("uploadBtn");
  const closeBtn = document.querySelector(".close");

  uploadBtn.addEventListener("click", () => {
    const file = document.getElementById("fileInput").files[0];
    if (file) showSnackbar(`${file.name} uploaded successfully! ✅`);
    modal.style.display = "none";
  });

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
}

// ---------- 6. Trending Carousel ----------
const track = document.querySelector(".carousel-track");
if (track) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % track.children.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

// ---------- 7. Drag & Drop (Sortable.js) ----------
if (typeof Sortable !== "undefined") {
  const feed = document.getElementById("homeFeed");
  if (feed) {
    Sortable.create(feed, {
      animation: 150,
      ghostClass: "dragging"
    });
  }

  const circles = document.getElementById("circleList");
  if (circles) {
    Sortable.create(circles, {
      animation: 150,
      ghostClass: "dragging"
    });
  }
}

// ---------- 8. Dynamic Data Binding ----------
if (document.getElementById("homeFeed")) {
  fetch("data/resources.json")
    .then(res => res.json())
    .then(data => {
      const feed = document.getElementById("homeFeed");
      feed.innerHTML = data.feed
        .map(
          item => `
        <div class="card">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
          <button>${item.action}</button>
        </div>`
        )
        .join("");
    })
    .catch(() => showSnackbar("⚠️ Offline Mode: Showing cached feed!"));
}

// ---------- 9. Student Dashboards ----------
function updateDashboard(stats) {
  for (let key in stats) {
    const el = document.getElementById(key);
    if (el) el.textContent = stats[key];
  }
}

// Example: Circles dashboard
if (document.body.classList.contains("circles-page")) {
  updateDashboard({ groupsJoined: 3, activePosts: 12 });
}

// Example: Academics dashboard
if (document.body.classList.contains("academics-page")) {
  updateDashboard({ resourcesUploaded: 15, tutorsAvailable: 4 });
}

// ---------- 10. Gamification (XP Points) ----------
function addXP(points) {
  let xp = localStorage.getItem("xp") || 0;
  xp = parseInt(xp) + points;
  localStorage.setItem("xp", xp);
  const xpDisplay = document.getElementById("xpPoints");
  if (xpDisplay) xpDisplay.textContent = xp;
}

// Award XP on upload
if (uploadBtn) {
  uploadBtn.addEventListener("click", () => addXP(10));
}

// ---------- 11. Offline Caching (PWA) ----------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("js/sw.js")
    .then(() => console.log("✅ Service Worker Registered"))
    .catch(err => console.error("SW registration failed", err));
}
