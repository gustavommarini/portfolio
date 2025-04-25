import React from 'react';
import { TitlePage } from '@/components';
import './work.scss';
import { jobInfo, skills } from '@/services/data_content';
import { WorkCardItem } from './components';
import { useTranslation } from 'react-i18next';

const Work = () => {
  const { t: workTranslation } = useTranslation(['experience']);

  return (
    <section id="work" className="container">
      <TitlePage
        title={workTranslation('title')}
        subtitle={workTranslation('subtitle')}
      />
      <div className="container experience-and-skills">
        <div className="experience-description grid-row-experience">
          {jobInfo.map((item) => (
            <React.Fragment key={item.id}>
              <WorkCardItem workItem={item} />
            </React.Fragment>
          ))}
        </div>

        <div className="skill-row">
          <div className="title-content skill-title">
            <h2>{workTranslation('skills_title')}</h2>
          </div>
          <div className="grid-row">
            {skills.map((item) => (
              <React.Fragment key={item.name}>
                {/* <div className="skill-chart" key={item.name}>
                    <h5>{item.name}</h5>
                    <div className="chart-bar">
                      <span
                        className="item-progress"
                        data-percent={item.value}
                        style={{ width: `${item.value}%` }}
                      ></span>
                      <span
                        className="percent"
                        style={{
                          right: `calc(${100 - item.value}% - ${pixelSize})`,
                        }}
                      >
                        {item.value}%<b className="arrow"></b>
                      </span>
                    </div>
                  </div> */}
                <div className="skill-chart2">
                  <h5>{item.name}</h5>
                  <div
                    className="skill-bar"
                    style={{ width: `${item.value}%` }}
                  >
                    <span className="skill-count">
                      {item.value}%
                      <i className="fa-solid fa-caret-down item-down-arrow"></i>
                    </span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
