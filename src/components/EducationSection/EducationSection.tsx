import React, { FC } from 'react';
import './education-section.scss';
import { EducationSectionProps } from './education-section.types';

export const EducationSection: FC<EducationSectionProps> = ({
  title,
  eduArray,
}) => {
  return (
    <div className="container education-section">
      <div className="simple-row content-row">
        <div className="title-content simple-first-column">
          <h2>{title}</h2>
        </div>
        <div className="description-education simple-second-column">
          {eduArray.map((item) => (
            <div className="card-item" key={item.id}>
              <small>
                <i className="fa-solid fa-building-columns"></i> {item.from} -{' '}
                {item.to}
              </small>
              <h4>
                {item.name} <div className="separator"></div>{' '}
                <span>{item.location}</span>{' '}
              </h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
