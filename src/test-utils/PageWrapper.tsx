import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from '@/theme';
import { ThemeContextProps } from '@/theme/theme.types';
import '../language/test-i18n';

interface PageWrapperProps {
  children: ReactNode;
  themeContext?: Partial<ThemeContextProps>;
}

const defaultThemeContext = {
  theme: 'dark-theme',
  setTheme: jest.fn(),
  toggleTheme: jest.fn(),
};

export const PageWrapper = ({
  children,
  themeContext = defaultThemeContext,
}: PageWrapperProps) => {
  return (
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeContext.Provider value={themeContext as ThemeContextProps}>
        {children}
      </ThemeContext.Provider>
    </MemoryRouter>
  );
};
