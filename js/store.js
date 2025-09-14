// store.js
import { showSnackbar, createCard } from './utils.js';

// DOM Containers
const storeDetailsContainer = document.getElementById('storeDetails');
const productsContainer = document.getElementById('productsContainer');

// Get store ID from URL query
function getStoreId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Render store details
function renderStoreDetails(store) {
  storeDetailsContainer.innerHTML = `
    <div class="store-card">
      <img src="${store.image}" alt="${store.name}" class="store-logo">
      <h2>${store.name}</h2>
      <p>${store.description}</p>
      <div class="store-contact">
        ${store.contact ? `<p>Contact: ${store.contact}</p>` : ''}
        ${store.location ? `<p>Location: ${store.location}</p>` : ''}
      </div>
    </div>
  `;
}

// Render store products
function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = createCard(product.name, product.image, product.cta || '#');
    productsContainer.appendChild(card);
  });
}

// Initialize store page
async function initStorePage() {
  const storeId = getStoreId();
  if (!storeId) {
    showSnackbar('No store ID specified!');
    return;
  }

  try {
    const res = await fetch('data/stores.json');
    const stores = await res.json();
    const store = stores.find(s => s.id.toString() === storeId);

    if (!store) {
      showSnackbar('Store not found!');
      return;
    }

    renderStoreDetails(store);
    renderProducts(store.products || []);
  } catch (error) {
    console.error('Error loading store:', error);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initStorePage);
