// main.js
import { showSnackbar, initCoverflow, createCard } from './utils.js';

// DOM Containers
const coverflowGallery = document.getElementById('coverflowGallery');
const promoGallery = document.getElementById('promoGallery');
const subscribeBtn = document.getElementById('subscribeBtn');

// Fetch and render featured stores (internal + external)
async function renderFeaturedStores() {
  try {
    const [internalRes, externalRes] = await Promise.all([
      fetch('data/stores.json'),
      fetch('data/externalStores.json')
    ]);
    const internalStores = await internalRes.json();
    const externalStores = await externalRes.json();

    // Combine and pick featured stores (example: first 6)
    const featured = [
      ...internalStores.filter(s => s.featured),
      ...externalStores.filter(s => s.featured)
    ].slice(0, 6);

    featured.forEach(store => {
      const card = createCard(store.name, store.image, store.cta || store.link);
      coverflowGallery.appendChild(card);
    });

    // Initialize 3D coverflow
    initCoverflow('#coverflowGallery');
  } catch (error) {
    console.error('Error loading featured stores:', error);
  }
}

// Fetch and render promotions
async function renderPromotions() {
  try {
    const res = await fetch('data/promos.json');
    const promos = await res.json();

    promos.forEach(promo => {
      const card = createCard(promo.title, promo.image, promo.link);
      promoGallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading promotions:', error);
  }
}

// Newsletter subscription
subscribeBtn.addEventListener('click', () => {
  const input = document.querySelector('.cta-section input');
  if (input.value) {
    showSnackbar(`Subscribed with ${input.value}!`);
    input.value = '';
  } else {
    showSnackbar('Please enter a valid email.');
  }
});

// Initialize homepage
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedStores();
  renderPromotions();
});
