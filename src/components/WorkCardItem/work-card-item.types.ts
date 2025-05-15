import { TechnologiesProps, workItemProps } from '@/models';

export interface WorkCardItemProps {
  workItem: workItemProps;
  showExtraSection?: boolean;
}

export interface TechnologiesListProps {
  title: string;
  techList: TechnologiesProps[];
}
