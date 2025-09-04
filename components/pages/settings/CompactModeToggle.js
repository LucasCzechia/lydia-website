// File: /components/pages/settings/CompactModeToggle.js
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import clsx from 'clsx';

export default function CompactModeToggle({ compactMode, handleChange, preferencesEnabled, isDark }) {
  return (
    <div className="flex items-center">
      <label className={clsx(
        "relative inline-flex items-center",
        !preferencesEnabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      )}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={compactMode}
          onChange={handleChange}
          disabled={!preferencesEnabled}
        />
        <div className={clsx(
          "w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors",
          !preferencesEnabled
            ? isDark ? "bg-gray-800/50" : "bg-gray-300" // Disabled background
            : compactMode
              ? "bg-[#0055FF]" // Enabled and checked
              : isDark ? "bg-gray-700" : "bg-gray-400" // Enabled and unchecked
        )}>
          <motion.span
            className="absolute w-4 h-4 bg-white rounded-full"
            initial={false} // Prevent initial animation
            animate={{ x: compactMode ? 22 : 3, y: 3 }}
            transition={{ type: "spring", stiffness: 700, damping: 30 }} // Faster spring animation
          />
        </div>
      </label>

      {!preferencesEnabled && (
        <div className="ml-3 flex items-center text-amber-500 text-xs">
          <Lock size={12} className="mr-1" />
          <span>Disabled</span>
        </div>
      )}
    </div>
  );
}
