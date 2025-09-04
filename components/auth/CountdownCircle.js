import { motion } from 'framer-motion';
import { useAppTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export default function CountdownCircle({ countdown, variant = 'success' }) {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';
  
  const size = 60;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((5 - countdown) / 5) * circumference;

  const getColors = () => {
    switch (variant) {
      case 'error':
        return {
          stroke: '#EF4444',
          fill: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
          glow: 'rgba(239, 68, 68, 0.3)',
          text: isDark ? '#FFFFFF' : '#1F2937'
        };
      case 'success':
      default:
        return {
          stroke: '#10B981',
          fill: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
          glow: 'rgba(16, 185, 129, 0.3)',
          text: isDark ? '#FFFFFF' : '#1F2937'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <svg
        width={size}
        height={size}
        className="relative z-10 transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill={colors.fill}
          stroke={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          strokeWidth={strokeWidth}
        />
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow})`
          }}
        />
      </svg>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.span
          className="text-xl font-bold"
          style={{ color: colors.text }}
          key={countdown}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {countdown}
        </motion.span>
      </motion.div>
    </div>
  );
}
