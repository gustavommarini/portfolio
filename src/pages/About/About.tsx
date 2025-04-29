import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, EducationSection, TitlePage } from '@/components';
import { educationInfo } from '@/services/data_content';
import ProfileImage from '../../assets/photos/AA013a.jpg';
import gmmCV from '../../assets/Gustavo M. Marini - Resume.pdf';
import './about.scss';

const About: FC = () => {
  const downloadCVAction = () => {
    window.open(gmmCV, '_blank');
  };
  const { t: aboutTranslation } = useTranslation(['about']);

  return (
    <section id="about" className="about container-xxl">
      <TitlePage
        title={aboutTranslation('title')}
        subtitle={aboutTranslation('subtitle')}
      />
      <div className="basic-info-section">
        <div className="basic-info-image portfolio-row">
          <div className="profile-image portfolio-col-5">
            <div className="image-container">
              <img src={ProfileImage} alt="" />
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
                </ul>
              </div>
            </div>
            <Button onClick={downloadCVAction}>
              {aboutTranslation('btn_dwn_cv')}
            </Button>
          </div>
        </div>
      </div>
      <EducationSection
        title={aboutTranslation('edu_section_title')}
        eduArray={educationInfo.education}
      />
    </section>
  );
};

export default About;
