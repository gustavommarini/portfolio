import React, { useRef } from 'react';
import './languagemenu.scss';
import { useTranslation } from 'react-i18next';
import { AvailableLanguages } from '@/language/i18n.types';

export const LanguageMenu = () => {
  const { i18n } = useTranslation(['home']);
  const checkboxRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const langSpanish = i18n.language === AvailableLanguages.es;
  const langEnglish = i18n.language === AvailableLanguages.en;

  const changeLanguage = (lang: AvailableLanguages) => {
    i18n.changeLanguage(lang);
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <div className="language-selector">
      <input type="checkbox" id="language-menu" ref={checkboxRef} />
      <label className="language-btn" htmlFor="language-menu">
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
          className="lang-link"
          onClick={() => changeLanguage(AvailableLanguages.en)}
        >
          🇮🇹
        </div>
      </div>
    </div>
  );
};
