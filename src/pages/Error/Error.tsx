import { FC, useContext } from 'react';
import { ThemeContext } from '@/theme';
import Error404 from '../../assets/photos/404.jpg';
import Error404Light from '../../assets/photos/404-light.jpg';
import { ErrorProps } from './error.types';
import './error.scss';
import { useTranslation } from 'react-i18next';

const Error: FC<ErrorProps> = ({ customErrorMsg = '' }) => {
  const { theme } = useContext(ThemeContext);
  const { t: homeTranslation } = useTranslation(['home']);

  return (
    <section id="error-page" className="error-page container-xxl">
      <h1>404</h1>
      <div className="error-image">
        <div className="image-container">
          {theme === 'light-theme' ? (
            <img src={Error404Light} alt="profile-image-light" />
          ) : (
            <img src={Error404} alt="profile-image" />
          )}
        </div>
      </div>
      <h2>
        Erro<span>r</span>
      </h2>
      {!customErrorMsg ? (
        <div className="error-description portfolio-row">
          <p className="error-en portfolio-col-4">
            An error has occurred somewhere on the site. Please try again later.
            If the error persists, please let me know at the following email.
            Thank you very much
          </p>
          <p className="error-it portfolio-col-4">
            Si è verificato un errore in qualche punto del sito. Riprovare più
            tardi. Se l'errore persiste, vi prego di farmelo sapere al seguente
            indirizzo e-mail. Grazie mille
          </p>
          <p className="error-es portfolio-col-4">
            Ha ocurrido un error en algun lugar del sitio. Por favor vuelve a
            intentar mas tarde. Si el error persiste, por favor, comunicamelo al
            siguiente email. Muchas gracias
          </p>
          <a href="mailto:gustavommarini@gmail.com">gustavommarini@gmail.com</a>
        </div>
      ) : (
        <div className="error-custom-description">
          <h3>{homeTranslation('generic_error_title')}</h3>
          <p className="custom-text-error">{homeTranslation(customErrorMsg)}</p>
        </div>
      )}
    </section>
  );
};

export default Error;
