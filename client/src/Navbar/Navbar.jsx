import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Navbar.css';

const Navbar = ({ setTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Online Code Compiler</h1>
      </div>
      <div className="navbar-center">
        <ThemeSwitcher setTheme={setTheme} />
      </div>
      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/compiler">Compiler</Link>
          <Link to="/snippets">Snippets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
