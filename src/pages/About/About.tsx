import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  EducationSection,
  TitlePage,
  WorkCardItem,
} from '@/components';
import { ThemeContext } from '@/theme';
import { contactConfig, educationInfo, jobInfo } from '@/services/data_content';
import ProfileImage from '../../assets/photos/about.jpg';
import ProfileImageLight from '../../assets/photos/about-light.jpg';
import './about.scss';
import './print.scss';

const About: FC = () => {
  const { t: aboutTranslation } = useTranslation(['about']);
  const { theme } = useContext(ThemeContext);
  const downloadCVAction = () => {
    window.print();
  };

  return (
    <section id="about" className="about container-xxl">
      <div className="no-print">
        <TitlePage
          title={aboutTranslation('title')}
          subtitle={aboutTranslation('subtitle')}
        />
      </div>
      <div className="print-only">
        <TitlePage
          title={'Gustavo <span>Marini</span>'}
          subtitle={aboutTranslation('subtitle')}
        />
      </div>
      <div className="basic-info-section">
        <div className="basic-info-image portfolio-row">
          <div className="profile-image portfolio-col-5">
            <div className="image-container">
              {theme === 'light-theme' ? (
                <img src={ProfileImageLight} alt="" />
              ) : (
                <img src={ProfileImage} alt="" />
              )}
            </div>
          </div>
          <div className="basic-info-text portfolio-col-7">
            <h3>{aboutTranslation('description.title')}</h3>
            <p>{aboutTranslation('description.subtitle')}</p>
            <div className="detailed-data">
              <div className="detailed-column">
                <ul>
                  <li>
                    <span>{aboutTranslation('details.birthday')}:</span>{' '}
                    {aboutTranslation('details.birthday_data')}
                  </li>
                  <li>
                    <span>{aboutTranslation('details.residence')}:</span>{' '}
                    {aboutTranslation('details.residence_data')}
                  </li>
                  <li>
                    <span>{aboutTranslation('details.languages')}:</span>{' '}
                    {aboutTranslation('details.languages_data')}
                  </li>
                  <li className="hidden-col">
                    <span>Email:</span>
                    {contactConfig.email}
                  </li>
                  <li className="hidden-col">
                    <span>Web:</span>
                    {contactConfig.site}
                  </li>
                </ul>
              </div>
              <div className="detailed-column">
                <ul>
                  <li>
                    <span>{aboutTranslation('details.experience')}:</span> 14+
                  </li>
                  <li>
                    <span>{aboutTranslation('details.nationality')}:</span>{' '}
                    ARG/ITA
                  </li>
                  <li>
                    <span>{aboutTranslation('details.freelance')}:</span>{' '}
                    {aboutTranslation('details.freelance_data')}
                  </li>
                  <li className="hidden-col">
                    <span>{aboutTranslation('details.phone')}:</span>
                    {contactConfig.phone_formated}
                  </li>
                </ul>
              </div>
            </div>
            <Button onClick={downloadCVAction}>
              {aboutTranslation('btn_dwn_cv')}
            </Button>
          </div>
        </div>
      </div>
      <div className="work-on-about">
        <div className="title-content about-work-section-title">
          <h2>{aboutTranslation('title-work')}</h2>
        </div>
        <div className="portfolio-row experience-section">
          {jobInfo.map((item) => (
            <React.Fragment key={item.id}>
              <WorkCardItem workItem={item} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="education-section">
        <EducationSection
          title={aboutTranslation('edu_section_title')}
          eduArray={educationInfo.education}
        />
      </div>
      <div className="courses-section">
        <EducationSection
          title={aboutTranslation('course_section_title')}
          eduArray={educationInfo.courses}
          useBookIcon
        />
      </div>
      <div className="languages-section">
        <EducationSection
          title={aboutTranslation('lang_section_title')}
          eduArray={educationInfo.languages}
        />
      </div>
    </section>
  );
};

export default About;
