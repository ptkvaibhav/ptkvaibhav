"use client";

import * as React from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/";

/**
 * Renders text that "decrypts" from random glyphs on first paint.
 * Server/initial render shows the real text, so it's readable without JS and for crawlers.
 */
export function DecryptText({ text, duration = 900, className }: { text: string; duration?: number; className?: string }) {
  const [output, setOutput] = React.useState(text);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const settled = Math.floor(progress * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < settled || ch === " ") next += ch;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </span>
  );
}
