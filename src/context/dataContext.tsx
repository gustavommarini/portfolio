import { createContext, FC, useContext, useEffect } from 'react';
import { ProfileData } from '@/models';
import { ThemeContext } from '@/theme';
import useApiHook from '@/hooks/useApiHook';
import { Error, Loading } from '@/pages';
import { ThemeButton } from '@/components';
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
        <Error />
        <ThemeButton />
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
      <ThemeButton />
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
