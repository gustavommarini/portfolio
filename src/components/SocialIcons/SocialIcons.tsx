import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_MAPPING } from './social-icons.types';
import './social-icons.scss';
import { DataContext } from '@/context/dataContext';

export const SocialIcons: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);
  const { data } = useContext(DataContext);

  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(data?.socialProfiles || {}).map(([platform, url]) => {
          const IconComponent =
            ICON_MAPPING[platform as keyof typeof ICON_MAPPING] ||
            ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a
                href={url}
                target="_blank"
                aria-label={`Visit my ${platform} profile`}
              >
                <i className={`fa-brands ${IconComponent}`}></i>
              </a>
            </li>
          );
        })}
      </ul>
      <p>{homeTranslation('follow_me')}</p>
    </div>
  );
};
