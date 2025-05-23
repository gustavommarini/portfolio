import { FC } from 'react';
import { SkillItemProps } from './skill-item.types';
import './skill-item.scss';

export const SkillItem: FC<SkillItemProps> = ({ name, value }) => {
  return (
    <div className="portfolio-col-4 skill-chart">
      <h5>{name}</h5>
      <div
        className="skill-bar"
        data-testid="skill-bar"
        style={{ width: `${value}%` }}
      >
        <span className="skill-percentage">
          {value}%<i className="fa-solid fa-caret-down skill-down-arrow"></i>
        </span>
      </div>
    </div>
  );
};
