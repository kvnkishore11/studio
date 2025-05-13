/**
 * Animation utility functions and variants for Framer Motion
 */

/**
 * Easing presets for animations
 * @type {Object}
 */
export const easing = {
  // Standard easing functions
  default: [0.6, 0.01, -0.05, 0.95], // Smooth, natural motion
  gentle: [0.4, 0.0, 0.2, 1], // Gentle, subtle motion
  bouncy: [0.2, 1.5, 0.3, 1.2], // Bouncy, playful motion
  spring: [0.43, 0.13, 0.23, 0.96], // Spring-like motion
  
  // Specific named easings
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

/**
 * Duration presets for animations in seconds
 * @type {Object}
 */
export const duration = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
};

/**
 * Fade animation variants
 * @type {Object}
 */
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.default
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Slide up animation variants
 * @type {Object}
 */
export const slideUpVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Slide down animation variants
 * @type {Object}
 */
export const slideDownVariants = {
  hidden: { 
    y: -20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Slide in from left animation variants
 * @type {Object}
 */
export const slideInLeftVariants = {
  hidden: { 
    x: -50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    x: -50, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Slide in from right animation variants
 * @type {Object}
 */
export const slideInRightVariants = {
  hidden: { 
    x: 50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    x: 50, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Scale animation variants
 * @type {Object}
 */
export const scaleVariants = {
  hidden: { 
    scale: 0.9, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Pop animation variants with a slight bounce
 * @type {Object}
 */
export const popVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.bouncy
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: duration.fast,
      ease: easing.gentle
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: easing.easeOut
    }
  }
};

/**
 * Staggered children animation for parent containers
 * @param {number} staggerAmount - Amount of delay between each child (default: 0.05)
 * @returns {Object} Animation variant object
 */
export const staggerContainer = (staggerAmount = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerAmount,
      delayChildren: 0.1
    }
  }
});

/**
 * List item animation variants for use with staggerContainer
 * @type {Object}
 */
export const listItemVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  }
};

/**
 * Card animation variants with hover effect
 * @type {Object}
 */
export const cardVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: duration.fast,
      ease: easing.gentle
    }
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: easing.easeOut
    }
  }
};

/**
 * Button animation variants
 * @type {Object}
 */
export const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: duration.fast,
      ease: easing.gentle
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: easing.easeOut
    }
  }
};

/**
 * Dialog/modal animation variants
 * @type {Object}
 */
export const dialogVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Backdrop animation variants for modals/dialogs
 * @type {Object}
 */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: duration.fast,
      ease: easing.easeIn
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut,
      delay: 0.1 // Small delay to ensure modal exits first
    }
  }
};

/**
 * Toast notification animation variants
 * @type {Object}
 */
export const toastVariants = {
  hidden: { 
    opacity: 0,
    x: 50,
    y: 0
  },
  visible: { 
    opacity: 1,
    x: 0,
    y: 0,
    transition: { 
      duration: duration.normal,
      ease: easing.spring
    }
  },
  exit: { 
    opacity: 0,
    x: 100,
    transition: { 
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Page transition variants for route changes
 * @type {Object}
 */
export const pageTransitionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.easeInOut,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration.fast,
      ease: easing.easeOut
    }
  }
};

/**
 * Creates a custom animation preset with specified parameters
 * @param {Object} options - Animation options
 * @param {number} [options.duration] - Animation duration in seconds
 * @param {Array|string} [options.ease] - Easing function
 * @param {number} [options.delay] - Animation delay in seconds
 * @param {Object} [options.from] - Starting state
 * @param {Object} [options.to] - Ending state
 * @returns {Object} Animation configuration
 */
export const createAnimation = ({ 
  duration: durationValue = duration.normal, 
  ease: easeValue = easing.default,
  delay = 0,
  from = {},
  to = {}
}) => {
  return {
    hidden: { ...from },
    visible: { 
      ...to,
      transition: { 
        duration: durationValue,
        ease: easeValue,
        delay
      }
    }
  };
};
