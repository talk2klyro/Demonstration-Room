// utils.js

/** Show snackbar notification// utils.js

/** Show snackbar notifications */
export function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.classList.add('show');
  setTimeout(() => snackbar.classList.remove('show'), 3000);
}

/** Create a reusable card element */
export function createCard(title, imageUrl, link = '#') {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <a href="${link}">
      <div class="card-inner">
        <img src="${imageUrl}" alt="${title}" class="card-img">
        <h3 class="card-title">${title}</h3>
      </div>
    </a>
  `;

  // Hover effect
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-inner').style.transform = 'scale(1.05) rotateY(5deg)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-inner').style.transform = 'scale(1) rotateY(0deg)';
  });

  return card;
}

/** Initialize a 3D coverflow for a container */
export function initCoverflow(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let currentIndex = 0;
  const cards = container.children;
  const total = cards.length;

  function updateCoverflow() {
    Array.from(cards).forEach((card, index) => {
      const offset = index - currentIndex;
      card.style.transform = `translateX(${offset * 220}px) translateZ(${ -Math.abs(offset) * 100}px) rotateY(${offset * 15}deg)`;
      card.style.zIndex = total - Math.abs(offset);
      card.style.opacity = Math.abs(offset) > 2 ? '0.3' : '1';
    });
  }

  updateCoverflow();

  // Simple left/right navigation with click
  container.addEventListener('click', e => {
    const clickedCard = e.target.closest('.card');
    if (!clickedCard) return;

    const index = Array.from(cards).indexOf(clickedCard);
    if (index !== -1 && index !== currentIndex) {
      currentIndex = index;
      updateCoverflow();
    }
  });
}
