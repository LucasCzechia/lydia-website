import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';

export default function FeatureCard({ feature }) {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';
  const Icon = feature.icon;

  const badgeType = feature.badgeType || 'NEW';
  const isPro = badgeType === 'PRO';

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)'
        };
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[20px] h-full cursor-pointer border"
      style={getCardStyle()}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-[12px] flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${isDark ? feature.bgGradient : feature.lightBgGradient})`,
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: isDark 
                ? 'rgba(139, 92, 246, 0.25) 0px 4px 16px 0px' 
                : 'rgba(139, 92, 246, 0.15) 0px 4px 16px 0px'
            }}
          >
            <Icon size={24} className={isDark ? feature.color : feature.lightColor} />
          </div>
          
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={isHovered ? { rotate: [0, 15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <ArrowRight size={20} className={clsx(
              isDark ? "text-white/60" : "text-gray-600/60"
            )} />
          </motion.div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={clsx(
              "text-xl font-semibold",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {feature.title}
            </h3>

            <div
              className={clsx(
                "px-2 py-0.5 text-xs font-medium text-white rounded-lg",
                "border-2 border-white/15 backdrop-filter backdrop-blur-sm",
                isPro ? "bg-[#8B5CF6]" : "bg-[#8B5CF6]"
              )}
            >
              {badgeType}
            </div>
          </div>
          
          <p className={clsx(
            "text-sm font-medium",
            isDark ? "text-white/60" : "text-gray-600"
          )}>
            {feature.subtitle}
          </p>
        </div>

        <p className={clsx(
          "text-sm mb-6 leading-relaxed flex-grow",
          isDark ? "text-white/70" : "text-gray-700"
        )}>
          {feature.description}
        </p>

        <div className="space-y-2">
          {feature.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className={clsx(
                "flex items-center text-xs",
                isDark ? "text-white/60" : "text-gray-600"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <CheckCircle size={14} className={clsx(
                "mr-2 flex-shrink-0",
                isDark ? feature.color : feature.lightColor
              )} />
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)` }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${isDark ? feature.bgGradient : feature.lightBgGradient})`,
          opacity: 0
        }}
        animate={{
          opacity: isHovered ? 0.1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
