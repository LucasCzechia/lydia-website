import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';
import UniversalCard from '../ui/UniversalCard';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = "text-blue-500", 
  subtitle,
  trend,
  trendValue,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

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

  if (loading) {
    return (
      <div
        className="rounded-[20px] border relative overflow-hidden p-6 animate-pulse"
        style={getCardStyle()}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  const getTrendColor = () => {
    if (!trend) return '';
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'neutral': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = () => {
    if (!trend || !trendValue) return null;
    const isPositive = trend === 'up';
    return (
      <span className={clsx('text-xs font-medium', getTrendColor())}>
        {isPositive ? '↗' : '↘'} {trendValue}
      </span>
    );
  };

  return (
    <motion.div
      className={clsx("rounded-[20px] border relative overflow-hidden p-6", className)}
      style={getCardStyle()}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={clsx("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-600")}>
            {title}
          </p>
          <p className={clsx("text-2xl font-bold mt-1", isDark ? "text-white" : "text-gray-900")}>
            {value}
          </p>
          {(subtitle || getTrendIcon()) && (
            <div className="flex items-center justify-between mt-1">
              {subtitle && (
                <p className={clsx("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>
                  {subtitle}
                </p>
              )}
              {getTrendIcon()}
            </div>
          )}
        </div>
        <div className={clsx("p-3 rounded-full flex-shrink-0", isDark ? "bg-primary/30" : "bg-blue-50")}>
          {Icon && <Icon size={24} className={color} />}
        </div>
      </div>
      
      {/* Hover effect line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ 
          background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' 
        }}
      />
    </motion.div>
  );
};

export default StatCard;