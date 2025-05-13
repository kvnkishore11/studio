# Shadcn UI Implementation Plan

## Overview

This document outlines the implementation plan for replacing direct Radix UI components with Shadcn UI components in the Story Spark application. The goal is to standardize the UI component usage and improve the overall design consistency.

## Current Status

- Shadcn UI components are already installed in the project
- Components are available in `/src/components/ui/` directory
- Tailwind configuration has been updated to support JavaScript files only
- Components.json has been updated to use JavaScript instead of TypeScript

## Implementation Plan

### Phase 1: Layout Components

1. Replace Radix UI components in app-layout.jsx
2. Replace Radix UI components in app-header.jsx
3. Replace Radix UI components in app-sidebar.jsx

### Phase 2: Dialog Components

1. Replace Radix UI components in new-story-dialog.jsx
2. Replace Radix UI components in notifications-panel.jsx

### Phase 3: Main View Components

1. Replace Radix UI components in generate-story-view.jsx
2. Replace Radix UI components in how-it-works-animation.jsx

### Phase 4: Animation Integration

1. Install Framer Motion
2. Replace CSS animations with Framer Motion animations

## Component Usage Guidelines

When replacing Radix UI components with Shadcn UI components, follow these guidelines:

1. Import components from the local UI components directory:
   ```javascript
   // Before (Radix UI)
   import * as Dialog from '@radix-ui/react-dialog';
   
   // After (Shadcn UI)
   import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
   ```

2. Use the Shadcn UI component props and structure:
   ```javascript
   // Before (Radix UI)
   <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
     <Dialog.Trigger>Open</Dialog.Trigger>
     <Dialog.Portal>
       <Dialog.Overlay className="..." />
       <Dialog.Content className="...">
         <Dialog.Title>Title</Dialog.Title>
         <Dialog.Description>Description</Dialog.Description>
         <Dialog.Close>Close</Dialog.Close>
       </Dialog.Content>
     </Dialog.Portal>
   </Dialog.Root>
   
   // After (Shadcn UI)
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
     <DialogTrigger>Open</DialogTrigger>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Title</DialogTitle>
         <DialogDescription>Description</DialogDescription>
       </DialogHeader>
       <DialogFooter>
         <DialogClose>Close</DialogClose>
       </DialogFooter>
     </DialogContent>
   </Dialog>
   ```

3. Use the `cn()` utility for class name merging:
   ```javascript
   import { cn } from '@/lib/utils';
   
   <Button className={cn(
     "default-styles",
     isActive && "active-styles",
     className
   )}>
     Button Text
   </Button>
   ```

## Testing Strategy

After replacing components in each phase:

1. Verify the application builds without errors
2. Test the functionality of the replaced components
3. Ensure the components render correctly
4. Verify interactions with other components
5. Test on different screen sizes for responsiveness

## Completion Criteria

- All direct Radix UI imports are replaced with Shadcn UI imports
- Application functions correctly with Shadcn UI components
- UI is consistent across all components
- No regressions in functionality or design
