import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils.js"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * @typedef {object} AlertProps
 * @property {string} [className]
 * @property {'default' | 'destructive'} [variant]
 */
/** @type {React.ForwardRefExoticComponent<AlertProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>} */
const Alert = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

/**
 * @typedef {object} AlertTitleProps
 * @property {string} [className]
 */
/** @type {React.ForwardRefExoticComponent<AlertTitleProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>} */
const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

/**
 * @typedef {object} AlertDescriptionProps
 * @property {string} [className]
 */
/** @type {React.ForwardRefExoticComponent<AlertDescriptionProps & React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>} */
const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription } 