import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';

const PremiumFeatureCard = ({ 
  feature, 
  index = 0,
  delay = 0.1,
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';
  const Icon = feature.icon;

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

  const getIconStyle = () => {
    return {
      background: isDark 
        ? 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.09) 0%, rgba(153, 153, 153, 0.09) 100%)'
        : 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(153, 153, 153, 0.05) 100%)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.07)',
      boxShadow: isDark 
        ? 'rgba(0, 85, 255, 0.35) 2px 4px 24px 0px'
        : 'rgba(0, 85, 255, 0.25) 2px 4px 24px 0px'
    };
  };

  return (
    <motion.div
      className="group rounded-[20px] border relative overflow-hidden p-6 h-full cursor-pointer"
      style={getCardStyle()}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * delay }}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="w-11 h-11 rounded-[12px] flex items-center justify-center"
          style={getIconStyle()}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon size={20} className={isDark ? feature.color : feature.lightColor} />
        </motion.div>

        <motion.div
          className={clsx(
            "px-2 py-0.5 text-xs font-medium text-white rounded-lg",
            "border-2 border-white/15 backdrop-filter backdrop-blur-sm bg-[#0055FF]"
          )}
          whileHover={{ scale: 1.05 }}
        >
          {feature.badgeType}
        </motion.div>
      </div>

      <h3 className={clsx(
        "text-lg font-semibold mb-2",
        isDark ? "text-white" : "text-gray-900"
      )}>
        {feature.title}
      </h3>

      <p className={clsx(
        "text-sm leading-relaxed",
        isDark ? "text-white/70 group-hover:text-white/80" : "text-gray-700 group-hover:text-gray-800"
      )}>
        {feature.description}
      </p>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)' }}
      />
    </motion.div>
  );
};

export default PremiumFeatureCard;