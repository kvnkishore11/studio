/**
 * Custom hook to detect if the user prefers reduced motion
 * This helps make animations more accessible by respecting user preferences
 */

import { useState, useEffect } from 'react';

/**
 * Hook that returns whether the user has requested reduced motion
 * @returns {boolean} True if the user prefers reduced motion
 */
export function useReducedMotion() {
  // Default to false (animations enabled) if we can't detect preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check if the browser supports the matchMedia API
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    
    // Create a media query that matches if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set the initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Define a handler for when the preference changes
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    // Add an event listener to detect changes in the preference
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Returns animation variants based on whether reduced motion is preferred
 * @param {Object} fullMotionVariants - Animation variants for full motion
 * @param {Object} reducedMotionVariants - Animation variants for reduced motion
 * @returns {Object} The appropriate animation variants based on user preference
 */
export function getReducedMotionVariants(fullMotionVariants, reducedMotionVariants) {
  // Use this in components to conditionally apply animations
  const prefersReducedMotion = useReducedMotion();
  
  return prefersReducedMotion ? reducedMotionVariants : fullMotionVariants;
}

/**
 * Default reduced motion variants that can be used as a fallback
 * These provide minimal, subtle animations that are less distracting
 */
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.1 }
  }
};
