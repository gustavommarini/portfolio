export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export enum ThemeItems {
  darkTheme = 'dark-theme',
  lightTheme = 'light-theme',
}

export const STORED_NAME = 'theme';
