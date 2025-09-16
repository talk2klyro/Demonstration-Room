document.addEventListener('DOMContentLoaded', () => {
  fetch('data/resources.json')
    .then(res => res.json())
    .then(data => {
      // ===== HOME FEED =====
      const homeFeed = document.getElementById('homeFeed');
      if (homeFeed) {
        data.homeFeed.forEach(post => {
          const div = document.createElement('div');
          div.className = `feed-card ${post.type}`;
          div.innerHTML = `
            <img src="${post.image}" alt="${post.title}" />
            <h4>${post.title}</h4>
            <p>${post.content}</p>
          `;
          homeFeed.appendChild(div);
        });
      }

      // ===== ACADEMICS HUB =====
      const pastQsContainer = document.getElementById('pastQs');
      data.academics.pastQuestions.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <h5>${item.title}</h5>
          <small>${item.tags ? item.tags.join(', ') : ''}</small>
          <button onclick="downloadResource('${item.link}')">Download</button>
        `;
        pastQsContainer.appendChild(div);
      });

      const notesContainer = document.getElementById('notes');
      data.academics.notes.forEach(item => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <h5>${item.title}</h5>
          <small>${item.tags ? item.tags.join(', ') : ''}</small>
          <button onclick="downloadResource('${item.link}')">Download</button>
        `;
        notesContainer.appendChild(div);
      });

      const tutorsContainer = document.getElementById('tutors');
      data.academics.tutors.forEach(tutor => {
        const div = document.createElement('div');
        div.className = 'tutor-card';
        div.innerHTML = `
          <img src="${tutor.image}" alt="${tutor.name}" />
          <h5>${tutor.name}</h5>
          <p>Subject: ${tutor.subject}</p>
          <button>Contact</button>
        `;
        tutorsContainer.appendChild(div);
      });

      // ===== MARKETPLACE =====
      const marketplaceContainer = document.querySelector('.marketplace');
      if (marketplaceContainer) {
        data.marketplace.forEach(shop => {
          const div = document.createElement('div');
          div.className = 'marketplace-card';
          div.innerHTML = `
            <img src="${shop.image}" alt="${shop.name}" />
            <h4>${shop.name}</h4>
            <p>${shop.description}</p>
            <p><strong>${shop.price}</strong></p>
            <button onclick="showSnackbar('Contact: ${shop.contact}')">Chat</button>
          `;
          marketplaceContainer.appendChild(div);
        });
      }

      // ===== EVENTS =====
      const eventsContainer = document.getElementById('eventsList');
      if (eventsContainer) {
        data.events.forEach(evt => {
          const div = document.createElement('div');
          div.className = 'event-card';
          div.innerHTML = `
            <img src="${evt.image}" alt="${evt.title}" />
            <h4>${evt.title}</h4>
            <p>${evt.date} – ${evt.location}</p>
          `;
          eventsContainer.appendChild(div);
        });
      }
    })
    .catch(err => console.error('Failed to load resources.json:', err));
});

// ===== Download Simulation =====
function downloadResource(file) {
  showSnackbar(`Downloading ${file}...`);
                        }
