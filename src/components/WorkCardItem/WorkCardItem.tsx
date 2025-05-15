import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TechnologiesListProps,
  WorkCardItemProps,
} from './work-card-item.types';
import './work-card-item.scss';

const TechnologiesList: FC<TechnologiesListProps> = ({ title, techList }) => {
  return (
    <>
      <h5>{title}</h5>
      <div className="tech-items">
        {techList.map((techItem) => (
          <a
            href={techItem.url}
            className={`color-icon-${techItem.name}`}
            target="_blank"
            title={techItem.name}
            key={techItem.name}
          >
            <i className={`icon-${techItem.name}`} />
          </a>
        ))}
      </div>
    </>
  );
};

export const WorkCardItem: FC<WorkCardItemProps> = ({
  workItem,
  showExtraSection = true,
}) => {
  const { t: workTranslation } = useTranslation(['experience']);

  return (
    <div className="card-item-container portfolio-col-6">
      <div className="bullet"></div>
      <div className="card-item">
        <small>
          <i className="fa-solid fa-calendar-days"></i> {workItem.from}{' '}
          {workItem.to ? `- ${workItem.to}` : ''}
        </small>
        <h4>
          {workItem.name} <div className="separator"></div>
          <span>{workItem.location}</span>
        </h4>
        <p>{workTranslation(workItem.description)}</p>
        {showExtraSection && (
          <div className="extra-details wrap-collabsible">
            <input
              id={`collapsible-${workItem.id}`}
              className="toggle"
              type="checkbox"
            />
            <label
              htmlFor={`collapsible-${workItem.id}`}
              className="lbl-toggle"
            >
              <i className="fa-solid fa-circle-arrow-down"></i>
              {/* <i className="fa-solid fa-arrow-down-wide-short"></i> */}
            </label>
            <div className="collapsible-content">
              <div className="content-inner">
                {workItem.developmentStack &&
                  workItem.developmentStack.length > 0 && (
                    <TechnologiesList
                      title={workTranslation('development_stack')}
                      techList={workItem.developmentStack}
                    />
                  )}
                {workItem.codingEnvironment &&
                  workItem.codingEnvironment.length > 0 && (
                    <TechnologiesList
                      title={workTranslation('coding_environment')}
                      techList={workItem.codingEnvironment}
                    />
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
