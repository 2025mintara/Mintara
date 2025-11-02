import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-250 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-mintara-accent/50",
  {
    variants: {
      variant: {
        default: "bg-mintara-primary text-mintara-text-primary hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,224,198,0.2),0_0_12px_rgba(0,224,198,0.6)] active:bg-[#004B38] active:shadow-inner active:scale-100",
        destructive:
          "bg-mintara-error text-mintara-text-primary hover:bg-mintara-error/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,107,107,0.3)] active:bg-mintara-error/80 active:scale-100",
        outline:
          "border-2 border-mintara-accent bg-transparent text-mintara-text-primary hover:bg-mintara-accent/10 hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(0,224,198,0.4)] active:bg-mintara-accent/5 active:scale-100",
        secondary:
          "border-2 border-mintara-accent bg-transparent text-mintara-text-primary hover:shadow-[0_0_12px_rgba(0,224,198,0.2)] hover:scale-[1.02] active:bg-mintara-accent/5 active:scale-100",
        ghost:
          "bg-mintara-surface/10 text-mintara-text-primary hover:bg-mintara-surface/20 hover:scale-[1.02] hover:shadow-[0_0_8px_rgba(0,224,198,0.15)] backdrop-blur-sm border border-mintara-border active:bg-mintara-surface/15 active:scale-100",
        icon:
          "w-9 h-9 rounded-full border border-mintara-border text-mintara-text-primary hover:shadow-[inset_0_0_12px_rgba(0,224,198,0.2)] hover:border-mintara-accent/50 active:shadow-[inset_0_0_8px_rgba(0,224,198,0.3)] active:scale-95",
        link: "text-mintara-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-3",
        sm: "h-9 px-5 py-2",
        lg: "h-14 px-8 py-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
