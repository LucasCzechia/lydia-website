import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';
import { animationPresets } from '../../utils/motionConfig';
import ErrorBoundary from '../common/ErrorBoundary';

const UniversalCard = ({
  children,
  variant = 'default',
  size = 'md',
  hover = false,
  interactive = false,
  padding = 'md',
  className = '',
  onClick,
  as: Component = 'div',
  animate = true,
  loading = false,
  disabled = false,
  ...props
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  // Size variants
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  // Padding overrides
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  // Variant-specific styles
  const variantClasses = {
    default: clsx(
      'bg-card border border-card-border rounded-xl',
      hover && 'hover:bg-card-hover hover:shadow-lg',
      interactive && 'cursor-pointer hover:shadow-xl'
    ),
    
    stat: clsx(
      'bg-card border border-card-border rounded-xl',
      'hover:bg-card-hover hover:shadow-lg transition-all duration-200',
      interactive && 'cursor-pointer hover:scale-105'
    ),
    
    feature: clsx(
      'bg-card border border-card-border rounded-xl',
      'hover:bg-card-hover hover:shadow-xl transition-all duration-300',
      'backdrop-blur-sm',
      interactive && 'cursor-pointer hover:-translate-y-1'
    ),
    
    pricing: clsx(
      'bg-card border-2 rounded-2xl relative overflow-hidden',
      'hover:shadow-2xl transition-all duration-300',
      isDark ? 'border-card-border hover:border-primary/30' : 'border-card-border hover:border-primary/30',
      interactive && 'cursor-pointer hover:scale-105'
    ),
    
    testimonial: clsx(
      'bg-card border border-card-border rounded-xl',
      'hover:bg-card-hover transition-all duration-200',
      'backdrop-blur-sm shadow-sm'
    ),
    
    legal: clsx(
      'bg-card border border-card-border rounded-lg',
      'hover:bg-card-hover transition-colors duration-200'
    ),
    
    setting: clsx(
      'bg-card border border-card-border rounded-lg',
      'hover:bg-card-hover transition-all duration-200',
      interactive && 'cursor-pointer'
    ),
    
    chart: clsx(
      'bg-card border border-card-border rounded-xl',
      'backdrop-blur-sm shadow-sm',
      'hover:shadow-lg transition-shadow duration-300'
    ),
    
    dashboard: clsx(
      'bg-card border border-card-border rounded-xl',
      'hover:bg-card-hover hover:shadow-lg transition-all duration-200',
      'backdrop-blur-sm'
    ),
    
    minimal: clsx(
      'bg-transparent border border-card-border/50 rounded-lg',
      'hover:border-card-border hover:bg-card/50 transition-all duration-200'
    ),
    
    elevated: clsx(
      'bg-card border border-card-border rounded-xl shadow-lg',
      'hover:shadow-xl hover:bg-card-hover transition-all duration-300',
      'backdrop-blur-sm'
    ),
    
    glass: clsx(
      'backdrop-blur-md border rounded-xl shadow-lg',
      isDark 
        ? 'bg-gray-900/20 border-white/10' 
        : 'bg-white/20 border-black/10',
      'hover:shadow-xl transition-all duration-300'
    )
  };

  // Combine all classes
  const cardClasses = clsx(
    variantClasses[variant],
    paddingClasses[padding] || sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'animate-pulse',
    className
  );

  // Animation variants
  const motionProps = animate ? {
    variants: animationPresets.card,
    initial: "hidden",
    animate: "visible",
    whileHover: interactive || hover ? { y: -2 } : undefined,
    whileTap: interactive ? { scale: 0.98 } : undefined
  } : {};

  // Loading skeleton
  if (loading) {
    return (
      <div className={cardClasses} {...props}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Interactive card with motion
  if (interactive || onClick) {
    return (
      <ErrorBoundary minimal>
        <motion.div
          className={cardClasses}
          onClick={disabled ? undefined : onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick && !disabled ? 0 : undefined}
          onKeyDown={onClick && !disabled ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(e);
            }
          } : undefined}
          aria-disabled={disabled}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.div>
      </ErrorBoundary>
    );
  }

  // Static card with optional animation
  if (animate) {
    return (
      <ErrorBoundary minimal>
        <motion.div
          className={cardClasses}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.div>
      </ErrorBoundary>
    );
  }

  // Basic card without animation
  return (
    <ErrorBoundary minimal>
      <Component
        className={cardClasses}
        {...props}
      >
        {children}
      </Component>
    </ErrorBoundary>
  );
};

// Specialized card components for common use cases
export const StatCard = ({ title, value, change, trend, icon, ...props }) => (
  <UniversalCard variant="stat" {...props}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change !== undefined && (
          <p className={clsx(
            "text-sm font-medium",
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-600 dark:text-gray-400'
          )}>
            {change > 0 && trend === 'up' ? '+' : ''}{change}%
          </p>
        )}
      </div>
      {icon && (
        <div className="text-primary opacity-80">
          {icon}
        </div>
      )}
    </div>
  </UniversalCard>
);

export const FeatureCard = ({ title, description, icon, link, ...props }) => (
  <UniversalCard variant="feature" interactive={!!link} onClick={link} {...props}>
    <div className="text-center space-y-4">
      {icon && (
        <div className="mx-auto w-12 h-12 text-primary flex items-center justify-center">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </UniversalCard>
);

export const TestimonialCard = ({ quote, author, role, avatar, rating, ...props }) => (
  <UniversalCard variant="testimonial" {...props}>
    <div className="space-y-4">
      {rating && (
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={clsx(
              "text-sm",
              i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            )}>
              ★
            </span>
          ))}
        </div>
      )}
      <blockquote className="text-gray-700 dark:text-gray-300 italic">
        "{quote}"
      </blockquote>
      <div className="flex items-center space-x-3">
        {avatar && (
          <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
        )}
        <div>
          <p className="font-medium text-foreground">{author}</p>
          {role && <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>}
        </div>
      </div>
    </div>
  </UniversalCard>
);

export default UniversalCard;