import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useAppTheme } from '../../context/ThemeContext';
import { animationPresets } from '../../utils/motionConfig';
import ErrorBoundary from '../common/ErrorBoundary';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  external = false,
  animate = true,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  // Base button classes
  const baseClasses = clsx(
    'inline-flex items-center justify-center font-medium rounded-full',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    fullWidth && 'w-full'
  );

  // Size variants
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl'
  };

  // Icon sizes
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  // Variant styles
  const variantClasses = {
    primary: clsx(
      'bg-[#0055FF] text-white border-[3px] border-solid border-white/15',
      'shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)]',
      'hover:shadow-[0px_8px_40px_0px_rgba(0,85,255,0.7),inset_0px_0px_10px_1px_rgba(255,255,255,0.3),0px_0px_0px_5px_rgba(0,85,255,0.2)]',
      'focus:ring-blue-500',
      'active:scale-[0.98]'
    ),
    
    secondary: clsx(
      'bg-transparent border-2 border-primary font-medium',
      isDark 
        ? 'text-white border-primary hover:border-secondary hover:bg-blue-600/20' 
        : 'text-primary border-primary hover:border-secondary hover:bg-blue-100/50',
      'focus:ring-blue-500',
      'active:scale-[0.98]'
    ),
    
    outline: clsx(
      'bg-transparent border-2',
      isDark
        ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50'
        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
      'focus:ring-gray-500',
      'active:scale-[0.98]'
    ),
    
    ghost: clsx(
      'bg-transparent border-0',
      isDark
        ? 'text-gray-300 hover:bg-gray-800/50'
        : 'text-gray-600 hover:bg-gray-100',
      'focus:ring-gray-500',
      'active:scale-[0.98]'
    ),
    
    danger: clsx(
      'bg-red-600 text-white border-2 border-red-600',
      'hover:bg-red-700 hover:border-red-700',
      'focus:ring-red-500',
      'active:scale-[0.98]'
    ),
    
    success: clsx(
      'bg-green-600 text-white border-2 border-green-600',
      'hover:bg-green-700 hover:border-green-700',
      'focus:ring-green-500',
      'active:scale-[0.98]'
    ),
    
    warning: clsx(
      'bg-yellow-500 text-white border-2 border-yellow-500',
      'hover:bg-yellow-600 hover:border-yellow-600',
      'focus:ring-yellow-500',
      'active:scale-[0.98]'
    ),
    
    minimal: clsx(
      'bg-card border border-card-border',
      'hover:bg-card-hover',
      isDark ? 'text-gray-300' : 'text-gray-700',
      'focus:ring-primary',
      'active:scale-[0.98]'
    )
  };

  // Combine all classes
  const buttonClasses = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    loading && 'cursor-wait',
    className
  );

  // Loading spinner
  const LoadingSpinner = () => (
    <div className={clsx(
      'animate-spin rounded-full border-2 border-transparent',
      variant === 'primary' ? 'border-t-white' : 
      variant === 'secondary' ? 'border-t-primary' : 
      'border-t-current',
      iconSizes[size]
    )} />
  );

  // Icon component
  const IconComponent = ({ position }) => {
    if (!icon || loading) return null;
    
    return (
      <span className={clsx(
        iconSizes[size],
        position === 'left' ? 'mr-2' : 'ml-2'
      )}>
        {icon}
      </span>
    );
  };

  // Button content
  const buttonContent = (
    <>
      {iconPosition === 'left' && <IconComponent position="left" />}
      {loading && <LoadingSpinner />}
      {!loading && children && (
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      )}
      {iconPosition === 'right' && <IconComponent position="right" />}
    </>
  );

  // Motion props
  const motionProps = animate ? {
    ...animationPresets.button,
    whileTap: { scale: 0.98 }
  } : {};

  // Link button
  if (href) {
    if (external) {
      return (
        <ErrorBoundary minimal>
          <motion.a
            ref={ref}
            href={href}
            className={buttonClasses}
            target="_blank"
            rel="noopener noreferrer"
            {...motionProps}
            {...props}
          >
            {buttonContent}
          </motion.a>
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary minimal>
        <Link href={href} passHref legacyBehavior>
          <motion.a
            ref={ref}
            className={buttonClasses}
            {...motionProps}
            {...props}
          >
            {buttonContent}
          </motion.a>
        </Link>
      </ErrorBoundary>
    );
  }

  // Regular button
  return (
    <ErrorBoundary minimal>
      <motion.button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {buttonContent}
      </motion.button>
    </ErrorBoundary>
  );
});

Button.displayName = 'Button';

// Icon-only button variant
export const IconButton = forwardRef(({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-14 h-14 p-3'
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      className={clsx(
        'rounded-full !px-0 !py-0',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

// Button group component
export const ButtonGroup = ({ 
  children, 
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  ...props 
}) => {
  const spacingClasses = {
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3',
    lg: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4'
  };

  return (
    <div 
      className={clsx(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;