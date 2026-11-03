"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A black redaction bar. Hover, focus or tap to reveal the text underneath.
 * Screen readers always get the real text.
 */
export function Redacted({ children, className }: { children: React.ReactNode; className?: string }) {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <span
      role="button"
      tabIndex={0}
      title="Classified. Hover or tap to declassify."
      data-revealed={revealed}
      onClick={() => setRevealed((v) => !v)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setRevealed((v) => !v);
        }
      }}
      className={cn("redacted", className)}
    >
      {children}
    </span>
  );
}
