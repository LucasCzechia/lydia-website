// File: /components/pages/settings/privacy/PrivacyHeader.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

export default function PrivacyHeader({ botName, isDark, variants }) {
  return (
    <motion.div variants={variants} className="mb-8">
      <Link
        href="/settings"
        className={clsx(
          "inline-flex items-center mb-4 transition-colors",
          isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
        )}
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Settings
      </Link>
      
      <h1 className={clsx(
        "text-3xl md:text-4xl font-bold mb-2",
        isDark ? "text-white" : "text-gray-900"
      )}>
        Data Collection
      </h1>
      
      <p className={clsx(
        isDark ? "text-gray-400" : "text-gray-700"
      )}>
        Manage how {botName} collects and uses your data.
      </p>
    </motion.div>
  );
}
