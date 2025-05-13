"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/animation-utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * An animated button component that extends the base Button component
 * with hover and tap animations
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.variants - Animation variants (defaults to buttonVariants)
 * @param {boolean} props.disableAnimation - Disable animations
 * @param {Object} props.buttonProps - Additional props for the Button component
 */
export function AnimatedButton({
  children,
  className,
  variants = buttonVariants,
  disableAnimation = false,
  ...buttonProps
}) {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Disable animations if user prefers reduced motion or if disableAnimation is true
  const shouldDisableAnimation = prefersReducedMotion || disableAnimation;
  if (shouldDisableAnimation) {
    return (
      <Button className={cn(className)} {...buttonProps}>
        {children}
      </Button>
    );
  }

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={variants}
    >
      <Button className={cn(className)} {...buttonProps}>
        {children}
      </Button>
    </motion.div>
  );
}
