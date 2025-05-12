const skills = [
  {
    name: 'Javascript',
    value: 90,
  },
  {
    name: 'Typescript',
    value: 75,
  },
  {
    name: 'React',
    value: 90,
  },
  {
    name: 'Jquery',
    value: 80,
  },
];

const contactConfig = {
  email: 'email@some.com',
  phone: '1234567890',
  phone_country_code: '39',
  phone_formated: '(+39)123-456789',
  address: 'Some place, Italia',
  skype: 'skype_usr',
  site: 'https://website.com',
};

const socialprofils = {
  github: 'https://github.com',
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
};

const educationInfo = {
  education: [
    {
      id: '1',
      name: 'uni',
      location: 'Algun lugar, Argentina',
      description: 'uni_desc',
      from: '2002',
      to: '2011',
    },
    {
      id: '2',
      name: 'school',
      location: 'Bs as, Argentina',
      description: 'school_desc',
      from: '1999',
      to: '2001',
    },
  ],
  courses: [
    {
      id: '1',
      name: 'react',
      location: 'Argentina',
      description: 'react_desc',
      from: '2020',
    },
    {
      id: '1a',
      name: 'wordpress_course',
      location: 'Colombia',
      description: 'wordpress_course_desc',
      from: '2019',
    },
    {
      id: '2',
      name: 'ux_masterclass',
      location: 'Australia',
      description: 'ux_masterclass_desc',
      from: '2015',
    },
  ],
  languages: [
    {
      id: '1',
      name: 'spa',
      location: '',
      description: 'spa_desc',
    },
    {
      id: '2',
      name: 'eng',
      location: '',
      description: 'eng_desc',
    },
    {
      id: '3',
      name: 'ita',
      location: '',
      description: 'ita_desc',
    },
  ],
};

const jobInfo = [
  {
    id: '1',
    name: 'Compoany 01',
    location: 'Colombia',
    description: 'job1_desc',
    from: '2022',
    to: '2024',
  },
  {
    id: '2',
    name: 'Compoany 02',
    location: 'Argentina',
    description: 'job2_desc',
    from: '2021',
    to: '2025',
  },
  {
    id: '3',
    name: 'Compoany 03',
    location: 'Alemania',
    description: 'job3_desc',
    from: '2020',
    to: '2021',
  },
  {
    id: '4',
    name: 'Compoany 04',
    location: 'Italia',
    description: 'job4_desc',
    from: '2011',
    to: 'PRESENT',
  },
];

export { skills, contactConfig, socialprofils, educationInfo, jobInfo };
