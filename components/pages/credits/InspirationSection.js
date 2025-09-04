// File: /components/pages/credits/InspirationSection.js
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function InspirationSection({ inspirationText, isDark, variants }) {
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
    <motion.div variants={variants} className="mb-12">
      <h2 className={clsx(
        "text-xl font-medium mb-4",
        isDark ? "text-white/90" : "text-gray-800"
      )}>
        Inspiration & Open Source
      </h2>
      <motion.div
        className="rounded-[20px] border relative overflow-hidden"
        style={getCardStyle()}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        <div className="p-5">
          <div className="flex items-start">
            <motion.div
              className={clsx(
                "text-primary flex-shrink-0 mr-3 mt-1 p-2 rounded-full",
                isDark ? "bg-primary/20" : "bg-primary/70"
              )}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <Sparkles size={20} />
            </motion.div>
            <p className={clsx(
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              {inspirationText}
            </p>
          </div>
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
