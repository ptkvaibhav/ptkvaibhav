import { Big_Shoulders, Big_Shoulders_Stencil, Caveat, IBM_Plex_Mono, IBM_Plex_Sans, Special_Elite } from "next/font/google";

// Body copy: highly readable humanist sans.
export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Form fields, labels and metadata: monospaced "typed" look that stays legible.
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// Big condensed headlines.
export const fontDisplay = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Rubber stamps and section stencils.
export const fontStencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-stencil",
  display: "swap",
});

// Old typewriter, used sparingly for "typed notes".
export const fontTypewriter = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
  display: "swap",
});

// Handwritten margin notes.
export const fontHand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const fontVariables = [
  fontSans.variable,
  fontMono.variable,
  fontDisplay.variable,
  fontStencil.variable,
  fontTypewriter.variable,
  fontHand.variable,
].join(" ");
