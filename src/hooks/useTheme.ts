import { useEffect } from "react";

import { ColorScheme } from "@/theme/constants";
import { STORAGE_KEYS } from "@/constants";

import useLocalStorage from "./useLocalStorage";

function useTheme() {
    const [theme, setTheme] = useLocalStorage<ColorScheme>(STORAGE_KEYS.THEME, ColorScheme.DARK);

    const toggleTheme = () => {
        setTheme(theme === ColorScheme.DARK ? ColorScheme.LIGHT : ColorScheme.DARK);
    }

    useEffect(() => {
        if (theme === ColorScheme.DARK) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

    const isDark = theme === ColorScheme.DARK;

    return { theme, toggleTheme, isDark };
}

export default useTheme;