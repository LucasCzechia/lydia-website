// File: /components/pages/settings/SettingsCard.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function SettingsCard({ item, isDark }) {
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
      className={clsx(
        "relative overflow-hidden rounded-[20px] border transition-colors",
        isDark 
          ? "border-white/5 hover:border-white/10" 
          : "border-gray-200 hover:border-gray-300"
      )}
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
          <Link 
            href={item.href} 
            className={clsx(
              "p-2 rounded-full flex-shrink-0 transition-colors",
              isDark
                ? "text-white/60 hover:text-white/90 hover:bg-white/5"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            )}
          >
            <ChevronRight size={20} />
          </Link>
        )}
      </div>
      
      {/* Blue highlight line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      ></div>
    </motion.div>
  );
}
