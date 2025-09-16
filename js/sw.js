const CACHE_NAME = "circle-cache-v1";
const urlsToCache = [
  "index.html","circles.html","marketplace.html","academics.html",
  "profile.html","events.html","css/style.css","js/app.js","js/carousel.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
