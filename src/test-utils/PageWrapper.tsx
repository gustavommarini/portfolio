import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeContext } from '@/theme';
import { ThemeContextProps } from '@/theme/theme.types';
import { DataContext } from '@/context/dataContext';
import {
  skills,
  contactConfig,
  socialprofiles,
  educationInfo,
  jobInfo,
} from '../services/data_content';
import '../language/test-i18n';
import { DataContextProps } from '@/context/data-context.types';

interface PageWrapperProps {
  children: ReactNode;
  themeContext?: Partial<ThemeContextProps>;
  dataContext?: Partial<DataContextProps>;
}

const defaultThemeContext = {
  theme: 'dark-theme',
  setTheme: jest.fn(),
  toggleTheme: jest.fn(),
};

const defaultDataContext = {
  data: {
    skills,
    contactConfig,
    socialProfiles: socialprofiles,
    educationInfo,
    jobInfo,
  },
  loading: false,
  error: null,
};

export const PageWrapper = ({
  children,
  themeContext = defaultThemeContext,
  dataContext = defaultDataContext,
}: PageWrapperProps) => {
  return (
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeContext.Provider value={themeContext as ThemeContextProps}>
        <DataContext.Provider value={dataContext as DataContextProps}>
          {children}
        </DataContext.Provider>
      </ThemeContext.Provider>
    </MemoryRouter>
  );
};
