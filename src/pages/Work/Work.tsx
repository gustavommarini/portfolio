import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage, WorkCardItem } from '@/components';
import { SkillItem } from './components';
import './work.scss';
import { DataContext } from '@/context/dataContext';

const Work: FC = () => {
  const { t: workTranslation } = useTranslation(['experience']);
  const { data } = useContext(DataContext);

  return (
    <section id="work" className="work container-xxl">
      <TitlePage
        title={workTranslation('title')}
        subtitle={workTranslation('subtitle')}
      />
      <div className="work-body">
        <div className="portfolio-row experience-section">
          {data?.jobInfo.map((item) => (
            <React.Fragment key={item.id}>
              <WorkCardItem workItem={item} />
            </React.Fragment>
          ))}
        </div>
        <div className="skills-section">
          <div className="title-content skills-section-title">
            <h2>{workTranslation('skills_title')}</h2>
          </div>
          <div className="portfolio-row skills-section-items">
            {data?.skills.map((item) => (
              <SkillItem name={item.name} value={item.value} key={item.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
