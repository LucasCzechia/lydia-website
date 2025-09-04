import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';

// Loading Spinner Component
export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-500',
    current: 'border-current'
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-transparent border-t-current',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
};

// Loading Dots Component
export const LoadingDots = ({ 
  size = 'md',
  color = 'primary',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    gray: 'bg-gray-500',
    current: 'bg-current'
  };

  return (
    <div className={clsx('flex space-x-1', className)} {...props}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={clsx(
            'rounded-full',
            sizeClasses[size],
            colorClasses[color]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Loading Skeleton Component
export const LoadingSkeleton = ({ 
  type = 'text',
  lines = 3,
  className = '',
  animate = true,
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';
  
  const baseClasses = clsx(
    'rounded',
    isDark ? 'bg-gray-700' : 'bg-gray-300',
    animate && 'animate-pulse'
  );

  const skeletonTypes = {
    text: (
      <div className={clsx('space-y-3', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              baseClasses,
              'h-4',
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    ),

    card: (
      <div className={clsx('space-y-4 p-4', className)} {...props}>
        <div className={clsx(baseClasses, 'h-6 w-3/4')} />
        <div className={clsx(baseClasses, 'h-4 w-full')} />
        <div className={clsx(baseClasses, 'h-4 w-5/6')} />
        <div className={clsx(baseClasses, 'h-10 w-32')} />
      </div>
    ),

    chart: (
      <div className={clsx('space-y-4 p-4', className)} {...props}>
        <div className={clsx(baseClasses, 'h-6 w-1/2')} />
        <div className={clsx(baseClasses, 'h-64 w-full')} />
        <div className="flex space-x-4">
          <div className={clsx(baseClasses, 'h-4 w-20')} />
          <div className={clsx(baseClasses, 'h-4 w-16')} />
          <div className={clsx(baseClasses, 'h-4 w-24')} />
        </div>
      </div>
    ),

    list: (
      <div className={clsx('space-y-3', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className={clsx(baseClasses, 'w-10 h-10 rounded-full')} />
            <div className="flex-1 space-y-2">
              <div className={clsx(baseClasses, 'h-4 w-3/4')} />
              <div className={clsx(baseClasses, 'h-3 w-1/2')} />
            </div>
          </div>
        ))}
      </div>
    ),

    avatar: (
      <div className={clsx(baseClasses, 'w-10 h-10 rounded-full', className)} {...props} />
    ),

    button: (
      <div className={clsx(baseClasses, 'h-10 w-24', className)} {...props} />
    ),

    image: (
      <div className={clsx(baseClasses, 'w-full h-48', className)} {...props} />
    )
  };

  return skeletonTypes[type] || skeletonTypes.text;
};

// Loading Overlay Component
export const LoadingOverlay = ({ 
  loading = true,
  children,
  spinner = true,
  message = 'Loading...',
  className = '',
  ...props 
}) => {
  if (!loading) return children;

  return (
    <div className={clsx('relative', className)} {...props}>
      {children}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          {spinner && <LoadingSpinner size="lg" />}
          {message && (
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading Progress Bar
export const LoadingProgress = ({ 
  progress = 0,
  indeterminate = false,
  size = 'md',
  color = 'primary',
  className = '',
  showPercent = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2', 
    lg: 'h-3'
  };

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  return (
    <div className={clsx('w-full', className)} {...props}>
      {showPercent && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={clsx(
        'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        {indeterminate ? (
          <motion.div
            className={clsx(
              'h-full rounded-full',
              colorClasses[color]
            )}
            style={{ width: '30%' }}
            animate={{ x: ['0%', '300%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ) : (
          <motion.div
            className={clsx(
              'h-full rounded-full transition-all duration-300',
              colorClasses[color]
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        )}
      </div>
    </div>
  );
};

// Loading Card Placeholder
export const LoadingCard = ({ 
  variant = 'default',
  className = '',
  ...props 
}) => {
  return (
    <div className={clsx(
      'bg-card border border-card-border rounded-xl p-4 animate-pulse',
      className
    )} {...props}>
      <LoadingSkeleton type="card" />
    </div>
  );
};

// Loading State Hook
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const toggleLoading = () => setLoading(prev => !prev);

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading
  };
};

// Loading States Provider
export const LoadingStates = {
  Spinner: LoadingSpinner,
  Dots: LoadingDots,
  Skeleton: LoadingSkeleton,
  Overlay: LoadingOverlay,
  Progress: LoadingProgress,
  Card: LoadingCard
};

export default {
  LoadingSpinner,
  LoadingDots,
  LoadingSkeleton,
  LoadingOverlay,
  LoadingProgress,
  LoadingCard,
  useLoading,
  LoadingStates
};