import React, { FC } from 'react';
import './navbar.scss';

const Navbar: FC = () => {
  return (
    <>
      <input type="checkbox" id="active-navmenu" />
      <label className="menu-btn" htmlFor="active-navmenu">
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper-navmenu">
        <ul id="nav">
          <li className="nav-link">
            <a href="#" data-name="home">
              home
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name="about">
              about
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name="experience">
              experience
            </a>
          </li>
          <li className="nav-link">
            <a href="#" data-name="contact">
              contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
