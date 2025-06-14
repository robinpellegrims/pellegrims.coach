// Athletic animation utilities and easing functions

export const athleticEasing = {
  // Custom easing functions for athletic feel
  power: [0.25, 0.46, 0.45, 0.94],
  sprint: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.6, 0.32, 1.6],
  elastic: [0.175, 0.885, 0.32, 1.275]
}

export const athleticTransitions = {
  // Common transition configurations
  quick: { duration: 0.3, ease: athleticEasing.power },
  normal: { duration: 0.5, ease: athleticEasing.smooth },
  slow: { duration: 0.8, ease: athleticEasing.smooth },
  bounce: { duration: 0.6, ease: athleticEasing.bounce },
  elastic: { duration: 0.8, ease: athleticEasing.elastic },
  sprint: { duration: 0.4, ease: athleticEasing.sprint }
}

// Animation variants for different athletic movements
export const athleticVariants = {
  // Speed and power animations
  powerSlam: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: athleticTransitions.sprint
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -10,
      transition: athleticTransitions.quick
    }
  },

  // Fluid movement animations
  fluidRise: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: athleticTransitions.elastic
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: athleticTransitions.normal
    }
  },

  // Wave-like motions (for swimming theme)
  wave: {
    initial: { opacity: 0, x: -30, rotateY: -15 },
    animate: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: athleticTransitions.bounce
    },
    exit: { 
      opacity: 0, 
      x: 30, 
      rotateY: 15,
      transition: athleticTransitions.normal
    }
  },

  // Athletic card animations
  athleticCard: {
    initial: { opacity: 0, y: 40, rotateX: 10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: athleticTransitions.elastic
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      transition: athleticTransitions.quick
    },
    tap: {
      scale: 0.98,
      transition: athleticTransitions.quick
    }
  },

  // Performance metrics animations
  performance: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: athleticTransitions.bounce
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: athleticEasing.smooth
      }
    }
  }
}

// Stagger animations for lists and grids
export const staggerAnimations = {
  athleticGrid: {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 30, scale: 0.9 },
      animate: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: athleticTransitions.elastic
      }
    }
  },

  oceanWave: {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, x: -20, y: 20 },
      animate: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: athleticTransitions.bounce
      }
    }
  }
}

// Scroll-triggered animations
export const scrollAnimations = {
  revealOnScroll: {
    initial: { opacity: 0, y: 50 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: athleticTransitions.normal
    },
    viewport: { threshold: 0.1, once: true }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: athleticTransitions.elastic
    },
    viewport: { threshold: 0.2, once: true }
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: athleticTransitions.elastic
    },
    viewport: { threshold: 0.2, once: true }
  },

  scaleOnScroll: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { 
      opacity: 1, 
      scale: 1,
      transition: athleticTransitions.bounce
    },
    viewport: { threshold: 0.3, once: true }
  }
}

// Loading and state animations
export const loadingAnimations = {
  athleticSpinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },

  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: athleticEasing.smooth
      }
    }
  },

  breathe: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: athleticEasing.smooth
      }
    }
  }
}

// Interaction animations
export const interactionAnimations = {
  athleticHover: {
    whileHover: {
      y: -4,
      scale: 1.02,
      transition: athleticTransitions.quick
    },
    whileTap: {
      scale: 0.98,
      transition: athleticTransitions.quick
    }
  },

  floatOnHover: {
    whileHover: {
      y: -8,
      rotateX: 5,
      transition: athleticTransitions.elastic
    }
  },

  buttonPress: {
    whileHover: {
      scale: 1.05,
      transition: athleticTransitions.quick
    },
    whileTap: {
      scale: 0.95,
      transition: athleticTransitions.quick
    }
  },

  iconRotate: {
    whileHover: {
      rotate: 360,
      transition: athleticTransitions.normal
    }
  }
}

// Utility function to create custom athletic animations
export function createAthleticAnimation(
  initialState: Record<string, unknown>,
  animateState: Record<string, unknown>,
  transition = athleticTransitions.normal
) {
  return {
    initial: initialState,
    animate: {
      ...animateState,
      transition
    }
  }
}

// Utility function for responsive animations
export function createResponsiveAnimation(
  desktop: { initial?: Record<string, unknown>; animate?: Record<string, unknown>; transition?: unknown },
  mobile: { initial?: Record<string, unknown>; animate?: Record<string, unknown>; transition?: unknown }
) {
  return {
    initial: mobile.initial || desktop.initial,
    animate: {
      ...(desktop.animate || {}),
      transition: desktop.transition || athleticTransitions.normal
    },
    // Add mobile-specific variants if needed
    mobile: {
      initial: mobile.initial,
      animate: {
        ...(mobile.animate || {}),
        transition: mobile.transition || athleticTransitions.normal
      }
    }
  }
}