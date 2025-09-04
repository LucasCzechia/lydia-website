import { useState, useEffect, useCallback, useRef } from 'react';

export function useAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const mounted = useRef(true);
  
  const loadAnalyticsPreference = useCallback(() => {
    if (typeof window === 'undefined' || !mounted.current) return;
    
    try {
      const cookieConsentSet = localStorage.getItem('cookieConsentSet') === 'true';
      if (cookieConsentSet) {
        const cookiePreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        const isEnabled = cookiePreferences?.analytics === true;
        if (mounted.current) {
          setAnalyticsEnabled(isEnabled);
        }
      } else {
        if (mounted.current) {
          setAnalyticsEnabled(false);
        }
      }
    } catch (error) {
      console.error('Error loading analytics preferences:', error);
      if (mounted.current) {
        setAnalyticsEnabled(false);
      }
    }
  }, []);

  useEffect(() => {
    loadAnalyticsPreference();

    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleStorageChange = (event) => {
      if (!mounted.current) return;
      
      // Debounce rapid storage events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (event.key === 'cookiePreferences' && mounted.current) {
          loadAnalyticsPreference();
        }
      }, 50);
    };

    const handleAnalyticsChange = (event) => {
      if (!mounted.current) return;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (event.detail && typeof event.detail.enabled === 'boolean' && mounted.current) {
          setAnalyticsEnabled(event.detail.enabled);
        }
      }, 50);
    };

    window.addEventListener('storage', handleStorageChange, { passive: true });
    window.addEventListener('analyticsPrefChanged', handleAnalyticsChange, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('analyticsPrefChanged', handleAnalyticsChange);
    };
  }, [loadAnalyticsPreference]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const setAnalytics = useCallback((enabled) => {
    if (typeof window === 'undefined' || !mounted.current) return;
    
    try {
      setAnalyticsEnabled(enabled);

      const currentPrefs = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
      currentPrefs.analytics = enabled;

      const prefsString = JSON.stringify(currentPrefs);
      localStorage.setItem('cookiePreferences', prefsString);
      localStorage.setItem('cookieConsentSet', 'true');
      localStorage.setItem('cookieConsentChoice', 'true');

      // Dispatch events with error handling
      try {
        window.dispatchEvent(new CustomEvent('analyticsPrefChanged', {
          detail: { enabled }
        }));

        window.dispatchEvent(new StorageEvent('storage', {
          key: 'cookiePreferences',
          newValue: prefsString
        }));
      } catch (eventError) {
        console.error('Error dispatching analytics events:', eventError);
      }

    } catch (error) {
      console.error('Error setting analytics preference:', error);
    }
  }, []);

  return {
    analyticsEnabled,
    setAnalytics
  };
}