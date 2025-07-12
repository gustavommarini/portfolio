import React, { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { trackButtonClick } from '@/services/analytics';
import './navbar.scss';

export const Navbar: FC = () => {
  const { t: navTranslation } = useTranslation(['navbar']);
  const checkboxRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const location = useLocation();

  useEffect(() => {
    //Every time the page change I need to close the menu
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
    //Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location]);

  const trackDataClick = () =>
    trackButtonClick(
      'toggle_menu',
      !checkboxRef.current?.checked ? 'open' : 'close'
    );

  return (
    <>
      <input type="checkbox" id="main-navmenu" ref={checkboxRef} />
      <label
        className="menu-btn"
        data-testid="menu-btn"
        htmlFor="main-navmenu"
        onClick={trackDataClick}
      >
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper-navmenu">
        <ul id="nav">
          <li className="nav-link">
            <NavLink
              to="/"
              className={({ isActive }) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('home')}
            >
              {navTranslation('home')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('about')}
            >
              {navTranslation('about')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/work-experience"
              className={({ isActive }) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('experience')}
            >
              {navTranslation('experience')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('contact')}
            >
              {navTranslation('contact')}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
