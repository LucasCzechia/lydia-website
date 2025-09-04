import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export default function SectionHeader({
  tagline,
  title,
  subtitle,
  center = true,
  variants = {},
}) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const textAlignment = center ? 'text-center' : 'text-left';
  const marginAuto = center ? 'mx-auto' : '';
  
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className={clsx("mb-10 md:mb-16", textAlignment)}>
      <motion.div
        className="relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden backdrop-blur-lg"
        style={{
          backgroundColor: isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(248, 247, 255, 0.9)',
          borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.6)'
        }}
        variants={variants}
      >
        <span className="w-2 h-2 bg-primary rounded-full mr-2.5"></span>
        <span 
          className="text-sm font-medium"
          style={{ color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgb(139, 92, 246)' }}
        >
          {tagline}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)'
          }}
        ></div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight"
        style={{ color: isDark ? '#ffffff' : '#111827' }}
        variants={variants}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={clsx(
            "text-lg md:text-xl max-w-2xl",
            marginAuto
          )}
          style={{ color: isDark ? 'rgb(156, 163, 175)' : 'rgb(55, 65, 81)' }}
          variants={variants}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
