import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@/theme';
import { ErrorMessages } from '@/hooks/hooks.types';
import Wayna from '../../assets/wayna/wayna01.jpg';
import Wayna2Light from '../../assets/wayna/wayna03.jpg';
import { ErrorProps } from './error.types';
import './error.scss';

const Error: FC<ErrorProps> = ({
  errorCode = 404,
  errorMsg = ErrorMessages.NOT_FOUND,
}) => {
  const { theme } = useContext(ThemeContext);
  const { t: homeTranslation } = useTranslation(['home']);

  return (
    <section id="error-page" data-testid="error-page" className="error-page">
      <div className="main-title-text">
        <h1>{errorCode}</h1>
        <div className="title-home-style-image wide-img">
          <div
            className={`image-container${theme === 'dark-theme' ? ' bnw-bg' : ''}`}
          >
            {theme === 'light-theme' ? (
              <img src={Wayna2Light} alt="profile-image-light" />
            ) : (
              <img src={Wayna} alt="profile-image" />
            )}
          </div>
        </div>
        <h2>
          Erro<span>r</span>
        </h2>
      </div>
      <div className="title-home-style-custom-description">
        <h3>{homeTranslation(`${errorMsg}_title`)}</h3>
        <p className="custom-text-error">{homeTranslation(errorMsg)}</p>
      </div>
    </section>
  );
};

export default Error;
