import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative bg-gradient-teal text-white shadow-sm hover:shadow-teal-glow after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity overflow-hidden",
        destructive:
          "relative bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-sm hover:shadow after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        outline:
          "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-teal-glow transition-colors duration-300",
        ghost:
          "hover:bg-accent/10 hover:text-accent-foreground transition-colors duration-300",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-300",
        elegant:
          "bg-white dark:bg-navy text-navy dark:text-white border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-300",
        premium:
          "relative bg-gradient-to-r from-teal to-gold text-white shadow-md hover:shadow-gold-glow after:absolute after:inset-0 after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity overflow-hidden hover:scale-105 transition-transform duration-300",
        glass:
          "bg-white/20 dark:bg-navy/20 backdrop-blur-md border border-white/30 dark:border-navy-300/20 text-navy dark:text-white shadow-sm hover:bg-white/30 dark:hover:bg-navy/30 hover:shadow-teal-glow transition-all duration-300",
        neumorphic:
          "bg-white dark:bg-navy text-navy dark:text-white shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-none transition-all duration-300",
        navy: "bg-navy text-white hover:bg-navy-800 transition-colors duration-300 shadow-sm hover:shadow",
        teal: "bg-teal text-navy hover:bg-teal-600 transition-colors duration-300 shadow-sm hover:shadow-teal-glow",
        gold: "bg-gold text-navy hover:bg-gold-600 transition-colors duration-300 shadow-sm hover:shadow-gold-glow",
        magic:
          "relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm hover:shadow-purple-glow after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-8 text-base",
        xl: "h-12 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-lg [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
