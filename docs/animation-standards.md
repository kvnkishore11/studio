# Animation Standards

This document outlines the animation standards for the Story Spark application. Following these guidelines will help maintain a consistent and polished user experience.

## Animation Principles

1. **Purposeful Motion**: Animations should serve a purpose, such as guiding attention, providing feedback, or enhancing the user experience.
2. **Subtle and Smooth**: Animations should be subtle and not distract from the content or functionality.
3. **Consistent Timing**: Use consistent timing for similar animations to create a cohesive experience.
4. **Performance First**: Animations should be optimized for performance to ensure a smooth experience on all devices.

## Animation Library

We use [Framer Motion](https://www.framer.com/motion/) for all animations in the application. The library provides a simple API for creating complex animations with minimal code.

## Animation Utilities

All animation utilities are located in `src/lib/animation-utils.js`. This file contains:

- Easing presets
- Duration presets
- Animation variants for common patterns
- Helper functions for creating custom animations

## Standard Animation Components

The following components are available for use throughout the application:

1. **AnimatedContainer**: A general-purpose container with animation capabilities.
2. **AnimatedList/AnimatedListItem**: For creating lists with staggered animations.
3. **AnimatedButton**: An enhanced button with hover and tap animations.
4. **AnimatedDialog**: An enhanced dialog with entrance and exit animations.
5. **PageTransition**: For smooth transitions between pages.

## Animation Timing

| Type | Duration | Use Case |
|------|----------|----------|
| Fast | 0.2s | Small UI elements, hover states, micro-interactions |
| Normal | 0.3s | Most UI elements, dialogs, cards |
| Slow | 0.5s | Larger UI elements, page transitions |
| Very Slow | 0.8s | Special emphasis animations (use sparingly) |

## Easing Functions

| Type | Description | Use Case |
|------|-------------|----------|
| Default | [0.6, 0.01, -0.05, 0.95] | General purpose, smooth motion |
| Gentle | [0.4, 0.0, 0.2, 1] | Subtle animations |
| Bouncy | [0.2, 1.5, 0.3, 1.2] | Playful, attention-grabbing animations |
| Spring | [0.43, 0.13, 0.23, 0.96] | Natural, spring-like motion |
| EaseIn | [0.4, 0, 1, 1] | Elements entering the screen |
| EaseOut | [0, 0, 0.2, 1] | Elements exiting the screen |
| EaseInOut | [0.4, 0, 0.2, 1] | Elements changing state |

## Common Animation Patterns

### Fade In/Out

```jsx
import { AnimatedContainer } from "@/components/ui/animated-container";
import { fadeVariants } from "@/lib/animation-utils";

<AnimatedContainer variants={fadeVariants}>
  Content here
</AnimatedContainer>
```

### Slide In/Out

```jsx
import { AnimatedContainer } from "@/components/ui/animated-container";
import { slideUpVariants } from "@/lib/animation-utils";

<AnimatedContainer variants={slideUpVariants}>
  Content here
</AnimatedContainer>
```

### Staggered List

```jsx
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";

<AnimatedList>
  <AnimatedListItem>Item 1</AnimatedListItem>
  <AnimatedListItem>Item 2</AnimatedListItem>
  <AnimatedListItem>Item 3</AnimatedListItem>
</AnimatedList>
```

### Page Transitions

```jsx
import { PageTransition } from "@/components/ui/page-transition";

export default function MyPage() {
  return (
    <PageTransition>
      <main>Page content</main>
    </PageTransition>
  );
}
```

### Dialog Animations

```jsx
import {
  AnimatedDialog,
  AnimatedDialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/animated-dialog";

<AnimatedDialog open={open} onOpenChange={setOpen}>
  <AnimatedDialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>Dialog footer</DialogFooter>
  </AnimatedDialogContent>
</AnimatedDialog>
```

## Performance Considerations

1. **Animate Opacity and Transform**: Whenever possible, animate only `opacity` and `transform` properties as they are the most performant.
2. **Avoid Layout Animations**: Minimize animations that cause layout recalculations (e.g., width, height, top, left).
3. **Use `will-change`**: For complex animations, consider using the `will-change` CSS property to hint to the browser about upcoming changes.
4. **Limit Concurrent Animations**: Avoid having too many animations running simultaneously.
5. **Test on Lower-End Devices**: Ensure animations perform well on lower-end devices.

## Accessibility

1. **Respect User Preferences**: Honor the user's `prefers-reduced-motion` setting.
2. **Avoid Flashing Content**: Ensure animations don't cause content to flash or flicker.
3. **Provide Alternative Navigation**: Ensure users can navigate without relying on animated cues.

## Implementation Example

```jsx
import { AnimatedContainer } from "@/components/ui/animated-container";
import { slideUpVariants } from "@/lib/animation-utils";

export function MyComponent() {
  return (
    <AnimatedContainer 
      variants={slideUpVariants}
      className="p-4 bg-card rounded-lg shadow-md"
    >
      <h2>My Component</h2>
      <p>This component animates in with a slide up effect.</p>
    </AnimatedContainer>
  );
}
```
