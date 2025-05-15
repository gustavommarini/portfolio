import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ButtonAnimated } from '@/components';
import { ButtonType } from '@/components/Button/Button.types';
import { useTypewriter } from '@/hooks/useTypewriter';
import HomeImg from '../../assets/photos/home.jpg';
import HomeImgLight from '../../assets/photos/home-light.jpg';
import './home.scss';
import { ThemeContext } from '@/theme';

const Home: FC = () => {
  const { t: homeTranslation } = useTranslation(['home']);
  const { theme } = useContext(ThemeContext);
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
    <section
      id="home"
      data-testid="home"
      className="home"
      style={{
        backgroundImage: `url(${theme === 'light-theme' ? HomeImgLight : HomeImg})`,
      }}
    >
      <div className="overlay"></div>
      <div className="main-text-container">
        <div className="main-text">
          <h4>{homeTranslation('title')}</h4>
          <h1>
            {homeTranslation('i_am')}{' '}
            <span className="typewriter-cursor-end">{currentText}</span>
          </h1>
          <p>{homeTranslation('description')}</p>
          <div className="action_btns">
            <ButtonAnimated
              type={ButtonType.outlined}
              onClick={goToProfileAction}
            >
              {homeTranslation('main_btn')}
            </ButtonAnimated>
            <ButtonAnimated onClick={goToContactAction}>
              {homeTranslation('secundary_btn')}
            </ButtonAnimated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
