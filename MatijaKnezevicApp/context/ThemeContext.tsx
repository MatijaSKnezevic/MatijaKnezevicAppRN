import {createContext, useContext, useEffect, useState} from "react";
import {LightTheme, DarkTheme} from "@/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type themeType = "light" | "dark";

type ThemeContextType = {
    theme: themeType,
    colors: typeof LightTheme;
    toggleTheme: () => void;

}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    const[theme, setTheme] = useState<themeType>('light')

    useEffect(() => {
        AsyncStorage.getItem("appTheme").then((storedTheme) => {
            if (storedTheme) setTheme(storedTheme as themeType);
        });
    }, [])

    const toggleTheme = async () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        await AsyncStorage.setItem("appTheme", next);
    }

    const colors = theme === "dark" ? DarkTheme : LightTheme;

    return (
        <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
export function useThemeColors(){
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useThemeColors must be used within ThemeProvider");
    return context;
}