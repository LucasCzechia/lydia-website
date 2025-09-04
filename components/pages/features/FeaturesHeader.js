import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';
import { getBotName } from '../../../utils/configUtils';

export default function FeaturesHeader({ variants }) {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="mb-10 md:mb-16 text-center">
      <motion.div
        className={clsx(
          "relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden",
          isDark 
            ? "bg-primary/50 backdrop-blur-lg border-primary/30"
            : "bg-primary/70 backdrop-blur-lg border-primary/50"
        )}
        variants={variants}
      >
        <Zap size={16} className="text-primary mr-2.5" />
        <span className={clsx(
          "text-sm font-medium",
          isDark ? "text-white/90" : "text-gray-800"
        )}>
          Powerful Features
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)'
          }}
        />
      </motion.div>

      <motion.h2
        className={clsx(
          "text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight",
          isDark ? "text-white" : "text-gray-900"
        )}
        variants={variants}
      >
        Everything {botName} Can Do
      </motion.h2>

      <motion.p
        className={clsx(
          "text-lg md:text-xl max-w-2xl mx-auto",
          isDark ? "text-gray-300" : "text-gray-600"
        )}
        variants={variants}
      >
        Discover the powerful image generation and editing capabilities powered by Google's Gemini 2.5 Flash Image (Nano Banana) technology.
      </motion.p>
    </div>
  );
}
