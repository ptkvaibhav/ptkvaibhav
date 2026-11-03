"use client";

import * as React from "react";

/**
 * Desktop-only "investigator" cursor: an ink dot with a reticle that trails behind,
 * grows over anything clickable and shows a short label. Disabled on touch devices
 * and when the user prefers reduced motion.
 */
export function DossierCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);
  const [active, setActive] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-dossier-cursor");
    return () => document.documentElement.classList.remove("has-dossier-cursor");
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor], input, textarea, select, label"
      );
      if (!el || el.matches("input, textarea, select")) {
        setActive(false);
        setLabel(null);
        return;
      }
      setActive(true);
      if (el.dataset.cursor) setLabel(el.dataset.cursor);
      else if (el.classList.contains("redacted")) setLabel("Declassify");
      else if (el instanceof HTMLAnchorElement && el.target === "_blank") setLabel("Open");
      else setLabel(null);
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.2;
      ring.y += (target.y - ring.y) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = active ? 52 : 30;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]" style={{ opacity: visible ? 1 : 0 }}>
      <div ref={ringRef} className="absolute left-0 top-0">
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-stamp transition-[width,height,background-color] duration-200"
          style={{
            width: pressed ? size * 0.8 : size,
            height: pressed ? size * 0.8 : size,
            backgroundColor: active ? "hsl(var(--stamp) / 0.08)" : "transparent",
          }}
        >
          {/* reticle ticks */}
          <span className="absolute left-1/2 top-0 h-2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-stamp" />
          <span className="absolute bottom-0 left-1/2 h-2 w-[1.5px] -translate-x-1/2 translate-y-1/2 bg-stamp" />
          <span className="absolute left-0 top-1/2 h-[1.5px] w-2 -translate-x-1/2 -translate-y-1/2 bg-stamp" />
          <span className="absolute right-0 top-1/2 h-[1.5px] w-2 -translate-y-1/2 translate-x-1/2 bg-stamp" />
          {label ? (
            <span className="absolute left-full top-full ml-1 mt-1 whitespace-nowrap rounded-sm bg-stamp px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-paper">
              {label}
            </span>
          ) : null}
        </div>
      </div>
      <div ref={dotRef} className="absolute left-0 top-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </div>
    </div>
  );
}
