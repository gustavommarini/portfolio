import React, { FC } from 'react';
import './navbar.scss';

const Navbar: FC = () => {
  return (
    <header id="nav-menu">
      <nav className="navbar">
        <div className="logo-menu"></div>
        <div className="details"></div>
      </nav>
    </header>
  );
};

export default Navbar;
