import { useContext } from 'react';
import { ThemeContext } from '@/theme';
import { trackButtonClick } from '@/services/analytics';
import './theme-button.scss';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const changeThemeAndTrack = () => {
    toggleTheme();
    trackButtonClick('change_theme', theme);
  };
  return (
    <div
      data-testid="button-theme-toggle"
      className="theme-selector"
      onClick={changeThemeAndTrack}
    >
      <i
        role="icon"
        className={`fa-solid ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}
      ></i>
    </div>
  );
};
