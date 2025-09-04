// File: /components/pages/settings/privacy/AboutDataCard.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { getConfig } from '../../../../utils/configUtils';

export default function AboutDataCard({ botName, isDark, variants }) {
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

  return (
    <motion.div 
      variants={variants}
      className="mb-6 rounded-[20px] border relative overflow-hidden"
      style={getCardStyle()}
    >
      <div className="p-6">
        <h2 className={clsx(
          "text-lg font-semibold mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}>
          About Your Data
        </h2>
        
        <p className={clsx(
          "text-sm mb-3",
          isDark ? "text-gray-400" : "text-gray-700"
        )}>
          {botName} is committed to protecting your privacy. We only collect the minimum amount of data necessary to provide and improve our service.
        </p>
        
        <p className={clsx(
          "text-sm mb-4",
          isDark ? "text-gray-400" : "text-gray-700"
        )}>
          All data is stored locally in your browser and is not shared with third parties except for anonymous analytics if enabled.
        </p>
        
        <Link
          href={getConfig('urls.nav.privacy')}
          className={clsx(
            "inline-flex items-center text-sm hover:underline",
            isDark ? "text-secondary" : "text-primary"
          )}
        >
          Read our full Privacy Policy
          <ChevronRight size={14} className="ml-1" />
        </Link>
      </div>
      
      {/* Blue highlight line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      ></div>
    </motion.div>
  );
}
