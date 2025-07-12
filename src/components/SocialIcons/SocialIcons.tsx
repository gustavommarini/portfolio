import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DataContext } from '@/context/dataContext';
import { trackSocialAccess } from '@/services/analytics';
import { ICON_MAPPING } from './social-icons.types';
import './social-icons.scss';

export const SocialIcons: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);
  const { data } = useContext(DataContext);

  const trackDataSocialLink = (platform: string) =>
    trackSocialAccess('social_link', platform);

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
                onClick={() => trackDataSocialLink(platform)}
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
