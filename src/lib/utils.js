import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, merging Tailwind classes.
 * @param {...*} inputs - Class names or class value arrays.
 * @returns {string} The combined and merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 