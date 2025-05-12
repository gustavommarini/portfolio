import { createContext, FC } from 'react';
import { ProfileData } from '@/models';
import { Loading } from '@/components';
import useApiHook from '@/hooks/useApiHook';
import { DataContextProps, DataProviderProps } from './data-context.types';

const DataContext = createContext<DataContextProps>(null!);

const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const { data, loading, error } = useApiHook<ProfileData>();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
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
