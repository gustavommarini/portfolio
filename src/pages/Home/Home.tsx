import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';
import { ButtonType } from '@/components/Button/button.types';
import { useTypewriter } from '@/hooks/useTypewriter';
import './home.scss';

const Home: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);
  const navigate = useNavigate();
  const currentText = useTypewriter([
    homeTranslation('animated.first'),
    homeTranslation('animated.second'),
    homeTranslation('animated.third'),
    homeTranslation('animated.fourth'),
  ]);

  const goToProfileAction = () => {
    navigate('/about');
  };
  const goToContactAction = () => {
    navigate('/contact');
  };

  return (
    <section id="home" className="home">
      <div className="overlay"></div>
      <div className="main-text-container">
        <div className="main-text">
          <h3>{homeTranslation('title')}</h3>
          <h1>
            {homeTranslation('i_am')}{' '}
            <span className="typewriter-cursor-end">{currentText}</span>
          </h1>
          <p>{homeTranslation('description')}</p>
          <div className="action_btns">
            <Button type={ButtonType.outlined} onClick={goToProfileAction}>
              {homeTranslation('main_btn')}
            </Button>
            <Button onClick={goToContactAction}>
              {homeTranslation('secundary_btn')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
