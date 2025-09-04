import { Sun, Moon, Monitor, LayoutGrid, Lock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppTheme } from '../../context/ThemeContext';
import { getConfig } from '../../utils/configUtils';

export default function ThemeDropdown({ theme, onThemeChange, compactMode, onCompactModeToggle, isMobile = false }) {
  const { preferencesEnabled } = useAppTheme();
  const themeOptions = getConfig('theme.options', ['light', 'dark', 'system']);
  
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: 8, 
      scale: isMobile ? 0.95 : 1 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: isMobile ? 0.15 : 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: 8, 
      scale: isMobile ? 0.95 : 1,
      transition: {
        duration: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleThemeChange = (newTheme) => {
    if (preferencesEnabled) {
      onThemeChange(newTheme);
    }
  };

  const handleToggleCompactMode = () => {
    if (preferencesEnabled) {
      onCompactModeToggle();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      className={`dropdown-menu right-0 ${isMobile ? 'fixed top-16 right-4' : 'mt-2'} w-48`}
    >
      <div className="py-1">
        {!preferencesEnabled && (
          <div className="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20">
            <div className="flex items-start">
              <Info size={14} className="text-amber-500 flex-shrink-0 mt-0.5 mr-1.5" />
              <p className="text-xs text-amber-500">
                Site Preferences are disabled. Visit Settings to enable.
              </p>
            </div>
          </div>
        )}
        
        <h3 className="px-4 py-1 text-xs uppercase font-semibold text-gray-500">Theme</h3>
        
        {themeOptions.includes('light') && (
          <motion.button 
            onClick={() => handleThemeChange('light')}
            className={`dropdown-item ${!preferencesEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            variants={itemVariants}
            whileHover={preferencesEnabled ? { 
              x: 2,
              transition: { duration: 0.1 }
            } : {}}
            style={{
              backgroundColor: "transparent"
            }}
            disabled={!preferencesEnabled}
          >
            <Sun size={isMobile ? 18 : 16} className="mr-2" />
            <span>{isMobile ? 'Light Mode' : 'Light'}</span>
            
            {theme === 'light' && preferencesEnabled && (
              <motion.span 
                className="ml-auto text-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                ✓
              </motion.span>
            )}
            
            {!preferencesEnabled && (
              <Lock size={14} className="ml-auto text-amber-500" />
            )}
          </motion.button>
        )}
        
        {themeOptions.includes('dark') && (
          <motion.button 
            onClick={() => handleThemeChange('dark')}
            className={`dropdown-item ${!preferencesEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            variants={itemVariants}
            whileHover={preferencesEnabled ? { 
              x: 2,
              transition: { duration: 0.1 }
            } : {}}
            style={{
              backgroundColor: "transparent"
            }}
            disabled={!preferencesEnabled}
          >
            <Moon size={isMobile ? 18 : 16} className="mr-2" />
            <span>{isMobile ? 'Dark Mode' : 'Dark'}</span>
            
            {theme === 'dark' && (
              <motion.span 
                className="ml-auto text-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                ✓
              </motion.span>
            )}
            
            {!preferencesEnabled && (
              <Lock size={14} className="ml-auto text-amber-500" />
            )}
          </motion.button>
        )}
        
        {themeOptions.includes('system') && (
          <motion.button 
            onClick={() => handleThemeChange('system')}
            className={`dropdown-item ${!preferencesEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            variants={itemVariants}
            whileHover={preferencesEnabled ? { 
              x: 2,
              transition: { duration: 0.1 }
            } : {}}
            style={{
              backgroundColor: "transparent"
            }}
            disabled={!preferencesEnabled}
          >
            <Monitor size={isMobile ? 18 : 16} className="mr-2" />
            <span>{isMobile ? 'System Mode' : 'System'}</span>
            
            {theme === 'system' && preferencesEnabled && (
              <motion.span 
                className="ml-auto text-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                ✓
              </motion.span>
            )}
            
            {!preferencesEnabled && (
              <Lock size={14} className="ml-auto text-amber-500" />
            )}
          </motion.button>
        )}
        
        <div className="my-1 border-t border-card-border"></div>
        
        <h3 className="px-4 py-1 text-xs uppercase font-semibold text-gray-500">Display</h3>
        <motion.button 
          onClick={handleToggleCompactMode}
          className={`dropdown-item ${!preferencesEnabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          variants={itemVariants}
          whileHover={preferencesEnabled ? { 
            x: 2,
            transition: { duration: 0.1 }
          } : {}}
          style={{
            backgroundColor: "transparent"
          }}
          disabled={!preferencesEnabled}
        >
          <LayoutGrid size={isMobile ? 18 : 16} className="mr-2" />
          <span>Compact Mode</span>
          
          {preferencesEnabled ? (
            <div className="ml-auto">
              <div className={`w-8 h-4 rounded-full transition-colors ${compactMode ? 'bg-primary' : 'bg-gray-600'} relative`}>
                <motion.div 
                  className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white"
                  animate={{ 
                    x: compactMode ? 16 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                />
              </div>
            </div>
          ) : (
            <Lock size={14} className="ml-auto text-amber-500" />
          )}
        </motion.button>
      </div>
      
      {!preferencesEnabled && (
        <div className="px-4 py-2 border-t border-card-border">
          <a 
            href="/settings/privacy"
            className="text-primary text-xs hover:underline w-full text-left block"
          >
            Enable Site Preferences
          </a>
        </div>
      )}
    </motion.div>
  );
}