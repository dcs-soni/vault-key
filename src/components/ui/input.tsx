import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "minimal" | "floating" | "underlined" | "premium";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default:
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      minimal:
        "flex h-10 w-full bg-transparent border-0 border-b-2 border-input px-0 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
      floating:
        "peer h-14 px-4 pt-5 pb-2 w-full rounded-xl border-2 border-input bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      underlined:
        "flex h-10 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-0 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      premium:
        "flex h-12 w-full rounded-xl border-2 border-input bg-background px-4 py-2 text-base shadow-sm focus:shadow ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
    };

    if (variant === "floating") {
      return (
        <input
          type={type}
          className={cn(variantClasses[variant], className)}
          ref={ref}
          placeholder=" "
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(variantClasses[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Floating Label Input Component
interface FloatingLabelInputProps extends InputProps {
  label: string;
  id: string;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, id, ...props }, ref) => {
  return (
    <div className="relative">
      <Input
        id={id}
        variant="floating"
        className={className}
        ref={ref}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-300 pointer-events-none peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary peer-valid:text-xs peer-valid:top-2">
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { Input, FloatingLabelInput };
