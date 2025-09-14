// stores.js
import { showSnackbar, createCard } from './utils.js';

// DOM Containers
const internalContainer = document.getElementById('internalStoresContainer');
const externalContainer = document.getElementById('externalStoresContainer');

// Render Internal Stores
async function renderInternalStores() {
  try {
    const res = await fetch('data/stores.json');
    const stores = await res.json();

    stores.forEach(store => {
      const card = createCard(
        store.name,
        store.image,
        `store.html?id=${store.id}` // link to store detail
      );
      internalContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading internal stores:', error);
  }
}

// Render External Stores
async function renderExternalStores() {
  try {
    const res = await fetch('data/externalStores.json');
    const stores = await res.json();

    stores.forEach(store => {
      const card = createCard(
        store.name,
        store.image,
        store.link // external URL
      );
      // Optional: Open external links in new tab
      card.querySelector('a').setAttribute('target', '_blank');
      externalContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading external stores:', error);
  }
}

// Initialize stores page
document.addEventListener('DOMContentLoaded', () => {
  renderInternalStores();
  renderExternalStores();
});
