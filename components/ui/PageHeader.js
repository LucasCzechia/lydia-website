import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useAppTheme } from '../../context/ThemeContext';
import { animationPresets } from '../../utils/motionConfig';
import ErrorBoundary from '../common/ErrorBoundary';
import Button from './Button';

const PageHeader = ({
  title,
  description,
  breadcrumbs = [],
  actions,
  backgroundImage,
  gradient = false,
  centered = true,
  size = 'lg',
  className = '',
  children,
  ...props
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  // Size variants
  const sizeClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16', 
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-24'
  };

  const titleSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    xl: 'text-5xl md:text-6xl lg:text-7xl'
  };

  const descriptionSizes = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
    xl: 'text-2xl md:text-3xl'
  };

  return (
    <ErrorBoundary>
      <header
        className={clsx(
          'relative overflow-hidden',
          sizeClasses[size],
          gradient && 'bg-gradient-to-br from-primary/10 via-transparent to-secondary/10',
          className
        )}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className={clsx(
              'absolute inset-0',
              isDark ? 'bg-black/60' : 'bg-white/60'
            )} />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav
              variants={animationPresets.fadeInUp}
              className="mb-6"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className={clsx(
                    'flex items-center hover:text-primary transition-colors',
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className={clsx(
                      'w-4 h-4 mx-2',
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    )} />
                    {crumb.href ? (
                      <Link href={crumb.href} className={clsx(
                        'hover:text-primary transition-colors',
                        index === breadcrumbs.length - 1 
                          ? 'text-foreground font-medium'
                          : isDark ? 'text-gray-400' : 'text-gray-600'
                      )}>
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={clsx(
                        index === breadcrumbs.length - 1 
                          ? 'text-foreground font-medium'
                          : isDark ? 'text-gray-400' : 'text-gray-600'
                      )}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          <div className={clsx(
            'flex flex-col space-y-6',
            centered ? 'items-center text-center' : 'items-start text-left',
            actions && 'md:flex-row md:items-end md:justify-between md:space-y-0'
          )}>
            {/* Main Content */}
            <div className={clsx(
              'space-y-4',
              centered && !actions ? 'max-w-4xl' : 'flex-1'
            )}>
              {/* Title */}
              <motion.h1
                variants={animationPresets.fadeInUp}
                className={clsx(
                  'font-bold tracking-tight text-foreground',
                  titleSizes[size]
                )}
              >
                {title}
              </motion.h1>

              {/* Description */}
              {description && (
                <motion.p
                  variants={animationPresets.fadeInUp}
                  className={clsx(
                    'text-gray-600 dark:text-gray-400 leading-relaxed',
                    descriptionSizes[size],
                    centered ? 'max-w-3xl' : ''
                  )}
                >
                  {description}
                </motion.p>
              )}

              {/* Custom Children */}
              {children && (
                <motion.div
                  variants={animationPresets.fadeInUp}
                  className="mt-6"
                >
                  {children}
                </motion.div>
              )}
            </div>

            {/* Actions */}
            {actions && (
              <motion.div
                variants={animationPresets.fadeInUp}
                className="flex-shrink-0"
              >
                {actions}
              </motion.div>
            )}
          </div>
        </div>
      </header>
    </ErrorBoundary>
  );
};

// Specialized Page Header Variants
export const HeroHeader = ({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction,
  ...props 
}) => (
  <PageHeader
    title={title}
    description={description}
    size="xl"
    gradient
    centered
    {...props}
  >
    {(primaryAction || secondaryAction) && (
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {primaryAction}
        {secondaryAction}
      </div>
    )}
  </PageHeader>
);

export const FeatureHeader = ({ 
  title, 
  description, 
  badge,
  ...props 
}) => (
  <PageHeader
    title={title}
    description={description}
    size="lg"
    centered
    {...props}
  >
    {badge && (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
        {badge}
      </div>
    )}
  </PageHeader>
);

export const DashboardHeader = ({ 
  title, 
  description, 
  actions,
  stats,
  ...props 
}) => (
  <PageHeader
    title={title}
    description={description}
    actions={actions}
    size="md"
    centered={false}
    {...props}
  >
    {stats && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center md:text-left">
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    )}
  </PageHeader>
);

export const LegalHeader = ({ 
  title, 
  lastUpdated,
  effectiveDate,
  ...props 
}) => (
  <PageHeader
    title={title}
    size="md"
    centered
    {...props}
  >
    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400 mt-4">
      {lastUpdated && (
        <span>Last updated: {lastUpdated}</span>
      )}
      {effectiveDate && (
        <span>Effective: {effectiveDate}</span>
      )}
    </div>
  </PageHeader>
);

export default PageHeader;