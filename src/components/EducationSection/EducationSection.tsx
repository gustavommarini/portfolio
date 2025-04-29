import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EducationSectionProps } from './education-section.types';
import './education-section.scss';

export const EducationSection: FC<EducationSectionProps> = ({
  title,
  eduArray,
}) => {
  const { t: eduInfoTranslation } = useTranslation(['education']);

  return (
    <div className="education-section">
      <div className="portfolio-row content-row">
        <div className="title-content portfolio-col-5">
          <h2>{title}</h2>
        </div>
        <div className="description-education portfolio-col-7">
          {eduArray.map((item) => (
            <div className="card-item" key={item.id}>
              <small>
                <i className="fa-solid fa-building-columns"></i> {item.from}{' '}
                {item.to ? `- ${item.to}` : ''}
              </small>
              <h4>
                {eduInfoTranslation(item.name)}{' '}
                <div className="separator"></div>{' '}
                <span>{item.location}</span>{' '}
              </h4>
              <p>{eduInfoTranslation(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
