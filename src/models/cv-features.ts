export interface simpleKeyValue {
  name: string;
  value: number;
}
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

export interface contactConfigProps {
  email: string;
  phone: string;
  phone_country_code: string;
  phone_formated: string;
  address: string;
  skype?: string;
  site?: string;
}

export interface socialProfilesProps {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  whatsapp?: string;
  skype?: string;
}

export interface educationInfoProps {
  education: cvItemInfoProps[];
  courses: cvItemInfoProps[];
  languages: cvItemInfoProps[];
}

export interface ProfileData {
  skills: simpleKeyValue[];
  contactConfig: contactConfigProps;
  socialProfiles: socialProfilesProps;
  educationInfo: educationInfoProps;
  jobInfo: cvItemInfoProps[];
}
