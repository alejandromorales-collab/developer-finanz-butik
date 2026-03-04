import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-teal-mid active:bg-[hsl(174,85%,24%)]",
        secondary: "bg-charcoal text-white hover:bg-[hsl(220,20%,28%)] active:bg-[hsl(220,20%,16%)]",
        tertiary: "bg-muted text-foreground hover:bg-[hsl(210,20%,90%)] active:bg-[hsl(210,20%,84%)]",
        ghost: "text-foreground hover:bg-muted active:bg-[hsl(210,20%,90%)]",
        outline: "border border-border bg-background text-foreground hover:bg-muted active:bg-[hsl(210,20%,90%)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-[hsl(0,72%,42%)] active:bg-[hsl(0,72%,34%)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
