const CACHE_NAME = 'buscador-calorias-cache-v1';
const urlsToCache = [
  '/',
  '/index.html', 
  '/login.html', 
  'register.html',
  '/js/script.js', 
  '/js/login.js', 
  '/js/register.js', 
  '/css/login.css',
  '/css/styles.css', 
  '/css/st.css',
  '/manifest.json',
  '/icons/meditation-192.png', 
  '/icons/meditation-512.png', 
  '/assets/login.jpg', 
  '/assets/logo-branca.png', 
  '/assets/logo.png', 
  '/assets/register.jpg'
];

// Instalando o Service Worker e armazenando em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir conteúdo do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Atualizando o cache quando o Service Worker é ativado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
