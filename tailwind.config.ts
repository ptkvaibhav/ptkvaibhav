import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
        stencil: ["var(--font-stencil)", "var(--font-display)", "Impact", "sans-serif"],
        typewriter: ["var(--font-typewriter)", "var(--font-mono)", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--foreground))",
        popover: "hsl(var(--card))",
        "popover-foreground": "hsl(var(--foreground))",
        primary: "hsl(var(--stamp))",
        "primary-foreground": "hsl(var(--paper))",
        secondary: "hsl(var(--muted))",
        "secondary-foreground": "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--blueink))",
        "accent-foreground": "hsl(var(--paper))",
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--blueink))",
        // Dossier palette
        paper: "hsl(var(--paper))",
        ink: "hsl(var(--foreground))",
        manila: "hsl(var(--manila))",
        stamp: "hsl(var(--stamp))",
        blueink: "hsl(var(--blueink))",
        highlight: "hsl(var(--highlight))",
        redact: "hsl(var(--redact))",
      },
      boxShadow: {
        paper: "0 1px 0 hsl(var(--border)), 0 12px 30px -12px rgb(40 30 10 / 0.25)",
        lift: "0 2px 0 hsl(var(--border)), 0 24px 40px -16px rgb(40 30 10 / 0.35)",
        hard: "4px 4px 0 0 hsl(var(--foreground))",
      },
      keyframes: {
        "stamp-in": {
          "0%": { transform: "scale(2.2) rotate(var(--stamp-rot, -8deg))", opacity: "0" },
          "60%": { transform: "scale(0.92) rotate(var(--stamp-rot, -8deg))", opacity: "1" },
          "100%": { transform: "scale(1) rotate(var(--stamp-rot, -8deg))", opacity: "1" },
        },
        blink: { "0%, 50%": { opacity: "1" }, "51%, 100%": { opacity: "0" } },
        "toast-in": {
          from: { transform: "translateY(20px) rotate(-2deg)", opacity: "0" },
          to: { transform: "translateY(0) rotate(-2deg)", opacity: "1" },
        },
      },
      animation: {
        "stamp-in": "stamp-in 0.5s cubic-bezier(.2,.9,.3,1.3) both",
        blink: "blink 1s steps(1) infinite",
        "toast-in": "toast-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
