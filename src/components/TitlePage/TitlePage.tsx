import React, { FC } from 'react';
import './title-page.scss';
import { TitlePageProps } from './title-page.types';
import DOMPurify from 'dompurify';

export const TitlePage: FC<TitlePageProps> = ({ title, subtitle }) => {
  const sanitizedHtmlTitle = DOMPurify.sanitize(title);
  return (
    <div className="page-title">
      <h1 dangerouslySetInnerHTML={{ __html: sanitizedHtmlTitle }} />
      <span className="page-subtitle">{subtitle}</span>
    </div>
  );
};
