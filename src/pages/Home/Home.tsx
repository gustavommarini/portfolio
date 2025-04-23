import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import reactLogo from '@/assets/technologies/react.svg';
import reactRouterLogo from '@/assets/technologies/react_router.svg';
import sassLogo from '@/assets/technologies/sass.svg';
import i18nLogo from '@/assets/technologies/i18n.png';
import eslintLogo from '@/assets/technologies/eslint.png';
import prettierLogo from '@/assets/technologies/prettier.png';
import jestLogo from '@/assets/technologies/jest.svg';
import rtlLogo from '@/assets/technologies/rtl.png';
import viteLogo from '/vite.svg';

const Home = () => {
  const [count, setCount] = useState(0);
  const { t: appTranslation, i18n } = useTranslation(['home', 'single']);

  return (
    <section className="example-section">
      <div className="example-page">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://reactrouter.com/" target="_blank">
          <img
            src={reactRouterLogo}
            className="logo react router"
            alt="React router logo"
          />
        </a>
        <a href="https://sass-lang.com/" target="_blank">
          <img src={sassLogo} className="logo sass" alt="Sass logo" />
        </a>
        <a href="https://www.i18next.com/" target="_blank">
          <img src={i18nLogo} className="logo i18next" alt="i18next logo" />
        </a>
        <a href="https://eslint.org/" target="_blank">
          <img src={eslintLogo} className="logo eslint" alt="eslint logo" />
        </a>
        <a href="https://prettier.io/" target="_blank">
          <img
            src={prettierLogo}
            className="logo prettier"
            alt="prettier logo"
          />
        </a>
        <a href="https://typicode.github.io/husky/" target="_blank">
          <div className="text-logo">🐶</div>
        </a>
        <a href="http://jestjs.io/" target="_blank">
          <img src={jestLogo} className="logo jest" alt="jest logo" />
        </a>
        <a href="https://testing-library.com/" target="_blank">
          <img src={rtlLogo} className="logo rtl" alt="rtl logo" />
        </a>
      </div>
      <h1>
        Vite + React + React Router + Sass + i18next + ESLint + Prettier + Husky
        + Jest + RTL
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">{appTranslation('welcome')}</p>
      <p>
        <code>
          {appTranslation('current_language', { ns: 'single' })}:{' '}
          {i18n.language}
        </code>
      </p>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <button onClick={() => i18n.changeLanguage('es')}>Español</button>
    </section>
  );
};

export default Home;
