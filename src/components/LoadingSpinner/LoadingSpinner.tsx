import { FC } from 'react';
import { LoadingSpinnerProps } from './loading-spiner.types';
import './loading-spiner.scss';

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  loadingText = '',
}) => {
  return (
    <div className="ring">
      {loadingText || 'Loading'}
      <span></span>
    </div>
  );
};
