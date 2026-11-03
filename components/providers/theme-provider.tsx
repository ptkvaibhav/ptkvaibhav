"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ptk-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (savedTheme) {
        setThemeState(savedTheme);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, [storageKey]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let computedTheme: "dark" | "light" = "light";

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      computedTheme = systemTheme;
    } else {
      computedTheme = theme;
    }

    root.classList.add(computedTheme);
    setResolvedTheme(computedTheme);
  }, [theme]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // ignore
      }
      setThemeState(newTheme);
    },
    [storageKey]
  );

  const toggleTheme = React.useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme: mounted ? resolvedTheme : "light",
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, mounted, setTheme, toggleTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

