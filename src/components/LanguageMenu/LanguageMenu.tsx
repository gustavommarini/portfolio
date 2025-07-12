import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AvailableLanguages } from '@/language/i18n.types';
import { trackButtonClick } from '@/services/analytics';
import './language-menu.scss';

export const LanguageMenu: FC = () => {
  const { i18n } = useTranslation(['home']);
  const checkboxRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const langSpanish = i18n.language === AvailableLanguages.es;
  const langEnglish = i18n.language === AvailableLanguages.en;
  const langItalian = i18n.language === AvailableLanguages.it;

  const changeLanguage = (lang: AvailableLanguages) => {
    i18n.changeLanguage(lang);
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
    trackButtonClick('change_language', lang);
  };

  return (
    <div className="language-selector">
      <input type="checkbox" id="language-action-btn" ref={checkboxRef} />
      <label
        data-testid="language-btn"
        className="language-btn"
        htmlFor="language-action-btn"
      >
        <i className="fa-solid fa-language"></i>
      </label>
      <div className="language-flags">
        <div
          className={`lang-link ${langSpanish && 'selected'}`}
          onClick={() => changeLanguage(AvailableLanguages.es)}
        >
          🇪🇸
        </div>
        <div
          className={`lang-link ${langEnglish && 'selected'}`}
          onClick={() => changeLanguage(AvailableLanguages.en)}
        >
          🇬🇧
        </div>
        <div
          className={`lang-link ${langItalian && 'selected'}`}
          onClick={() => changeLanguage(AvailableLanguages.it)}
        >
          🇮🇹
        </div>
      </div>
    </div>
  );
};
