"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils.js"

const Accordion = AccordionPrimitive.Root

/**
 * @typedef {object} AccordionItemProps
 * @property {string} [className]
 */
/** @type {React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLElement>>} */
const AccordionItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  )
)
AccordionItem.displayName = "AccordionItem"

/**
 * @typedef {object} AccordionTriggerProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */
/** @type {React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>} */
const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * @typedef {object} AccordionContentProps
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */
/** @type {React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>} */
const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } 