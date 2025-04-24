import { useTypewriter } from '@/hooks/useTypewriter';
import { useTranslation } from 'react-i18next';
import './home.scss';
import { Button } from '@/components';
import { ButtonType } from '@/components/Button/Button.types';

const Home = () => {
  const { t: introTranslation } = useTranslation(['intro']);
  const currentText = useTypewriter([
    introTranslation('animated.first'),
    introTranslation('animated.second'),
    introTranslation('animated.third'),
    introTranslation('animated.fourth'),
  ]);

  const goToProfileAction = () => {};
  const goToContactAction = () => {};

  return (
    <section id="home" className="home">
      <div className="overlay"></div>
      <div className="main-text-container">
        <div className="main-text">
          <h3>{introTranslation('title')}</h3>
          <h1>
            I'm <span className="typewriter-cursor-end">{currentText}</span>
          </h1>
          <p>{introTranslation('description')}</p>
          <div className="action_btns">
            <Button type={ButtonType.outlined} onClick={goToProfileAction}>
              My Portfolio
            </Button>
            <Button onClick={goToContactAction}>Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
