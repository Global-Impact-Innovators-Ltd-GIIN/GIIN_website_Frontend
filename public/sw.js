const CACHE_NAME = 'giin-cache-v1';
const OFFLINE_URL = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        '/globe.svg',
        '/window.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept navigation requests for HTML pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
