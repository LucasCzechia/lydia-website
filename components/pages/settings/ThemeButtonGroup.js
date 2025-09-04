// File: /components/pages/settings/ThemeButtonGroup.js
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Lock } from 'lucide-react';
import clsx from 'clsx';

export default function ThemeButtonGroup({ theme, setTheme, preferencesEnabled, isDark }) {
  const getThemeButtonClasses = (buttonTheme) => {
    const isActive = theme === buttonTheme;

    if (!preferencesEnabled) {
      return isDark 
        ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-60 border border-transparent'
        : 'bg-gray-200/50 text-gray-400 cursor-not-allowed opacity-60 border border-transparent';
    }
    
    if (isActive) {
      return 'bg-[#0055FF] text-white border border-white/15 shadow-[0px_0px_15px_0px_rgba(0,85,255,0.5)]';
    }
    
    return isDark
      ? 'bg-gray-800/30 text-gray-300 border border-white/5 hover:bg-gray-700/50 hover:border-white/10'
      : 'bg-gray-100 text-gray-600 border border-gray-300/50 hover:bg-gray-200 hover:border-gray-400/50';
  };

  const handleThemeChange = (newTheme) => {
    if (preferencesEnabled) {
      setTheme(newTheme);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={() => handleThemeChange('dark')}
        className={clsx(
          "p-2 rounded-lg transition-all duration-150 ease-in-out",
          getThemeButtonClasses('dark')
        )}
        aria-label="Dark Mode"
        disabled={!preferencesEnabled}
        whileHover={preferencesEnabled ? { scale: 1.05 } : {}}
        whileTap={preferencesEnabled ? { scale: 0.95 } : {}}
        initial={false} // Prevent initial animation
      >
        <Moon size={16} />
      </motion.button>
      <motion.button
        onClick={() => handleThemeChange('light')}
        className={clsx(
          "p-2 rounded-lg transition-all duration-150 ease-in-out",
          getThemeButtonClasses('light')
        )}
        aria-label="Light Mode"
        disabled={!preferencesEnabled}
        whileHover={preferencesEnabled ? { scale: 1.05 } : {}}
        whileTap={preferencesEnabled ? { scale: 0.95 } : {}}
        initial={false} // Prevent initial animation
      >
        <Sun size={16} />
      </motion.button>
      <motion.button
        onClick={() => handleThemeChange('system')}
        className={clsx(
          "p-2 rounded-lg transition-all duration-150 ease-in-out",
          getThemeButtonClasses('system')
        )}
        aria-label="System Mode"
        disabled={!preferencesEnabled}
        whileHover={preferencesEnabled ? { scale: 1.05 } : {}}
        whileTap={preferencesEnabled ? { scale: 0.95 } : {}}
        initial={false} // Prevent initial animation
      >
        <Monitor size={16} />
      </motion.button>

      {!preferencesEnabled && (
        <div className="ml-2 flex items-center text-amber-500 text-xs">
          <Lock size={12} className="mr-1" />
          <span>Disabled</span>
        </div>
      )}
    </div>
  );
}
