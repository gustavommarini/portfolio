import { FC } from 'react';
import { LoadingProps } from './loading.types';
import './loading.scss';

export const Loading: FC<LoadingProps> = ({ loadingText = '' }) => {
  return (
    <div className="loading-container">
      <div className="ring">
        {loadingText || 'Loading'}
        <span></span>
      </div>
    </div>
  );
};
