// Motion configuration utilities for better performance and accessibility

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance-optimized spring configurations
export const springConfigs = {
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  responsive: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.8,
  },
  snappy: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.6,
  }
};

// Easing configurations
export const easingConfigs = {
  smooth: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth animations
  bounce: [0.68, -0.55, 0.265, 1.55],
  linear: [0, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};

// Optimized variants for common animation patterns
export const createFadeVariants = (options = {}) => {
  const {
    distance = 20,
    duration = 0.4,
    stagger = 0.1,
    ease = easingConfigs.smooth
  } = options;

  const shouldAnimate = !prefersReducedMotion();

  return {
    hidden: {
      opacity: 0,
      y: shouldAnimate ? distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldAnimate ? duration : 0,
        ease,
        staggerChildren: shouldAnimate ? stagger : 0,
      }
    },
    exit: {
      opacity: 0,
      y: shouldAnimate ? -distance / 2 : 0,
      transition: {
        duration: shouldAnimate ? duration * 0.7 : 0,
        ease
      }
    }
  };
};

export const createSlideVariants = (options = {}) => {
  const {
    direction = 'left', // 'left', 'right', 'up', 'down'
    distance = 50,
    duration = 0.4,
    ease = easingConfigs.smooth
  } = options;

  const shouldAnimate = !prefersReducedMotion();

  const getTransform = (dir, dist) => {
    switch (dir) {
      case 'right': return { x: dist };
      case 'up': return { y: -dist };
      case 'down': return { y: dist };
      case 'left':
      default: return { x: -dist };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getTransform(direction, shouldAnimate ? distance : 0)
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldAnimate ? duration : 0,
        ease
      }
    },
    exit: {
      opacity: 0,
      ...getTransform(direction, shouldAnimate ? -distance : 0),
      transition: {
        duration: shouldAnimate ? duration * 0.7 : 0,
        ease
      }
    }
  };
};

export const createScaleVariants = (options = {}) => {
  const {
    from = 0.8,
    to = 1,
    duration = 0.3,
    ease = easingConfigs.smooth
  } = options;

  const shouldAnimate = !prefersReducedMotion();

  return {
    hidden: {
      opacity: 0,
      scale: shouldAnimate ? from : to
    },
    visible: {
      opacity: 1,
      scale: to,
      transition: {
        duration: shouldAnimate ? duration : 0,
        ease
      }
    },
    exit: {
      opacity: 0,
      scale: shouldAnimate ? from : to,
      transition: {
        duration: shouldAnimate ? duration * 0.7 : 0,
        ease
      }
    }
  };
};

// Hover animations optimized for performance
export const createHoverAnimation = (options = {}) => {
  const {
    scale = 1.02,
    duration = 0.2,
    ease = easingConfigs.easeOut
  } = options;

  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return {};
  }

  return {
    scale,
    transition: {
      duration,
      ease
    }
  };
};

export const createTapAnimation = (options = {}) => {
  const {
    scale = 0.98,
    duration = 0.1,
    ease = easingConfigs.easeOut
  } = options;

  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return {};
  }

  return {
    scale,
    transition: {
      duration,
      ease
    }
  };
};

// Stagger configurations
export const staggerConfigs = {
  fast: 0.05,
  medium: 0.1,
  slow: 0.15,
  children: (i) => i * 0.1
};

// Layout animation configurations
export const layoutTransitions = {
  smooth: {
    type: "spring",
    stiffness: 200,
    damping: 20
  },
  instant: {
    duration: 0
  }
};

// Gesture configurations
export const gestureConfigs = {
  drag: {
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: 0.1,
    whileDrag: { scale: 1.02 }
  },
  swipe: {
    onSwipeThreshold: 10000
  }
};

// Performance monitoring utilities
export const withPerformanceLogging = (variants, name) => {
  if (process.env.NODE_ENV !== 'development') {
    return variants;
  }

  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...variants.visible.transition,
        onComplete: () => {
          console.log(`Animation completed: ${name}`);
        }
      }
    }
  };
};

// Accessible animation wrapper
export const createAccessibleVariants = (variants) => {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 }
    };
  }

  return variants;
};

// Common animation presets
export const animationPresets = {
  fadeIn: createFadeVariants(),
  fadeInUp: createFadeVariants({ distance: 30 }),
  fadeInDown: createFadeVariants({ distance: -30 }),
  slideLeft: createSlideVariants({ direction: 'left' }),
  slideRight: createSlideVariants({ direction: 'right' }),
  slideUp: createSlideVariants({ direction: 'up' }),
  slideDown: createSlideVariants({ direction: 'down' }),
  scaleIn: createScaleVariants(),
  scaleInSmall: createScaleVariants({ from: 0.9 }),
  
  // Page transitions
  pageTransition: createFadeVariants({ duration: 0.3, distance: 10 }),
  
  // Component-specific presets
  card: createFadeVariants({ distance: 15, duration: 0.3 }),
  button: {
    whileHover: createHoverAnimation(),
    whileTap: createTapAnimation()
  },
  modal: createScaleVariants({ from: 0.95, duration: 0.3 }),
  toast: createSlideVariants({ direction: 'right', distance: 100 })
};

export default {
  springConfigs,
  easingConfigs,
  createFadeVariants,
  createSlideVariants,
  createScaleVariants,
  createHoverAnimation,
  createTapAnimation,
  staggerConfigs,
  layoutTransitions,
  gestureConfigs,
  withPerformanceLogging,
  createAccessibleVariants,
  animationPresets,
  prefersReducedMotion
};