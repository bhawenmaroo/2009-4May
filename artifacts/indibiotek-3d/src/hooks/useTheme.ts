import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "indibiotek-theme";
const EVENT = "indibiotek:themechange";

// Module-level source of truth — guarantees consistency even when multiple
// useTheme() consumers mount/unmount or React batches state updates.
let currentTheme: Theme | null = null;

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  // Prefer the value already on <html> (set by the inline bootstrap script in index.html)
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* localStorage may be blocked (private mode, sandboxed iframe) */
  }
  if (stored === "dark" || stored === "light") return stored;
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    if (currentTheme) return currentTheme;
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") {
      currentTheme = attr;
      return attr;
    }
    const initial = getInitialTheme();
    currentTheme = initial;
    return initial;
  });

  // Mirror state in a ref so toggle() never reads a stale value
  const themeRef = useRef<Theme>(theme);
  themeRef.current = theme;

  useEffect(() => {
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next === "dark" || next === "light") setThemeState(next);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "dark" || e.newValue === "light")) {
        currentTheme = e.newValue;
        setThemeState(e.newValue);
        document.documentElement.setAttribute("data-theme", e.newValue);
        document.documentElement.style.colorScheme = e.newValue;
      }
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    const current = currentTheme ?? themeRef.current;
    applyTheme(current === "dark" ? "light" : "dark");
  }, []);

  return { theme, setTheme, toggle };
}
