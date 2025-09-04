import { motion } from 'framer-motion';
import clsx from 'clsx';

const MetricGrid = ({ 
  children, 
  columns = {
    sm: 1,
    md: 2,
    lg: 4
  },
  gap = 6,
  className = "",
  animate = true,
  staggerDelay = 0.1,
  ...props 
}) => {
  const gridClasses = clsx(
    "grid",
    `grid-cols-${columns.sm}`,
    `md:grid-cols-${columns.md}`,
    `lg:grid-cols-${columns.lg}`,
    `gap-${gap}`,
    className
  );

  const containerVariants = animate ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  } : {};

  const itemVariants = animate ? {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  } : {};

  if (animate) {
    return (
      <motion.div
        className={gridClasses}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants}>{children}</motion.div>
        }
      </motion.div>
    );
  }

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// Preset configurations for common layouts
MetricGrid.Stats = (props) => (
  <MetricGrid 
    columns={{ sm: 1, md: 2, lg: 4 }} 
    gap={6} 
    {...props} 
  />
);

MetricGrid.Charts = (props) => (
  <MetricGrid 
    columns={{ sm: 1, md: 1, lg: 2 }} 
    gap={6} 
    {...props} 
  />
);

MetricGrid.Features = (props) => (
  <MetricGrid 
    columns={{ sm: 1, md: 2, lg: 3 }} 
    gap={6} 
    {...props} 
  />
);

MetricGrid.Compact = (props) => (
  <MetricGrid 
    columns={{ sm: 1, md: 3, lg: 6 }} 
    gap={4} 
    {...props} 
  />
);

export default MetricGrid;