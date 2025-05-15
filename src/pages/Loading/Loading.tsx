import { FC } from 'react';
import { LoadingSpinner } from '@/components';
import './loading.scss';

const Loading: FC = () => {
  return (
    <section id="loading-page" className="loading-page container-xxl">
      <LoadingSpinner />
    </section>
  );
};

export default Loading;
