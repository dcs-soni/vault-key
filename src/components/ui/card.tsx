import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?:
      | "default"
      | "glass"
      | "premium"
      | "neumorphic"
      | "gradient"
      | "hover"
      | "parallax";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-card text-card-foreground shadow-sm border rounded-xl",
    glass:
      "bg-white/70 dark:bg-navy/70 backdrop-blur-xl border border-white/40 dark:border-navy-300/20 text-card-foreground shadow-lg rounded-xl",
    premium:
      "relative bg-card text-card-foreground shadow-premium border rounded-xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-teal dark:before:bg-gradient-teal before:opacity-10 hover:before:opacity-20 before:transition-opacity",
    neumorphic:
      "bg-white dark:bg-navy text-card-foreground shadow-neumorphic-light dark:shadow-neumorphic-dark rounded-xl border-transparent",
    gradient:
      "relative p-[1px] rounded-xl bg-gradient-to-br from-teal to-gold [&>div]:bg-card [&>div]:text-card-foreground [&>div]:rounded-xl [&>div]:h-full [&>div]:w-full",
    hover:
      "relative bg-card text-card-foreground shadow-sm border rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-teal-glow",
    parallax:
      "relative bg-card text-card-foreground shadow-sm border rounded-xl overflow-hidden transform perspective-1000",
  };

  return (
    <div
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
});

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 px-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: boolean;
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// New component for parallax effect inside cards
const CardParallax = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    depth?: 0 | 1 | 2;
  }
>(({ className, depth = 0, ...props }, ref) => {
  const depthClasses = {
    0: "parallax-layer-0",
    1: "parallax-layer-1",
    2: "parallax-layer-2",
  };

  return (
    <div
      ref={ref}
      className={cn("parallax-layer", depthClasses[depth], className)}
      {...props}
    />
  );
});
CardParallax.displayName = "CardParallax";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardParallax,
};
