import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-none border-0 border-b-2 border-foreground/35 bg-transparent px-1 py-2 font-mono text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-blueink focus:bg-blueink/[0.04] sm:text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
