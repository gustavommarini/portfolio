import React from 'react';
import ProfileImage from '../../assets/photos/AA013a.jpg';
import './about.scss';
import { Button, EducationSection, TitlePage } from '@/components';
import { educationInfo } from '@/services/data_content';

const About = () => {
  const downloadCVAction = () => {};

  return (
    <section id="about" className="container">
      <TitlePage
        title="about <span>me</span>"
        subtitle="I design and code beautiful things, and I love what I do."
      />
      <div className="container infos">
        <div className="basic-info-row simple-row">
          <div className="basic-image simple-first-column">
            <div className="image-container">
              <img src={ProfileImage} alt="" />
            </div>
          </div>
          <div className="basic-info simple-second-column">
            <h3>
              I am a Web/App Developer, specialized in JavaScript, React & React
              Native
            </h3>
            <p>
              Passionate developer with over 10 years of experience,
              specializing in modern Web and Mobile development. I focus on
              JavaScript, TypeScript, React, and React Native, with a strong
              emphasis on clean architecture and performance. I’ve contributed
              to complex projects implementing scalable solutions using GraphQL,
              Redux, Styled Components, Nx, Lerna, feature flags with Split,
              testing with Jest and Detox, and worked with tools like Amplitude,
              Retool, and Notion for tracking and documentation. Constantly
              learning cutting edge technologies and tools. I'm a self-taught
              team player, proactive, versatile and a very positive attitude,
              always embracing agile methodologies and committed to delivering
              high-quality code.
            </p>
            <div className="detailed-data">
              <div className="detailed-column">
                <ul>
                  <li>
                    <span>Birthday:</span> 11 November
                  </li>
                  <li>
                    <span>Residence:</span> Salerno, Italy
                  </li>
                  <li>
                    <span>Languages:</span> Spanish, English and Italian
                  </li>
                </ul>
              </div>
              <div className="detailed-column">
                <ul>
                  <li>
                    <span>Experience:</span> 14+
                  </li>
                  <li>
                    <span>Nationality:</span> ARG/ITA
                  </li>
                  <li>
                    <span>Freelance:</span> Available
                  </li>
                </ul>
              </div>
            </div>
            <Button onClick={downloadCVAction}>Download CV</Button>
          </div>
        </div>
      </div>
      <EducationSection title="Education" eduArray={educationInfo.education} />
    </section>
  );
};

export default About;
