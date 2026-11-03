import localFont from "next/font/local";

// Fonts are self-hosted from app/fonts (Latin subset, WOFF2) so builds never depend on
// the Google Fonts API, which intermittently returned font URLs that next/font could not
// parse. Licenses: app/fonts/licenses (SIL OFL 1.1; Special Elite: Apache 2.0).

// Body copy: highly readable humanist sans (variable weight).
export const fontSans = localFont({
  src: "../app/fonts/ibm-plex-sans.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Form fields, labels and metadata: monospaced "typed" look that stays legible.
export const fontMono = localFont({
  src: [
    { path: "../app/fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/ibm-plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Big condensed headlines (variable weight).
export const fontDisplay = localFont({
  src: "../app/fonts/big-shoulders.woff2",
  weight: "700 900",
  variable: "--font-display",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

// Rubber stamps and section stencils (variable weight).
export const fontStencil = localFont({
  src: "../app/fonts/big-shoulders-stencil.woff2",
  weight: "800 900",
  variable: "--font-stencil",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

// Old typewriter, used sparingly for "typed notes".
export const fontTypewriter = localFont({
  src: "../app/fonts/special-elite.woff2",
  weight: "400",
  variable: "--font-typewriter",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Handwritten margin notes (variable weight).
export const fontHand = localFont({
  src: "../app/fonts/caveat.woff2",
  weight: "500 700",
  variable: "--font-hand",
  display: "swap",
  fallback: ["cursive"],
});

export const fontVariables = [
  fontSans.variable,
  fontMono.variable,
  fontDisplay.variable,
  fontStencil.variable,
  fontTypewriter.variable,
  fontHand.variable,
].join(" ");
