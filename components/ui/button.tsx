import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex transition-all duration-300 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#e8eaf6] text-[#3452fe] shadow-[0px_3px_12px_0px_#e8eaf6] hover:shadow-[0px_3px_12px_0px_#eaecf7] hover:bg-[#e8eaf6]/90",
        instaling:
          "bg-[#fa9d00]/20 text-[#fa9d00] shadow-[0px_3px_12px_0px_#fceccc] hover:shadow-[0px_3px_12px_0px_#fadeb1] hover:bg-[#fa9d00]/30",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-[#5069fa] bg-[#e8eaf6]/50 shadow-sm",
        combobox: "shadow-sm bg-zinc-100 rounded-[14px]",
        secondary: "bg-[#ffa000] text-[#fff8ed] hover:bg-[#ffa000]/90",
        secondaryBlue: "bg-[#3452fe] text-[#fff8ed] hover:bg-[#3452fe]/90",
        secondaryBlue2: "bg-[#fafafa] text-[#3452fe] hover:bg-[#fafafa]/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-[8px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 py-2 px-4 rounded-[8px]",
        icon: "h-9 w-9 rounded-[8px]",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
