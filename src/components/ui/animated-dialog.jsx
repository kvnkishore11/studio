"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { dialogVariants, backdropVariants } from "@/lib/animation-utils";
import { useReducedMotion, reducedMotionVariants } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Animated dialog backdrop
 */
const AnimatedDialogBackdrop = React.forwardRef(({ className, variants = backdropVariants, ...props }, ref) => {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use reduced motion variants if the user prefers reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  
  return (
  <motion.div
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={effectiveVariants}
    {...props}
  />);
});
AnimatedDialogBackdrop.displayName = "AnimatedDialogBackdrop";

/**
 * Animated dialog content
 */
const AnimatedDialogContent = React.forwardRef(({ className, children, variants = dialogVariants, ...props }, ref) => {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use reduced motion variants if the user prefers reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  
  return (
  <motion.div
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className
    )}
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={effectiveVariants}
    {...props}
  >
    {children}
  </motion.div>);
});
AnimatedDialogContent.displayName = "AnimatedDialogContent";

/**
 * An enhanced Dialog component with animations
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onOpenChange - Function called when the open state changes
 * @param {React.ReactNode} props.children - Child elements
 * @param {Object} props.contentVariants - Animation variants for the content
 * @param {Object} props.backdropVariants - Animation variants for the backdrop
 * @param {Object} props.dialogProps - Additional props for the Dialog component
 */
export function AnimatedDialog({
  open,
  onOpenChange,
  children,
  contentVariants = dialogVariants,
  backdropVariants = backdropVariants,
  ...dialogProps
}) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange} {...dialogProps}>
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated dialog content with customizable animations
 */
export function AnimatedDialogContent({
  className,
  children,
  variants = dialogVariants,
  ...props
}) {
  // Check if the user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Use reduced motion variants if the user prefers reduced motion
  const effectiveVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  return (
    <DialogContent className={cn("p-0 border-none bg-transparent shadow-none", className)} {...props} asChild>
      <motion.div
        className="bg-background border shadow-lg sm:rounded-lg p-6 w-full max-w-lg"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={effectiveVariants}
      >
        {children}
      </motion.div>
    </DialogContent>
  );
}

export {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
