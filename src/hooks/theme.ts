import { useEffect } from "react";
import { THEME_DARK, THEME_LIGHT } from "../consts/themes";

export default function useSystemTheme() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (isDark: boolean) => {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? THEME_DARK : THEME_LIGHT,
      );
    };
    applyTheme(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
}
