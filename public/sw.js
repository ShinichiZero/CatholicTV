const CACHE_NAME = "catholictv-shell-v1";
const SCOPE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const withScope = (path) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SCOPE_PATH}${normalized}`;
};
const STATIC_ASSETS = [
  withScope("/"),
  withScope("/dvr/"),
  withScope("/manifest.json"),
  withScope("/icons/icon-192.png"),
  withScope("/icons/icon-512.png"),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Gracefully handle missing assets during install
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  const pathname = SCOPE_PATH.length > 0 && url.pathname.startsWith(SCOPE_PATH)
    ? (url.pathname.slice(SCOPE_PATH.length) || "/")
    : url.pathname;

  // Never cache HLS streams or API calls
  if (
    pathname.startsWith("/api/") ||
    request.url.includes(".m3u8") ||
    request.url.includes(".ts") ||
    request.url.includes("stream") ||
    request.method !== "GET"
  ) {
    return;
  }

  // Cache-first for static assets
  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/logos/")
  ) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }

  // Network-first for HTML pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match(withScope("/")))
      )
  );
});
