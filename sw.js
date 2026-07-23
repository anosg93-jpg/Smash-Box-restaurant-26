const CACHE_NAME = 'smashbox-dynamic-v1';

// التثبيت وتجاوز الانتظار فور رفع كود جديد
self.addEventListener('install', event => {
  self.skipWaiting();
});

// التفعيل واستلام التحكم مباشرة
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// استراتيجية النيتورك أولاً Network-First لضمان وصول التعديلات الجديدة للعميل بدون كاش قديم
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
