// promo.js
import { showSnackbar, createCard } from './utils.js';

// DOM Container
const promoGallery = document.getElementById('promoGallery');

// Render Promotions
async function renderPromotions() {
  try {
    const res = await fetch('data/promos.json');
    const promos = await res.json();

    promos.forEach(promo => {
      const card = createCard(promo.title, promo.image, promo.link);

      // Optional: Countdown timer for urgency
      if (promo.endDate) {
        const timer = document.createElement('p');
        timer.classList.add('promo-timer');
        updateCountdown(promo.endDate, timer);
        card.appendChild(timer);
      }

      promoGallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading promotions:', error);
  }
}

// Countdown timer for each promo
function updateCountdown(endDateStr, timerElement) {
  function update() {
    const endDate = new Date(endDateStr);
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      timerElement.textContent = 'Promotion ended';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerElement.textContent = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update(); // initial call
  const interval = setInterval(update, 1000);
}

// Initialize promo page
document.addEventListener('DOMContentLoaded', renderPromotions);
