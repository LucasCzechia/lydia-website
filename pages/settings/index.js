import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import { ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAppTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { getConfig, getBotName } from '../../utils/configUtils';

import SettingsSection from '../../components/pages/settings/SettingsSection';
import PreferencesWarning from '../../components/pages/settings/PreferencesWarning';
import ThemeButtonGroup from '../../components/pages/settings/ThemeButtonGroup';
import CompactModeToggle from '../../components/pages/settings/CompactModeToggle';

const AnimatedBackground = dynamic(
  () => import('../../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Settings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { compactMode, setCompactMode, preferencesEnabled } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const botName = getBotName();
  const botVersion = getConfig('bot.version', '1.0.2');
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCompactModeChange = (e) => {
    if (preferencesEnabled) {
      const newValue = e.target.checked;
      setCompactMode(newValue);
    }
  };

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)'
        };
  };

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          name: "Theme",
          description: "Choose between light, dark, and system mode",
          component: mounted && (
            <ThemeButtonGroup
              theme={theme}
              setTheme={setTheme}
              preferencesEnabled={preferencesEnabled}
              isDark={isDark}
            />
          )
        },
        {
          name: "Compact Mode",
          description: "Reduce spacing and size of UI elements",
          component: mounted && (
            <CompactModeToggle
              compactMode={compactMode}
              handleChange={handleCompactModeChange}
              preferencesEnabled={preferencesEnabled}
              isDark={isDark}
            />
          )
        }
      ]
    },
    {
      title: "Privacy & Data",
      items: [
        {
          name: "Data Collection",
          description: "Manage what data is collected",
          href: "/settings/privacy"
        },
        {
          name: "Clear All Data",
          description: "Delete all locally stored data",
          component: (
            <motion.button
              className={isDark ? "text-red-400 text-sm font-medium hover:text-red-300" : "text-red-500 text-sm font-medium hover:text-red-600"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (window.confirm('This will clear all locally stored settings. Continue?')) {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Clear
            </motion.button>
          )
        }
      ]
    },
    {
      title: "Legal",
      items: [
        {
          name: "Terms of Service",
          description: "View our terms of service",
          href: getConfig('urls.nav.terms')
        },
        {
          name: "Privacy Policy",
          description: "View our privacy policy",
          href: getConfig('urls.nav.privacy')
        }
      ]
    },
    {
      title: "About",
      items: [
        {
          name: "Version",
          description: `Current version of ${botName}`,
          component: (
            <span className={clsx(
              "text-sm",
              isDark ? "text-blue-400" : "text-blue-600"
            )}>
              v{botVersion}
            </span>
          )
        },
        {
          name: "Credits",
          description: "View credits and acknowledgements",
          href: getConfig('urls.nav.credits')
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  if (!mounted) {
    return (
      <Layout title={`Settings - ${botName}`}>
        <div className="max-w-3xl mx-auto px-4 pt-20">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <div className="animate-pulse">
            <div className="h-10 bg-blue-900/20 dark:bg-blue-900/20 bg-blue-100/50 rounded-2xl mb-4"></div>
            <div className="h-32 bg-blue-900/20 dark:bg-blue-900/20 bg-blue-100/50 rounded-2xl mb-8"></div>
            <div className="h-10 bg-blue-900/20 dark:bg-blue-900/20 bg-blue-100/50 rounded-2xl mb-4"></div>
            <div className="h-32 bg-blue-900/20 dark:bg-blue-900/20 bg-blue-100/50 rounded-2xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Settings - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        <div className="max-w-3xl mx-auto px-4 pt-20">
          {!isLoading && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className={clsx(
                  "text-3xl md:text-4xl font-bold",
                  isDark ? "text-white" : "text-gray-900"
                )}>Settings</h1>
              </motion.div>

              {!preferencesEnabled && (
                <PreferencesWarning isDark={isDark} variants={itemVariants} />
              )}

              {settingsSections.map((section, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  className="mb-8"
                >
                  <h2 className={clsx(
                    "text-xl font-medium mb-4",
                    isDark ? "text-white/90" : "text-gray-800"
                  )}>
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="relative overflow-hidden rounded-[20px] border transition-colors"
                        style={getCardStyle()}
                        whileHover={{ 
                          scale: 1.01,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                      >
                        <div className="flex items-center justify-between p-5">
                          <div className="flex-1 mr-4">
                            <h3 className={clsx(
                              "font-medium",
                              isDark ? "text-white" : "text-gray-800"
                            )}>
                              {item.name}
                            </h3>
                            <p className={clsx(
                              "text-sm",
                              isDark ? "text-white/60" : "text-gray-600"
                            )}>
                              {item.description}
                            </p>
                          </div>

                          {item.component && (
                            <div className="flex-shrink-0">{item.component}</div>
                          )}

                          {item.href && (
                            <a 
                              href={item.href} 
                              className={clsx(
                                "p-2 rounded-full flex-shrink-0 transition-colors",
                                isDark
                                  ? "text-white/60 hover:text-white/90 hover:bg-white/5"
                                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                              )}
                            >
                              <ChevronRight size={20} />
                            </a>
                          )}
                        </div>
                        
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
