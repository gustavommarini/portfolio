import React, { FC } from 'react';
import './navbar.scss';
import { useTranslation } from 'react-i18next';

const Navbar: FC = () => {
  const { t: navTranslation } = useTranslation(['home']);
  return (
    <>
      <input type="checkbox" id="active-navmenu" />
      <label className="menu-btn" htmlFor="active-navmenu">
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper-navmenu">
        <ul id="nav">
          <li className="nav-link">
            <a href="#" data-name={navTranslation('navbar-items.home')}>
              {navTranslation('navbar-items.home')}
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name={navTranslation('navbar-items.about')}>
              {navTranslation('navbar-items.about')}
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name={navTranslation('navbar-items.experience')}>
              {navTranslation('navbar-items.experience')}
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name={navTranslation('navbar-items.contact')}>
              {navTranslation('navbar-items.contact')}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
