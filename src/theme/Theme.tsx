import { useEffect, createContext, useState, FC } from 'react';
import { ThemeContextProps, ThemeProviderProps } from './theme.types';

const ThemeContext = createContext<ThemeContextProps>(null!);

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (!theme) {
    // Default theme is taken as dark-theme
    localStorage.setItem('theme', 'dark-theme');
    return 'dark-theme';
  } else {
    return theme;
  }
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem('theme', theme);
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
