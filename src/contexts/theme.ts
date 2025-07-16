export const THEME_LIGHT = "emerald";
export const THEME_DARK = "forest";

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

class ThemeContext {
  constructor() {}

  theme: Theme;

  setTheme(theme: Theme) {
    this.theme = theme;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  setPreferedTheme() {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.setTheme(mediaQuery.matches ? THEME_DARK : THEME_LIGHT);
    }
  }
}

export default ThemeContext;
