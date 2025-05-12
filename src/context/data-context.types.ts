import { ProfileData } from '@/models';

export interface DataProviderProps {
  children: React.ReactNode;
}

export type errorType = string | null;

export interface DataContextProps {
  data: ProfileData | null;
  loading: boolean;
  error: errorType;
}
