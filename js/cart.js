function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty. <a href="stores.html">Go shopping</a></p>`;
    cartTotal.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image || 'assets/images/placeholder.png'}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', loadCart);
