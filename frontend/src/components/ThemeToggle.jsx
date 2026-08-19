import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "evnexus-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card/70 text-foreground transition hover:bg-accent/50"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="grid place-items-center"
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
