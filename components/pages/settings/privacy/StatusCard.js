// File: /components/pages/settings/privacy/StatusCard.js
import { motion } from 'framer-motion';
import { Eye, EyeOff, Settings as SettingsIcon, Download, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

export default function StatusCard({ 
  analyticsEnabled, 
  preferencesEnabled, 
  handleTogglePreference, 
  exportData, 
  resetAllData, 
  botName, 
  isDark, 
  variants 
}) {
  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)'
        };
  };

  // Framer Home-style button styling
  const buttonClasses = clsx(
    "inline-flex items-center justify-center",
    "text-sm font-medium",
    "px-4 py-2",
    "rounded-[10px]",
    "border-[2px] border-solid",
    "transition-all duration-200 ease-out",
    isDark 
      ? "bg-[#0055FF] border-white/15 text-white shadow-[0px_4px_20px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)]" 
      : "bg-[#0055FF] border-blue-400/20 text-white shadow-[0px_4px_20px_0px_rgba(0,85,255,0.3),0px_0px_0px_1px_rgba(0,85,255,0.1)]"
  );
  
  const hoverBoxShadow = isDark
    ? "0px 8px 30px 0px rgba(0,85,255,0.7), inset 0px 0px 10px 1px rgba(255,255,255,0.3), 0px 0px 0px 3px rgba(0,85,255,0.2)"
    : "0px 8px 30px 0px rgba(0,85,255,0.5), inset 0px 0px 5px 1px rgba(255,255,255,0.5), 0px 0px 0px 3px rgba(0,85,255,0.2)";

  return (
    <motion.div
      variants={variants}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6 rounded-[20px] border relative overflow-hidden"
      style={getCardStyle()}
    >
      <div className="p-6">
        <h2 className={clsx(
          "text-lg font-semibold mb-6",
          isDark ? "text-white" : "text-gray-900"
        )}>
          Privacy Status
        </h2>

        {/* Analytics Toggle */}
        <motion.div 
          className={clsx(
            "flex items-center justify-between p-4 rounded-xl mb-3 border transition-colors",
            isDark 
              ? "bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40" 
              : "bg-blue-50 border-blue-200 hover:border-blue-300"
          )}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center">
            {analyticsEnabled ? (
              <Eye size={18} className="text-blue-500 mr-3" />
            ) : (
              <EyeOff size={18} className={isDark ? "text-gray-500 mr-3" : "text-gray-600 mr-3"} />
            )}
            <div>
              <span className={clsx(
                "text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-800"
              )}>
                Analytics Tracking: 
              </span>
              <span className={clsx(
                "ml-1.5 text-sm font-medium",
                analyticsEnabled 
                  ? "text-blue-500" 
                  : isDark ? "text-gray-500" : "text-gray-600"
              )}>
                {analyticsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
          <div>
            <motion.button
              onClick={() => handleTogglePreference('analytics')}
              className={clsx(
                "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none",
                analyticsEnabled 
                  ? "bg-blue-500" 
                  : isDark ? "bg-gray-600" : "bg-gray-300"
              )}
              role="switch"
              aria-checked={analyticsEnabled}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="inline-block w-4 h-4 transform bg-white rounded-full"
                initial={false} // Prevent initial animation
                animate={{ x: analyticsEnabled ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }} // Faster animation
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Preferences Toggle */}
        <motion.div 
          className={clsx(
            "flex items-center justify-between p-4 rounded-xl mb-4 border transition-colors",
            isDark 
              ? "bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40" 
              : "bg-blue-50 border-blue-200 hover:border-blue-300"
          )}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center">
            {preferencesEnabled ? (
              <SettingsIcon size={18} className="text-blue-500 mr-3" />
            ) : (
              <SettingsIcon size={18} className={isDark ? "text-gray-500 mr-3" : "text-gray-600 mr-3"} />
            )}
            <div>
              <span className={clsx(
                "text-sm font-medium",
                isDark ? "text-gray-300" : "text-gray-800"
              )}>
                Site Preferences: 
              </span>
              <span className={clsx(
                "ml-1.5 text-sm font-medium",
                preferencesEnabled 
                  ? "text-blue-500" 
                  : isDark ? "text-gray-500" : "text-gray-600"
              )}>
                {preferencesEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
          <div>
            <motion.button
              onClick={() => handleTogglePreference('preferences')}
              className={clsx(
                "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none",
                preferencesEnabled 
                  ? "bg-blue-500" 
                  : isDark ? "bg-gray-600" : "bg-gray-300"
              )}
              role="switch"
              aria-checked={preferencesEnabled}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="inline-block w-4 h-4 transform bg-white rounded-full"
                initial={false} // Prevent initial animation
                animate={{ x: preferencesEnabled ? 22 : 3 }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }} // Faster animation
              />
            </motion.button>
          </div>
        </motion.div>

        <p className={clsx(
          "text-sm mb-3",
          isDark ? "text-gray-400" : "text-gray-700"
        )}>
          When Analytics are enabled, we collect anonymous usage data to improve {botName}.
        </p>

        <p className={clsx(
          "text-sm mb-5",
          isDark ? "text-gray-400" : "text-gray-700"
        )}>
          When Site Preferences are disabled, your theme will reset to dark mode and customizations will be unavailable.
        </p>

        {/* Action Buttons */}
        <div className="border-t border-gray-800/30 dark:border-gray-700/50 pt-5 flex flex-col sm:flex-row gap-3">
          {/* Export button with new design */}
          <motion.button
            onClick={exportData}
            className={buttonClasses}
            whileHover={{ 
              boxShadow: hoverBoxShadow,
              scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} className="mr-1.5" />
            Export My Data
          </motion.button>

          <motion.button
            onClick={resetAllData}
            className={clsx(
              "flex items-center justify-center text-sm",
              isDark ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={16} className="mr-1.5" />
            Reset All Data
          </motion.button>
        </div>
      </div>
      
      {/* Blue highlight line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      ></div>
    </motion.div>
  );
}
