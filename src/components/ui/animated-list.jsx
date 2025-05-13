"use client";

import { motion } from "framer-motion";
import { staggerContainer, listItemVariants } from "@/lib/animation-utils";
import { useReducedMotion, reducedMotionVariants } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * An animated list component with staggered animations for children
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.staggerDelay - Delay between each child animation (default: 0.05)
 * @param {Object} props.containerVariants - Animation variants for the container
 * @param {string} props.initial - Initial animation state
 * @param {string} props.animate - Animation state to animate to
 * @param {string} props.exit - Exit animation state
 * @param {string} props.as - HTML element to render as (default: "ul")
 * @param {Object} props.containerProps - Additional props for the container
 */
export function AnimatedList({
  children,
  className,
  staggerDelay = 0.05,
  containerVariants = staggerContainer,
  initial = "hidden",
  animate = "visible",
  exit = "exit",
  as = "ul",
  ...containerProps
}) {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use reduced motion variants if the user prefers reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : containerVariants(staggerDelay);
  const Component = motion[as];
  
  return (
    <Component
      className={cn(className)}
      initial={initial}
      animate={animate}
      exit={exit}
      variants={effectiveVariants}
      {...containerProps}
    >
      {children}
    </Component>
  );
}

/**
 * An animated list item to be used within AnimatedList
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.variants - Animation variants (defaults to listItemVariants)
 * @param {string} props.as - HTML element to render as (default: "li")
 * @param {Object} props.itemProps - Additional props for the list item
 */
export function AnimatedListItem({
  children,
  className,
  variants = listItemVariants,
  as = "li",
  ...itemProps
}) {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use simplified variants for reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  const Component = motion[as];
  
  return (
    <Component
      className={cn(className)}
      variants={effectiveVariants}
      {...itemProps}
    >
      {children}
    </Component>
  );
}
