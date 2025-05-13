# Framer Motion Implementation Guide

This guide explains how Framer Motion has been implemented in the Story Spark application to provide smooth, accessible animations.

## Overview

Framer Motion is a production-ready motion library for React that makes it easy to create animations with a simple declarative syntax. In our application, we use Framer Motion to enhance the user experience with subtle animations that guide attention and provide feedback.

## Core Components

We've created several reusable animation components that can be used throughout the application:

1. **AnimatedContainer**: A general-purpose container with animation capabilities.
2. **AnimatedList/AnimatedListItem**: For creating lists with staggered animations.
3. **AnimatedButton**: An enhanced button with hover and tap animations.
4. **AnimatedDialog**: An enhanced dialog with entrance and exit animations.
5. **PageTransition**: For smooth transitions between pages.

## Animation Utilities

All animation utilities are located in `src/lib/animation-utils.js`. This file contains:

- Easing presets
- Duration presets
- Animation variants for common patterns
- Helper functions for creating custom animations

## Accessibility Considerations

We've implemented accessibility features to ensure that animations don't cause issues for users who prefer reduced motion:

1. **Reduced Motion Detection**: The `useReducedMotion` hook in `src/lib/use-reduced-motion.js` detects if the user has enabled the "reduce motion" setting in their operating system.

2. **Alternative Animations**: When reduced motion is preferred, we provide alternative, more subtle animations or disable animations entirely.

3. **Conditional Animation Application**: All animation components check for the user's preference and adjust accordingly.

## Implementation Examples

### Page Transitions

```jsx
import { PageTransition } from '@/components/ui/page-transition';

export default function MyPage() {
  return (
    <PageTransition>
      <main>Page content</main>
    </PageTransition>
  );
}
```

### Animated Container

```jsx
import { AnimatedContainer } from '@/components/ui/animated-container';
import { fadeVariants } from '@/lib/animation-utils';

function MyComponent() {
  return (
    <AnimatedContainer variants={fadeVariants}>
      <p>This content will fade in smoothly</p>
    </AnimatedContainer>
  );
}
```

### Animated List

```jsx
import { AnimatedList, AnimatedListItem } from '@/components/ui/animated-list';

function MyList() {
  return (
    <AnimatedList>
      {items.map(item => (
        <AnimatedListItem key={item.id}>
          {item.content}
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

### Animated Dialog

```jsx
import {
  AnimatedDialog,
  AnimatedDialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/animated-dialog';

function MyDialog({ open, onOpenChange }) {
  return (
    <AnimatedDialog open={open} onOpenChange={onOpenChange}>
      <AnimatedDialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <div>Dialog content</div>
        <DialogFooter>
          <Button onClick={onOpenChange}>Close</Button>
        </DialogFooter>
      </AnimatedDialogContent>
    </AnimatedDialog>
  );
}
```

### Animated Button

```jsx
import { AnimatedButton } from '@/components/ui/animated-button';

function MyComponent() {
  return (
    <AnimatedButton onClick={handleClick}>
      Click Me
    </AnimatedButton>
  );
}
```

## Custom Animation Variants

You can create custom animation variants for specific components:

```jsx
const customVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2, ease: [0.4, 0.0, 1, 1] }
  }
};

function MyComponent() {
  return (
    <AnimatedContainer variants={customVariants}>
      <p>Custom animation</p>
    </AnimatedContainer>
  );
}
```

## Reduced Motion Support

Our implementation respects the user's preference for reduced motion:

```jsx
import { useReducedMotion } from '@/lib/use-reduced-motion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  // Use different animations based on preference
  const variants = prefersReducedMotion 
    ? simpleVariants 
    : complexVariants;
    
  return (
    <motion.div variants={variants}>
      Content
    </motion.div>
  );
}
```

## Performance Considerations

1. **Animate Transform and Opacity**: Whenever possible, we animate only `transform` and `opacity` properties as they are the most performant.
2. **Avoid Layout Animations**: We minimize animations that cause layout recalculations.
3. **Stagger Animations**: For lists, we use staggered animations to avoid overwhelming the browser.
4. **Conditional Rendering**: We only apply animations when they enhance the user experience.

## Best Practices

1. **Subtlety is Key**: Keep animations subtle and purposeful.
2. **Consistent Timing**: Use consistent timing for similar animations.
3. **Respect User Preferences**: Always respect the user's preference for reduced motion.
4. **Test on Lower-End Devices**: Ensure animations perform well on lower-end devices.
5. **Avoid Animation Overload**: Don't animate everything; focus on what adds value.

## Future Enhancements

1. **Animation Presets**: Create more animation presets for common UI patterns.
2. **Performance Monitoring**: Implement tools to monitor animation performance.
3. **Custom Hooks**: Develop custom hooks for more complex animation scenarios.
4. **Animation Coordination**: Implement coordinated animations between components.
