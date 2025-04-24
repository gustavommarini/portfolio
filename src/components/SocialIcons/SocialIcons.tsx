import React from 'react';
import { socialprofils } from '@/services/data_content';
import { ICON_MAPPING } from './SocialIcons.types';
import './socialicons.scss';

export const SocialIcons = () => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} target="_blank">
                <i className={`fa-brands ${IconComponent}`}></i>
              </a>
            </li>
          );
        })}
      </ul>
      {/* Add translation */}
      <p>Follow Me</p>
    </div>
  );
};
