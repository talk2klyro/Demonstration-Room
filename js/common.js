// ===== Common.js for Storvia =====

// Update cart count in header
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.length;
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

// Add product to cart
function addToCart(id, name, price, image = "assets/images/placeholder.png") {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
