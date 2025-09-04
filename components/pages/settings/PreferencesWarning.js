// File: /components/pages/settings/PreferencesWarning.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertCircle, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function PreferencesWarning({ isDark, variants }) {
  return (
    <motion.div 
      variants={variants}
      className={clsx(
        "border rounded-[20px] p-4 mb-6 flex items-start",
        isDark 
          ? "bg-amber-500/10 border-amber-500/30" 
          : "bg-amber-50 border-amber-200"
      )}
    >
      <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5 mr-3" />
      <div>
        <h3 className="font-medium text-amber-500 mb-1">Site Preferences Disabled</h3>
        <p className={clsx(
          "text-sm mb-2",
          isDark ? "text-gray-300" : "text-gray-700"
        )}>
          Theme and Compact Mode settings are currently disabled because you've turned off Site Preferences.
        </p>
        <Link
          href="/settings/privacy"
          className={clsx(
            "text-sm inline-flex items-center hover:underline",
            isDark ? "text-blue-400" : "text-blue-600"
          )}
        >
          Enable Site Preferences
          <ChevronRight size={14} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}
