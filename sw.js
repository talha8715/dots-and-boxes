const CACHE_NAME = 'dots-boxes-v1';
const OFFLINE_URL = '/dots-and-boxes/';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './favicon/android-chrome-192x192.png',
  './favicon/android-chrome-512x512.png',
  './favicon/apple-touch-icon.png',
  './favicon/favicon-16x16.png',
  './favicon/favicon-32x32.png',
  './favicon/favicon.ico',
  './favicon/safari-pinned-tab.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache the offline page
        return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});