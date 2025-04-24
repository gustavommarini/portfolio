import React, { FC, useEffect, useRef } from 'react';
import './navbar.scss';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: FC = () => {
  const { t: navTranslation } = useTranslation(['home']);
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

  return (
    <>
      <input type="checkbox" id="active-navmenu" ref={checkboxRef} />
      <label className="menu-btn" htmlFor="active-navmenu">
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper-navmenu">
        <ul id="nav">
          <li className="nav-link">
            <NavLink
              to="/"
              className={(isActive) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('navbar-items.home')}
            >
              {navTranslation('navbar-items.home')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/about"
              className={(isActive) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('navbar-items.about')}
            >
              {navTranslation('navbar-items.about')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/work-experience"
              className={(isActive) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('navbar-items.experience')}
            >
              {navTranslation('navbar-items.experience')}
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/contact"
              className={(isActive) =>
                'nav-element' + (isActive ? ' selected' : '')
              }
              data-name={navTranslation('navbar-items.contact')}
            >
              {navTranslation('navbar-items.contact')}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
