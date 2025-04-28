import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage } from '@/components';
import { jobInfo, skills } from '@/services/data_content';
import { SkillItem, WorkCardItem } from './components';
import './work.scss';

const Work: FC = () => {
  const { t: workTranslation } = useTranslation(['experience']);

  return (
    <section id="work" className="work">
      <TitlePage
        title={workTranslation('title')}
        subtitle={workTranslation('subtitle')}
      />
      <div className="container work-body">
        <div className="experience-section">
          {jobInfo.map((item) => (
            <React.Fragment key={item.id}>
              <WorkCardItem workItem={item} />
            </React.Fragment>
          ))}
        </div>
        <div className="skills-section">
          <div className="title-content skills-section-title">
            <h2>{workTranslation('skills_title')}</h2>
          </div>
          <div className="skills-section-items">
            {skills.map((item) => (
              <SkillItem name={item.name} value={item.value} key={item.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
