// journey.js
import { showSnackbar, createCard } from './utils.js';

// DOM Container
const journeyGallery = document.getElementById('journeyGallery');

// Render Journey Entries
async function renderJourney() {
  try {
    const res = await fetch('data/journey.json');
    const journeys = await res.json();

    journeys.forEach(entry => {
      const card = createCard(entry.title, entry.image, entry.link || '#');

      // Optional: Story overlay
      if (entry.story) {
        const overlay = document.createElement('p');
        overlay.classList.add('story-overlay');
        overlay.textContent = entry.story;
        card.appendChild(overlay);
      }

      journeyGallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading journey entries:', error);
  }
}

// Initialize journey page
document.addEventListener('DOMContentLoaded', renderJourney);
