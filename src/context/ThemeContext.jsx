import { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isLocked = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    const timer = setTimeout(() => {
      isLocked.current = false;
    }, 260);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    if (isLocked.current) return;
    isLocked.current = true;
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}