import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

const ThemeContext = createContext({
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: () => {},
  compactMode: false,
  setCompactMode: () => {},
  mounted: false,
  preferencesEnabled: true,
  setPreferencesEnabled: () => {},
});

// Debounce utility for localStorage writes
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// CSS custom properties cache
let cssPropertiesCache = null;

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [compactMode, setCompactModeState] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preferencesEnabled, setPreferencesEnabledState] = useState(true);

  // Memoize the resolved theme calculation
  const actualResolvedTheme = useMemo(() => {
    if (!mounted) return 'dark';
    if (theme === 'system') return systemTheme || 'dark';
    return theme || 'dark';
  }, [theme, systemTheme, mounted]);

  // Memoize body class toggle function
  const toggleBodyCompactClass = useCallback((isCompact, arePrefsEnabled) => {
    if (typeof document === 'undefined') return;
    
    const shouldHaveCompact = arePrefsEnabled && isCompact;
    const hasCompact = document.body.classList.contains('compact-mode');
    
    if (shouldHaveCompact && !hasCompact) {
      document.body.classList.add('compact-mode');
    } else if (!shouldHaveCompact && hasCompact) {
      document.body.classList.remove('compact-mode');
    }
  }, []);

  // Debounced localStorage operations
  const debouncedSetCompactMode = useMemo(
    () => debounce((value) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('compactMode', String(value));
        } catch (error) {
          console.error('Failed to save compact mode preference:', error);
        }
      }
    }, 100),
    []
  );

  const debouncedSetPreferences = useMemo(
    () => debounce((prefs) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
          localStorage.setItem('cookieConsentSet', 'true');
          localStorage.setItem('cookieConsentChoice', 'true');
        } catch (error) {
          console.error('Failed to save preferences:', error);
        }
      }
    }, 100),
    []
  );

  // Optimized preference loading
  const loadPreferences = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const cookieConsentSet = localStorage.getItem('cookieConsentSet') === 'true';
      let prefsEnabled = true;
      let savedCompactMode = false;

      if (cookieConsentSet) {
        const cookiePreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        prefsEnabled = cookiePreferences?.preferences !== false;
      }

      if (prefsEnabled) {
        savedCompactMode = localStorage.getItem('compactMode') === 'true';
      }

      // Batch state updates to prevent multiple re-renders
      setPreferencesEnabledState(prefsEnabled);
      setCompactModeState(savedCompactMode);
      toggleBodyCompactClass(savedCompactMode, prefsEnabled);

    } catch (error) {
      console.error('Error loading preferences:', error);
      // Fallback to defaults
      setPreferencesEnabledState(true);
      setCompactModeState(false);
      toggleBodyCompactClass(false, true);
    }
  }, [toggleBodyCompactClass]);

  // Initialize mounting state
  useEffect(() => {
    setMounted(true);
    loadPreferences();
  }, [loadPreferences]);

  // Optimized CSS custom properties update
  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;

    const isDark = actualResolvedTheme === 'dark';
    const cacheKey = isDark ? 'dark' : 'light';
    
    // Skip if we've already applied these properties
    if (cssPropertiesCache === cacheKey) return;
    
    const root = document.documentElement;
    const properties = isDark ? {
      '--background': '#000000',
      '--foreground': '#FFFFFF',
      '--card': '#111111',
      '--card-hover': '#1A1A1A',
      '--card-border': '#333333',
      '--gray-300': '#D1D5DB',
      '--gray-400': '#9CA3AF',
      '--gray-500': '#6B7280'
    } : {
      '--background': '#FFFFFF',
      '--foreground': '#121212',
      '--card': '#F5F5F5',
      '--card-hover': '#EEEEEE',
      '--card-border': '#9CA3AF',
      '--gray-300': '#303030',
      '--gray-400': '#222222',
      '--gray-500': '#171717'
    };

    // Batch DOM updates
    Object.entries(properties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    cssPropertiesCache = cacheKey;
  }, [mounted, actualResolvedTheme]);

  // Optimized storage event listener
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    let timeoutId = null;
    
    const handlePreferencesChange = (event) => {
      // Debounce multiple rapid storage events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (event?.key === 'cookiePreferences' || 
            event?.type === 'preferencesChanged' || 
            event?.key === 'compactMode') {
          loadPreferences();
        }
      }, 50);
    };

    window.addEventListener('storage', handlePreferencesChange, { passive: true });
    window.addEventListener('preferencesChanged', handlePreferencesChange, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handlePreferencesChange);
      window.removeEventListener('preferencesChanged', handlePreferencesChange);
    };
  }, [mounted, loadPreferences]);

  // Memoized callback functions
  const setThemeIfAllowed = useCallback((newTheme) => {
    if (preferencesEnabled) {
      setTheme(newTheme);
    }
  }, [preferencesEnabled, setTheme]);

  const setCompactMode = useCallback((newValue) => {
    if (!preferencesEnabled || typeof window === 'undefined') return;

    setCompactModeState(newValue);
    toggleBodyCompactClass(newValue, true);
    debouncedSetCompactMode(newValue);

    // Dispatch event for cross-tab synchronization
    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'compactMode',
        newValue: String(newValue)
      }));
    } catch (error) {
      console.error('Failed to dispatch storage event:', error);
    }
  }, [preferencesEnabled, toggleBodyCompactClass, debouncedSetCompactMode]);

  const setPreferencesEnabled = useCallback((enabled) => {
    if (typeof window === 'undefined') return;
    
    try {
      setPreferencesEnabledState(enabled);

      const currentPrefs = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
      currentPrefs.preferences = enabled;
      
      debouncedSetPreferences(currentPrefs);

      // Dispatch events for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('preferencesChanged', { detail: { enabled } }));
      window.dispatchEvent(new StorageEvent('storage', { 
        key: 'cookiePreferences', 
        newValue: JSON.stringify(currentPrefs) 
      }));

      if (!enabled) {
        setCompactModeState(false);
        toggleBodyCompactClass(false, false);
      } else {
        const savedCompactMode = localStorage.getItem('compactMode') === 'true';
        setCompactModeState(savedCompactMode);
        toggleBodyCompactClass(savedCompactMode, true);
      }

    } catch (error) {
      console.error('Error setting preferencesEnabled:', error);
    }
  }, [debouncedSetPreferences, toggleBodyCompactClass]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme: theme || 'dark',
    resolvedTheme: actualResolvedTheme,
    setTheme: setThemeIfAllowed,
    compactMode,
    setCompactMode,
    mounted,
    preferencesEnabled,
    setPreferencesEnabled
  }), [
    theme,
    actualResolvedTheme,
    setThemeIfAllowed,
    compactMode,
    setCompactMode,
    mounted,
    preferencesEnabled,
    setPreferencesEnabled
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};