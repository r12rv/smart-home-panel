import { useEffect, useState } from "react";

export default function usePreferredColorScheme() {
  const getScheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [scheme, setScheme] = useState(getScheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setScheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return scheme;
}
