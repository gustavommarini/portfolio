import { useContext } from 'react';
import { ThemeContext } from '@/theme';
import './theme-button.scss';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      data-testid="button-theme-toggle"
      className="theme-selector"
      onClick={() => toggleTheme()}
    >
      <i
        role="icon"
        className={`fa-solid ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}
      ></i>
    </div>
  );
};
