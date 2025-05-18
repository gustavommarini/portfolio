import { FC } from 'react';
import { TitlePageProps } from './title-page.types';
import './title-page.scss';

const splitBySpanTag = (input: string) => {
  const regex = /(.*?)<span>(.*?)<\/span>/;
  const match = input.match(regex);

  if (match) {
    const outsideText = match[1].trim();
    const insideText = match[2].trim();
    return {
      title1: outsideText,
      title2: insideText,
    };
  }

  return {
    title1: input,
    title2: '',
  };
};

export const TitlePageV2: FC<TitlePageProps> = ({ title, subtitle }) => {
  const { title1, title2 } = splitBySpanTag(title);
  return (
    <div className="page-title page-version-two">
      <h1>
        <div className="first-h1">{title1}</div>
        <div className="second-h1">{title2}</div>
      </h1>
      <span className="page-subtitle">{subtitle}</span>
    </div>
  );
};
