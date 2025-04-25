import React, { FC } from 'react';
import { WorkCardItemProps } from './work-card-item.types';
import './work-card-item.scss';

export const WorkCardItem: FC<WorkCardItemProps> = ({ workItem }) => {
  return (
    <div className="card-item-container">
      <div className="bullet"></div>
      <div className="card-item">
        <small>
          <i className="fa-solid fa-calendar-days"></i> {workItem.from} -{' '}
          {workItem.to}
        </small>
        <h4>
          {workItem.name} <div className="separator"></div>
          <span>{workItem.location}</span>
        </h4>
        <p>{workItem.description}</p>
      </div>
    </div>
  );
};
