"use client";

import { motion } from "framer-motion";
import { fadeVariants } from "@/lib/animation-utils";
import { useReducedMotion, reducedMotionVariants } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * A container component with animation capabilities
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.variants - Animation variants (defaults to fadeVariants)
 * @param {string} props.initial - Initial animation state
 * @param {string} props.animate - Animation state to animate to
 * @param {string} props.exit - Exit animation state
 * @param {Object} props.transition - Custom transition properties
 * @param {Object} props.containerProps - Additional props for the container
 */
export function AnimatedContainer({
  children,
  className,
  variants = fadeVariants,
  initial = "hidden",
  animate = "visible",
  exit = "exit",
  transition,
  ...containerProps
}) {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use reduced motion variants if the user prefers reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      exit={exit}
      variants={effectiveVariants}
      transition={transition}
      {...containerProps}
    >
      {children}
    </motion.div>
  );
}
