"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.js';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { fadeVariants, slideUpVariants, staggerContainer } from '@/lib/animation-utils';
import { animationStepsData } from '@/data/mocks/animation-steps';

// Animation steps data is now imported from separate file

/**
 * Renders an animated sequence explaining the "How it Works" steps.
 */
export function HowItWorksAnimation() {
  const prefersReducedMotion = useReducedMotion();
  // Define container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: 0.1,
        duration: 0.5
      }
    }
  };

  // Define item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-6 items-stretch justify-center w-full px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      {animationStepsData.map((step, index) => {
        const IconComponent = step.icon;
        return (
          <motion.div
            key={step.id}
            className={cn(
              "w-full md:w-1/3 rounded-2xl p-6 flex flex-col items-center justify-start text-center shadow-xl border card-hover",
              `bg-gradient-to-br ${step.bgColorStops}`,
              step.borderColor
            )}
            variants={itemVariants}
          >
            <div className={cn(
              "mb-5 flex items-center justify-center w-20 h-20 rounded-full ring-4",
              step.bgColorStops.split(' ')[0],
              step.ringColor,
              "shadow-lg"
            )}>
              <IconComponent size={40} className={cn(step.iconColor, "transition-all duration-300")} />
            </div>

            <h4 className={cn(
                "text-lg sm:text-xl font-semibold mb-4",
                step.iconColor
              )}
            >
              {step.title}
            </h4>

            <div className="min-h-[7rem] flex flex-col items-center justify-center w-full">
                {step.elements}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 