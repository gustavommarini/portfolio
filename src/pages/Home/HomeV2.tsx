import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@/theme';
import { useTypewriter } from '@/hooks/useTypewriter';
import Error404 from '../../assets/photos/404.jpg';
import Error404Light from '../../assets/photos/404-light.jpg';
import './home-v2.scss';

const HomeV2: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);
  const { theme } = useContext(ThemeContext);
  const currentText = useTypewriter([
    homeTranslation('animated.first'),
    homeTranslation('animated.second'),
    homeTranslation('animated.third'),
    homeTranslation('animated.fourth'),
  ]);

  return (
    <section id="home-page" data-testid="home" className="home-page">
      <div className="main-title-text">
        <h1>Gus</h1>
        <div className="title-home-style-image">
          <div className="image-container">
            {theme === 'light-theme' ? (
              <img src={Error404Light} alt="profile-image-light" />
            ) : (
              <img src={Error404} alt="profile-image" />
            )}
          </div>
        </div>
        <h2>
          Ma<span>r</span>ini
        </h2>
      </div>
      <div className="title-home-style-custom-description">
        <h3>
          {homeTranslation('i_am')}{' '}
          <span className="typewriter-cursor-end">{currentText}</span>
        </h3>
        <p>{homeTranslation('description')}</p>
      </div>
    </section>
  );
};

export default HomeV2;
