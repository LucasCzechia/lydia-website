import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronRight, Shield, BarChart, Settings, Check } from 'lucide-react';
import Link from 'next/link';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { getConfig, getLegalInfo } from '../../utils/configUtils';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { analyticsEnabled, setAnalytics } = useAnalytics();
  const router = useRouter();
  const cookieTypes = getLegalInfo('cookies').types || [
    {
      id: "necessary",
      name: "Necessary",
      description: "Required for the website to function properly. Includes cookies for session management and basic features.",
      icon: Shield,
      required: true
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "We use Vercel Analytics and Speed Insights to collect anonymous usage data that helps us improve website performance and user experience.",
      icon: BarChart,
      required: false
    },
    {
      id: "preferences",
      name: "Preferences",
      description: "These cookies remember your settings like dark/light theme and compact mode preferences between visits.",
      icon: Settings,
      required: false
    }
  ];

  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    preferences: true
  });

  useEffect(() => {
    setMounted(true);

    const hasConsentChoice = localStorage.getItem('cookieConsentChoice') === 'true';
    const tempDismissed = sessionStorage.getItem('cookieConsentDismissed') === 'true';

    if (!hasConsentChoice && !tempDismissed) {
      setShowConsent(true);
    } else {
      try {
        const savedPreferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}');
        if (Object.keys(savedPreferences).length > 0) {
            setCookiePreferences({
                necessary: true,
                analytics: savedPreferences.analytics === true,
                preferences: savedPreferences.preferences === true
            });
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
        setCookiePreferences({
            necessary: true,
            analytics: true,
            preferences: true
        });
      }
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (sessionStorage.getItem('cookieConsentDismissed') === 'true' &&
          !localStorage.getItem('cookieConsentChoice') &&
          router.pathname !== '/privacy') {
        setTimeout(() => {
          setShowConsent(true);
          sessionStorage.removeItem('cookieConsentDismissed');
        }, 300);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (mounted) {
      setAnalytics(cookiePreferences.analytics);
    }
  }, [cookiePreferences.analytics, mounted, setAnalytics]);

  const handleLearnMore = () => {
    sessionStorage.setItem('cookieConsentDismissed', 'true');
    setShowConsent(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      preferences: true
    };
    setCookiePreferences(allAccepted);
    savePreferences(allAccepted);
    setShowConsent(false);
    setShowPreferences(false);
    localStorage.setItem('cookieConsentChoice', 'true');
  };

  const handleRejectNonEssential = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      preferences: false
    };
    setCookiePreferences(minimalPreferences);
    savePreferences(minimalPreferences);
    setShowConsent(false);
    setShowPreferences(false);
    localStorage.setItem('cookieConsentChoice', 'true');
  };

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences);
    setShowConsent(false);
    setShowPreferences(false);
    localStorage.setItem('cookieConsentChoice', 'true');
  };

  const savePreferences = (preferences) => {
    localStorage.setItem('cookieConsentSet', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setAnalytics(preferences.analytics);
    window.dispatchEvent(new CustomEvent('analyticsPrefChanged', {
      detail: { enabled: preferences.analytics }
    }));
    window.dispatchEvent(new CustomEvent('preferencesChanged', {
        detail: { enabled: preferences.preferences }
    }));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookiePreferences',
      newValue: JSON.stringify(preferences)
    }));
  };

  const handleTogglePreference = (key) => {
    if (key === 'necessary') return;
    setCookiePreferences({
      ...cookiePreferences,
      [key]: !cookiePreferences[key]
    });
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsentSet');
    localStorage.removeItem('cookieConsentChoice');
    localStorage.removeItem('cookiePreferences');
    sessionStorage.removeItem('cookieConsentDismissed');
    setShowConsent(true);
    setAnalytics(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {(showConsent || showPreferences) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[998] p-2 sm:p-4 md:p-6"
          style={{
            background: 'transparent',
            pointerEvents: 'none'
          }}
        >
          <div className="max-w-4xl mx-auto pointer-events-auto relative">
            <AnimatePresence>
              {showConsent && !showPreferences && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-card border border-card-border rounded-xl shadow-xl p-3 sm:p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-3 hidden md:flex">
                      <Cookie size={24} className="text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <div className="bg-primary/10 rounded-full p-1.5 sm:p-2 md:hidden">
                          <Cookie size={16} className="text-primary" />
                        </div>
                        <h2 className="text-base sm:text-lg md:text-xl font-bold">Cookie Preferences</h2>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">
                        We use cookies to enhance your experience and analyze site traffic with Vercel Analytics and Speed Insights.
                        By clicking "Accept All", you consent to our use of cookies.
                      </p>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <Link
                          href={getConfig('urls.nav.privacy', '/privacy')}
                          onClick={handleLearnMore}
                          className="text-primary hover:underline"
                        >
                          Learn more in our Privacy Policy
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-3 md:min-w-[200px] mt-3 md:mt-0">
                      <button
                        onClick={handleAcceptAll}
                        className="btn-primary text-xs sm:text-sm w-full py-1.5 sm:py-2"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={handleRejectNonEssential}
                        className="bg-transparent hover:bg-card-hover border border-card-border text-foreground text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-4 rounded-full transition-all w-full"
                      >
                        Necessary Only
                      </button>
                      <button
                        onClick={() => setShowPreferences(true)}
                        className="text-primary flex items-center justify-center text-xs sm:text-sm hover:underline"
                      >
                        Customize
                        <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showPreferences && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-card border border-card-border rounded-xl shadow-xl p-3 sm:p-4 md:p-6"
                >
                  <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-primary/10 rounded-full p-1.5 sm:p-2">
                        <Cookie size={16} className="text-primary" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold">Cookie Settings</h2>
                    </div>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-colors"
                    >
                      <X size={16} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6">
                    Customize which cookies you accept. Necessary cookies are required for the website to function properly.
                  </p>
                  <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 md:mb-6">
                    {cookieTypes.map((cookieType) => {
                      const Icon = cookieType.icon;
                      return (
                        <div
                          key={cookieType.id}
                          className="border border-card-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="bg-primary/10 rounded-full p-1.5 flex-shrink-0 mt-0.5">
                              <Icon size={14} className="text-primary" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">{cookieType.name}</h3>
                                <button
                                  onClick={() => handleTogglePreference(cookieType.id)}
                                  disabled={cookieType.id === 'necessary'}
                                  className={clsx(
                                    `relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none`,
                                    cookiePreferences[cookieType.id]
                                      ? cookieType.id === 'necessary' ? 'bg-gray-400 dark:bg-gray-500' : 'bg-primary'
                                      : 'bg-gray-300 dark:bg-gray-600',
                                    cookieType.id === 'necessary' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                                  )}
                                  role="switch"
                                  aria-checked={cookiePreferences[cookieType.id]}
                                >
                                  <span
                                    className={clsx(
                                      `inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform`,
                                      cookiePreferences[cookieType.id] ? 'translate-x-5' : 'translate-x-1'
                                    )}
                                  />
                                </button>
                              </div>
                              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-400 mt-0.5 sm:mt-1">
                                {cookieType.description}
                                {cookieType.required && (
                                  <span className="text-yellow-500 font-medium ml-1">Cannot be disabled.</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between">
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="order-2 sm:order-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-xs sm:text-sm"
                    >
                      Back
                    </button>
                    <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={handleRejectNonEssential}
                        className="bg-transparent hover:bg-card-hover border border-card-border text-foreground text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition-all"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={handleSavePreferences}
                        className="btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-4 sm:px-6 flex items-center justify-center"
                      >
                        <Check size={16} className="mr-1" />
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={resetConsent}
                className="absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-400 bg-card p-1 rounded"
              >
                Reset Cookie (dev)
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
