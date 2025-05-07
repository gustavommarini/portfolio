import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EducationSectionProps } from './education-section.types';
import './education-section.scss';

export const EducationSection: FC<EducationSectionProps> = ({
  title,
  eduArray,
  useBookIcon = false,
}) => {
  const { t: eduInfoTranslation } = useTranslation(['education']);
  const noDates = eduArray.every((item) => !item.from && !item.to);

  return (
    <>
      <div className="portfolio-row content-row">
        <div className="title-content portfolio-col-5">
          <h2>{title}</h2>
        </div>
        <div
          className={`description-education portfolio-col-7 ${noDates ? 'adjust-padding-top' : ''}`}
        >
          {eduArray.map((item) => (
            <div className="card-item" key={item.id}>
              {item.from && (
                <small>
                  <i
                    className={`fa-solid ${useBookIcon ? 'fa-book' : 'fa-graduation-cap'}`}
                  ></i>{' '}
                  {item.from} {item.to ? `- ${item.to}` : ''}
                </small>
              )}
              <h4
                style={
                  useBookIcon ? { borderBottomColor: 'var(--text-base)' } : {}
                }
              >
                {eduInfoTranslation(item.name)}
                {item.location && (
                  <>
                    <div className="separator"></div>
                    <span>{item.location}</span>
                  </>
                )}
              </h4>
              <p>{eduInfoTranslation(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
