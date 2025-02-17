import { createContext } from "react";

type ThemeContext = {
    isDarkMode: boolean | null;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined)