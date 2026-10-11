import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => { } });

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isLocked = useRef(false);

  // useLayoutEffect: class ekran çəkilməzdən əvvəl tətbiq olunur
  useLayoutEffect(() => {
    const root = document.documentElement;

    // 1) transition-ları söndür
    root.classList.add("no-theme-transition");

    // 2) temanı tətbiq et
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    // 3) iki frame sonra transition-ları geri aç
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        root.classList.remove("no-theme-transition");
      });
    });

    // klik qoruması
    const timer = setTimeout(() => {
      isLocked.current = false;
    }, 260);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
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