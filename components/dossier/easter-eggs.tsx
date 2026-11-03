"use client";

import * as React from "react";

import type { DossierToast } from "@/components/dossier/toast";
import { showToast } from "@/components/dossier/toast";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Secrets for curious visitors:
 *  1. A message in the dev-tools console.
 *  2. The Konami code declassifies every redaction on the page.
 *  3. Typing "hire" anywhere (outside inputs) gets a cheeky response.
 * Also hosts the toast used by other easter eggs (stamp clicks, command palette).
 */
export function EasterEggs() {
  const [toast, setToast] = React.useState<DossierToast | null>(null);

  // Toast host
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (event: Event) => {
      setToast((event as CustomEvent<DossierToast>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 4200);
    };
    window.addEventListener("dossier-toast", onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("dossier-toast", onToast);
    };
  }, []);

  // Console message for people who open dev tools
  React.useEffect(() => {
    const big = "font: 900 22px Impact, sans-serif; color: #b3202a; letter-spacing: 2px;";
    const small = "font: 12px ui-monospace, monospace; color: #8a7f6a;";
    console.log("%cCLASSIFIED // EYES ONLY", big);
    console.log(
      "%cOh hello, fellow inspector of source code.\nYou clearly read the fine print — so do I, professionally.\n\nflag{y0u_0p3n3d_d3v700l5_n1c3}\n\nHint: there are more secrets. Try an old cheat code. ↑↑↓↓←→←→BA\nOr just email me: ptkvaibhav@gmail.com",
      small
    );
  }, []);

  // Keyboard secrets
  React.useEffect(() => {
    let konamiIndex = 0;
    let typed = "";

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.closest("input, textarea, [contenteditable='true']"))) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      // Konami code
      if (key === KONAMI[konamiIndex]) {
        konamiIndex += 1;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          const on = document.documentElement.classList.toggle("declassified");
          showToast(
            on
              ? { title: "Clearance granted", body: "All redactions lifted. flag{up_up_d0wn_d0wn_b4}" }
              : { title: "Re-classified", body: "Redactions restored. Your secret is safe." }
          );
        }
      } else {
        konamiIndex = key === KONAMI[0] ? 1 : 0;
      }

      // Type "hire"
      if (event.key.length === 1) {
        typed = (typed + key).slice(-4);
        if (typed === "hire") {
          showToast({ title: "Request logged", body: "Excellent instincts. The contact form is at the bottom of the file." });
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!toast) return null;

  return (
    <div role="status" aria-live="polite" className="fixed inset-x-4 bottom-4 z-[150] flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-6">
      <div className="paper max-w-sm animate-toast-in px-5 py-4">
        <p className="font-stencil text-xl font-black uppercase tracking-wider text-stamp">{toast.title}</p>
        {toast.body ? <p className="mt-1 font-mono text-xs leading-relaxed text-foreground">{toast.body}</p> : null}
      </div>
    </div>
  );
}
