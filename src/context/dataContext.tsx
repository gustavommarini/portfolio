import { createContext, FC, useContext, useEffect } from 'react';
import { ProfileData } from '@/models';
import { ThemeContext } from '@/theme';
import useApiHook from '@/hooks/useApiHook';
import { Error, Loading } from '@/pages';
import { LanguageMenu, ThemeButton } from '@/components';
import { DataContextProps, DataProviderProps } from './data-context.types';

const DataContext = createContext<DataContextProps>({
  data: null,
  loading: false,
  error: null,
});

const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const { data, loading, error } = useApiHook<ProfileData>();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Error errorCode={error.code} errorMsg={error.message} />
        <ThemeButton />
        <LanguageMenu />
      </>
    );
  }

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
