export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}
