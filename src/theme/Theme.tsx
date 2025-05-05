import { useEffect, createContext, useState, FC } from 'react';
import {
  STORED_NAME,
  ThemeContextProps,
  ThemeItems,
  ThemeProviderProps,
} from './theme.types';

const ThemeContext = createContext<ThemeContextProps>(null!);

const getTheme = () => {
  const theme = localStorage.getItem(STORED_NAME);
  if (!theme) {
    // Default theme is taken as dark-theme
    localStorage.setItem(STORED_NAME, ThemeItems.darkTheme);
    return ThemeItems.darkTheme;
  } else {
    return theme;
  }
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === ThemeItems.darkTheme) {
      setTheme(ThemeItems.lightTheme);
    } else {
      setTheme(ThemeItems.darkTheme);
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem(STORED_NAME, theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
