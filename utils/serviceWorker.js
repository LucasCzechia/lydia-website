// Service Worker registration and management
const isClient = typeof window !== 'undefined';
const isProduction = process.env.NODE_ENV === 'production';

export const registerServiceWorker = async () => {
  if (!isClient || !isProduction) {
    return false;
  }

  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('Service worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New service worker available');
              // Optionally show update notification to user
              showUpdateNotification();
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from service worker:', event.data);
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return false;
    }
  } else {
    console.log('Service workers not supported');
    return false;
  }
};

export const unregisterServiceWorker = async () => {
  if (!isClient) return;

  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered');
      }
    } catch (error) {
      console.error('Service worker unregistration failed:', error);
    }
  }
};

export const checkServiceWorkerSupport = () => {
  return isClient && 'serviceWorker' in navigator;
};

export const getServiceWorkerStatus = async () => {
  if (!isClient || !('serviceWorker' in navigator)) {
    return { supported: false, registered: false, active: false };
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    
    return {
      supported: true,
      registered: !!registration,
      active: !!registration?.active,
      waiting: !!registration?.waiting,
      installing: !!registration?.installing
    };
  } catch (error) {
    console.error('Error checking service worker status:', error);
    return { supported: true, registered: false, active: false, error: true };
  }
};

// Show update notification (customize as needed)
const showUpdateNotification = () => {
  if (!isClient) return;

  // Simple browser notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('App Update Available', {
      body: 'A new version of Lydia is available. Refresh to update.',
      icon: '/images/favicon/android-chrome-192x192.png',
      tag: 'app-update'
    });
  }

  // Console notification for development
  console.log('🚀 App update available! Refresh the page to get the latest version.');
  
  // You could also dispatch a custom event here for UI notifications
  window.dispatchEvent(new CustomEvent('app-update-available', {
    detail: { message: 'New version available' }
  }));
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!isClient || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Prefetch critical resources
export const prefetchCriticalResources = async () => {
  if (!isClient) return;

  const criticalResources = [
    '/images/lydia.webp',
    '/images/favicon/apple-touch-icon.png'
  ];

  try {
    await Promise.all(
      criticalResources.map(async (url) => {
        try {
          const response = await fetch(url, { 
            method: 'GET',
            mode: 'cors',
            cache: 'force-cache'
          });
          console.log(`Prefetched: ${url}`);
          return response;
        } catch (error) {
          console.warn(`Failed to prefetch ${url}:`, error);
        }
      })
    );
  } catch (error) {
    console.error('Error prefetching resources:', error);
  }
};

// Performance monitoring
export const measurePerformance = () => {
  if (!isClient || !('performance' in window)) return;

  try {
    // Measure key performance metrics
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
      // Navigation timing
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
      
      // Paint timing
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
      
      // Connection info
      connectionType: navigator.connection?.effectiveType,
      
      timestamp: Date.now()
    };

    console.log('Performance metrics:', metrics);

    // You could send these metrics to analytics
    // analytics.track('performance', metrics);

    return metrics;
  } catch (error) {
    console.error('Error measuring performance:', error);
    return null;
  }
};

// Initialize service worker and performance monitoring
export const initializePerformanceOptimizations = async () => {
  if (!isClient) return;

  try {
    // Register service worker
    await registerServiceWorker();
    
    // Prefetch critical resources
    await prefetchCriticalResources();
    
    // Measure performance after load
    window.addEventListener('load', () => {
      setTimeout(measurePerformance, 1000);
    });

    console.log('Performance optimizations initialized');
  } catch (error) {
    console.error('Error initializing performance optimizations:', error);
  }
};