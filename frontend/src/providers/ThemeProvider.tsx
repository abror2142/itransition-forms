import { PropsWithChildren, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

type ThemeProviderProps = PropsWithChildren;

function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // This sets the initial theme according to the mode of the device
    const checkSystemTheme = () => {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
    };
    checkSystemTheme();

    // This ensures changes made during mode changes
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const themeChangeHandler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    themeMediaQuery.addEventListener("change", themeChangeHandler);

    // Does clean up
    return () => {
      themeMediaQuery.removeEventListener("change", themeChangeHandler);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
