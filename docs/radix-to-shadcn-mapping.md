# Radix UI to Shadcn UI Component Mapping

This document provides a mapping between Radix UI components and their Shadcn UI equivalents for the Story Spark application migration.

## Overview

Shadcn UI is built on top of Radix UI primitives, so the migration process is relatively straightforward. Shadcn UI components provide styled versions of Radix UI primitives with additional functionality and consistent styling.

## Component Mapping

| Radix UI Component | Shadcn UI Component | Notes |
|-------------------|---------------------|-------|
| `@radix-ui/react-dialog` | `@/components/ui/dialog` | Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose |
| `@radix-ui/react-label` | `@/components/ui/label` | Label |
| `@radix-ui/react-slot` | `@/components/ui/slot` | Slot |
| `@radix-ui/react-checkbox` | `@/components/ui/checkbox` | Checkbox |
| `@radix-ui/react-dropdown-menu` | `@/components/ui/dropdown-menu` | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, etc. |
| `@radix-ui/react-avatar` | `@/components/ui/avatar` | Avatar, AvatarImage, AvatarFallback |
| `@radix-ui/react-separator` | `@/components/ui/separator` | Separator |
| `@radix-ui/react-scroll-area` | `@/components/ui/scroll-area` | ScrollArea, ScrollBar |
| `@radix-ui/react-tabs` | `@/components/ui/tabs` | Tabs, TabsList, TabsTrigger, TabsContent |
| `@radix-ui/react-tooltip` | `@/components/ui/tooltip` | Tooltip, TooltipTrigger, TooltipContent |
| `@radix-ui/react-toast` | `@/components/ui/toast` | Toast, ToastProvider, ToastViewport, etc. |
| `@radix-ui/react-alert-dialog` | `@/components/ui/alert-dialog` | AlertDialog, AlertDialogTrigger, AlertDialogContent, etc. |
| `@radix-ui/react-popover` | `@/components/ui/popover` | Popover, PopoverTrigger, PopoverContent |
| `@radix-ui/react-menubar` | `@/components/ui/menubar` | Menubar, MenubarMenu, MenubarTrigger, etc. |
| `@radix-ui/react-progress` | `@/components/ui/progress` | Progress |
| `@radix-ui/react-radio-group` | `@/components/ui/radio-group` | RadioGroup, RadioGroupItem |
| `@radix-ui/react-select` | `@/components/ui/select` | Select, SelectTrigger, SelectValue, SelectContent, etc. |
| `@radix-ui/react-slider` | `@/components/ui/slider` | Slider |
| `@radix-ui/react-switch` | `@/components/ui/switch` | Switch |
| `@radix-ui/react-accordion` | `@/components/ui/accordion` | Accordion, AccordionItem, AccordionTrigger, AccordionContent |

## Additional Shadcn UI Components

These are additional Shadcn UI components that don't have direct Radix UI equivalents but are useful for our application:

| Component | Description |
|-----------|-------------|
| `@/components/ui/button` | Button component with various styles and sizes |
| `@/components/ui/card` | Card component with header, content, and footer |
| `@/components/ui/input` | Input component for text input |
| `@/components/ui/textarea` | Textarea component for multiline text input |
| `@/components/ui/table` | Table components for displaying tabular data |
| `@/components/ui/badge` | Badge component for displaying status or count |
| `@/components/ui/sheet` | Sheet component for side panels |
| `@/components/ui/skeleton` | Skeleton component for loading states |

## Implementation Strategy

1. Install Shadcn UI components using the CLI
2. Replace Radix UI imports with Shadcn UI imports
3. Update component props and structure as needed
4. Test each component after replacement

## Installation Commands

To install Shadcn UI components, use the following command format:

```bash
npx shadcn-ui@latest add [component-name]
```

For example:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
```

## Components to Install for Story Spark App

Based on the current usage in the application, we need to install the following Shadcn UI components:

1. button
2. dialog
3. input
4. textarea
5. label
6. card
7. table
8. checkbox
9. toast
10. dropdown-menu
11. avatar
12. separator
13. tabs
14. tooltip
