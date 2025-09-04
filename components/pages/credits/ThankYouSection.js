// File: /components/pages/credits/ThankYouSection.js
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function ThankYouSection({ botName, isDark, variants }) {
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
    "px-5 py-2.5",
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
    <motion.div variants={variants} className="mb-8">
      <motion.div
        className="rounded-[20px] border relative overflow-hidden text-center py-8"
        style={getCardStyle()}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        <div className="p-5">
          <motion.div 
            className="text-red-500 mx-auto mb-4"
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Heart 
              size={28} 
              className="fill-red-500 animate-pulse-slow mx-auto" 
              style={{ animationDuration: '1.5s' }}
            />
          </motion.div>
          <h2 className={clsx(
            "text-xl font-medium mb-2",
            isDark ? "text-white" : "text-gray-900"
          )}>
            {botName} is crafted with care
          </h2>
          <p className={clsx(
            "mb-6",
            isDark ? "text-gray-400" : "text-gray-700"
          )}>
            We hope it brings intelligence and joy to your Discord server!
          </p>
          
          <motion.div>
            <Link href="/" legacyBehavior>
              <motion.a
                className={buttonClasses}
                whileHover={{ 
                  boxShadow: hoverBoxShadow,
                  scale: 1.02 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.a>
            </Link>
          </motion.div>
        </div>
        
        {/* Blue highlight line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
        ></div>
      </motion.div>
    </motion.div>
  );
}
