import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CookieConsentProps } from './cookie-consent.types';
import './cookie-consent.scss';
import { Button } from '../Button';

export const CookieConsent: FC<CookieConsentProps> = ({
  onAccept,
  onClose,
  show = false,
}) => {
  const { t } = useTranslation('cookie-consent');
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="cookie-consent"
      data-testid="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="cookie-consent__content">
        <div className="cookie-consent__header">
          <h3 id="cookie-consent-title" className="cookie-consent__title">
            {t('title')}
          </h3>
          <button
            className="cookie-consent__close"
            onClick={handleClose}
            aria-label={t('close')}
            data-testid="cookie-consent-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cookie-consent__body">
          <p
            id="cookie-consent-description"
            className="cookie-consent__description"
          >
            {t('description')}
          </p>

          <div className="cookie-consent__details">
            <div className="cookie-consent__detail">
              <h4>{t('tracking.title')}</h4>
              <p>{t('tracking.description')}</p>
            </div>

            <div className="cookie-consent__detail">
              <h4>{t('preferences.title')}</h4>
              <p>{t('preferences.description')}</p>
            </div>
          </div>
        </div>

        <div className="cookie-consent__actions">
          <Button
            onClick={handleAccept}
            fullSizeOnMobile
            data-testid="cookie-consent-accept"
          >
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};
