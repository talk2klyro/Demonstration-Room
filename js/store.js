// Get s// Get store id from URL
const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get('id');

// Fetch store data
fetch('assets/data/store.json')
  .then(res => res.json())
  .then(data => {
    const store = data.stores.find(s => s.id === storeId);

    if (!store) {
      document.body.innerHTML = `<h2>Store not found</h2>`;
      return;
    }

    // Store Header
    document.getElementById('storeBanner').src = store.banner;
    document.getElementById('storeName').textContent = store.name;
    document.getElementById('storeDescription').textContent = store.description;

    // Products
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    store.products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading store:", err));

// Simple cart function (shared via common.js later)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
