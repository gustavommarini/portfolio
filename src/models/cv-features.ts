export interface cvItemInfoProps {
  id: string;
  name: string;
  location: string;
  description: string;
  from?: string;
  to?: string;
}

export interface workItemProps extends cvItemInfoProps {
  developmentStack?: TechnologiesProps[];
  codingEnvironment?: TechnologiesProps[];
}

export interface TechnologiesProps {
  name: string;
  url: string;
}

export interface TechnologiesData {
  [key: string]: TechnologiesProps;
}
