const CACHE_NAME = 'lydia-v1.0.0';
const STATIC_CACHE = 'lydia-static-v1.0.0';
const DYNAMIC_CACHE = 'lydia-dynamic-v1.0.0';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/images/lydia.webp',
  '/images/favicon/favicon.ico',
  '/images/favicon/apple-touch-icon.png',
  '/_next/static/css/app.css', // Adjust based on actual CSS file
  '/manifest.json'
];

// Assets to cache on demand
const CACHE_PATTERNS = {
  images: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i,
  fonts: /\.(woff|woff2|ttf|eot)$/i,
  static: /\/_next\/static\//,
  api: /\/api\//
};

// Cache durations (in seconds)
const CACHE_DURATION = {
  images: 86400 * 30, // 30 days
  fonts: 86400 * 365, // 1 year
  static: 86400 * 30, // 30 days
  api: 300, // 5 minutes
  default: 86400 // 1 day
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS.filter(asset => asset));
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Strategy 1: Critical assets - Cache First
    if (isCriticalAsset(pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Static assets (images, fonts) - Cache First with long TTL
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }
    
    // Strategy 3: API requests - Network First with short TTL
    if (pathname.startsWith('/api/')) {
      return await networkFirst(request, DYNAMIC_CACHE, CACHE_DURATION.api);
    }
    
    // Strategy 4: Pages - Stale While Revalidate
    if (isPageRequest(request)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Default: Network only
    return await fetch(request);
    
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    
    // Fallback strategies
    if (isPageRequest(request)) {
      return await getCachedPage() || createOfflinePage();
    }
    
    return new Response('Network error', { 
      status: 408,
      statusText: 'Request Timeout' 
    });
  }
}

// Cache First strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  const response = await fetch(request);
  
  if (response.ok) {
    await cache.put(request, response.clone());
  }
  
  return response;
}

// Network First strategy
async function networkFirst(request, cacheName, maxAge = CACHE_DURATION.default) {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Add cache headers
      const responseWithHeaders = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...response.headers,
          'sw-cache-time': Date.now(),
          'sw-max-age': maxAge
        }
      });
      
      await cache.put(request, responseWithHeaders.clone());
      return responseWithHeaders;
    }
    
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    
    if (cached) {
      const cacheTime = parseInt(cached.headers.get('sw-cache-time') || '0');
      const maxAgeMs = parseInt(cached.headers.get('sw-max-age') || CACHE_DURATION.default) * 1000;
      
      if (Date.now() - cacheTime < maxAgeMs) {
        return cached;
      }
    }
    
    throw error;
  }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Always try to fetch in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cached) {
    return cached;
  }
  
  // Otherwise wait for network
  return await fetchPromise;
}

// Helper functions
function isCriticalAsset(pathname) {
  return CRITICAL_ASSETS.some(asset => pathname === asset || pathname.endsWith(asset));
}

function isStaticAsset(pathname) {
  return Object.values(CACHE_PATTERNS).some(pattern => pattern.test(pathname));
}

function isPageRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

async function getCachedPage() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const pages = await cache.keys();
  
  // Try to find any cached page
  for (const page of pages) {
    if (isPageRequest(page)) {
      return await cache.match(page);
    }
  }
  
  return null;
}

function createOfflinePage() {
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Offline - Lylia</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            text-align: center;
            background: #f8fafc;
            color: #1e293b;
          }
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 2rem;
          }
          .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          h1 {
            margin-bottom: 0.5rem;
            color: #0f172a;
          }
          p {
            color: #64748b;
            line-height: 1.6;
          }
          button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            margin-top: 1rem;
          }
          button:hover {
            background: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">🤖</div>
          <h1>You're Offline</h1>
          <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
          <button onclick="window.location.reload()">Try Again</button>
        </div>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    }
  });
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Implement background sync logic here if needed
}

// Push notifications (if needed later)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/favicon/android-chrome-192x192.png',
        badge: '/images/favicon/favicon-32x32.png'
      })
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('/')
  );
});