import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextData {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext({} as ThemeContextData);

const defaultTheme: Theme = "system";
const storageKey = "@pizzashop/theme";

interface ThemeContextProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeContextProvider({
  children,
}: ThemeContextProviderProps): JSX.Element | null {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      return root.classList.add(systemTheme);
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: theme => {
          localStorage.setItem(storageKey, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
