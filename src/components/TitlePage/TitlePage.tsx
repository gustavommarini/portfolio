import React, { FC } from 'react';
import DOMPurify from 'dompurify';
import { TitlePageProps } from './title-page.types';
import './title-page.scss';

export const TitlePage: FC<TitlePageProps> = ({ title, subtitle }) => {
  const sanitizedHtmlTitle = DOMPurify.sanitize(title);
  return (
    <div className="page-title">
      <h1 dangerouslySetInnerHTML={{ __html: sanitizedHtmlTitle }} />
      <span className="page-subtitle">{subtitle}</span>
    </div>
  );
};
