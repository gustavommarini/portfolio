import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { socialprofils } from '@/services/data_content';
import { ICON_MAPPING } from './social-icons.types';
import './social-icons.scss';

export const SocialIcons: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);

  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent =
            ICON_MAPPING[platform as keyof typeof ICON_MAPPING] ||
            ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} target="_blank">
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
