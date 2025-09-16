const CACHE_NAME = 'circle-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/circles.html',
  '/marketplace.html',
  '/academics.html',
  '/profile.html',
  '/events.html',
  '/css/style.css',
  '/js/app.js',
  '/js/helpers.js'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
