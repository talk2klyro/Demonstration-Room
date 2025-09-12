// Fetch and display all stores
fetch('assets/data/store.json')
  .then(res => res.json())
  .then(data => {
    const storeList = document.getElementById('storeList');
    storeList.innerHTML = '';

    data.stores.forEach(store => {
      const card = document.createElement('div');
      card.className = 'store-card';
      card.innerHTML = `
        <img src="${store.logo}" alt="${store.name} logo" class="store-logo">
        <h3>${store.name}</h3>
        <p>${store.description}</p>
        <button onclick="window.location.href='store.html?id=${store.id}'">Visit Store</button>
      `;
      storeList.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading stores:", err));
