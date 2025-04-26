self.addEventListener('install', (e) => {
  console.log('Service Worker installé.');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request).catch(() => new Response("Offline.")));
});