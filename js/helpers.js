// helpers.js

// ==================
// Global Data Loader
// ==================
async function loadResources() {
  try {
    const response = await fetch("/data/resources.json");
    if (!response.ok) throw new Error("Failed to load resources.json");
    return await response.json();
  } catch (error) {
    console.error("Error loading resources:", error);
    return {};
  }
}

// ==================
// DOM Utility
// ==================
function createElement(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.innerHTML = content;
  return el;
}

// ==================
// Card Renderer
// ==================
function renderCard(container, { title, content, image, type }) {
  const card = createElement("div", `card ${type || ""}`);
  
  if (image) {
    const img = createElement("img", "card-img");
    img.src = image;
    card.appendChild(img);
  }

  if (title) {
    card.appendChild(createElement("h4", "card-title", title));
  }
  if (content) {
    card.appendChild(createElement("p", "card-content", content));
  }

  container.appendChild(card);
}

// ==================
// Circle Renderer
// ==================
function renderCircle(container, circle) {
  const circleCard = createElement("div", "circle-card");

  // Banner
  if (circle.banner) {
    const banner = createElement("img", "circle-banner");
    banner.src = circle.banner;
    circleCard.appendChild(banner);
  }

  // Title
  circleCard.appendChild(createElement("h3", "circle-name", circle.name));

  // Members
  if (circle.members) {
    const members = createElement("p", "circle-members", 
      `${circle.members.length} members`
    );
    circleCard.appendChild(members);
  }

  // Posts Preview
  if (circle.posts && circle.posts.length > 0) {
    const latest = circle.posts[0];
    const post = createElement("p", "circle-post", `${latest.author}: ${latest.content}`);
    circleCard.appendChild(post);
  }

  container.appendChild(circleCard);
}

// ==================
// Marketplace Renderer
// ==================
function renderMarketplace(container, item) {
  const card = createElement("div", "marketplace-card");

  if (item.image) {
    const img = createElement("img", "marketplace-img");
    img.src = item.image;
    card.appendChild(img);
  }

  card.appendChild(createElement("h4", "marketplace-title", item.name));
  card.appendChild(createElement("p", "marketplace-desc", item.description));

  const btn = createElement("button", "btn-chat", "Chat");
  btn.addEventListener("click", () => alert(`Chat with ${item.name}`));
  card.appendChild(btn);

  container.appendChild(card);
}

// ==================
// Academics Renderer
// ==================
function renderAcademics(container, section) {
  section.forEach(item => {
    const card = createElement("div", "academics-card");

    if (item.image) {
      const img = createElement("img", "academics-img");
      img.src = item.image;
      card.appendChild(img);
    }

    card.appendChild(createElement("h4", "academics-title", item.title));

    const btn = createElement("a", "btn-download", "View / Download");
    btn.href = item.link || "#";
    btn.target = "_blank";
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// ==================
// Events Renderer
// ==================
function renderEvent(container, event) {
  const card = createElement("div", "event-card");

  if (event.image) {
    const img = createElement("img", "event-img");
    img.src = event.image;
    card.appendChild(img);
  }

  card.appendChild(createElement("h4", "event-title", event.title));
  card.appendChild(createElement("p", "event-date", `📅 ${event.date}`));
  card.appendChild(createElement("p", "event-location", `📍 ${event.location}`));

  container.appendChild(card);
}

// ==================
// Init Function Per Page
// ==================
async function initPage(page) {
  const data = await loadResources();

  switch (page) {
    case "home":
      const feedContainer = document.getElementById("homeFeed");
      data.homeFeed.forEach(item => renderCard(feedContainer, item));
      break;

    case "circles":
      const circlesContainer = document.getElementById("circlesList");
      data.circles.forEach(circle => renderCircle(circlesContainer, circle));
      break;

    case "marketplace":
      const marketContainer = document.getElementById("marketList");
      data.marketplace.forEach(item => renderMarketplace(marketContainer, item));
      break;

    case "academics":
      renderAcademics(document.getElementById("pastQuestions"), data.academics.pastQuestions);
      renderAcademics(document.getElementById("notes"), data.academics.notes);
      renderAcademics(document.getElementById("tutors"), data.academics.tutors);
      break;

    case "events":
      const eventsContainer = document.getElementById("eventList");
      data.events.forEach(ev => renderEvent(eventsContainer, ev));
      break;
  }
                                   }
