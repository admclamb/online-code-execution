// Importing necessary libraries and components
import React from 'react'; // Importing React to use its features for building UI components
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom to create navigation links
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'; // Importing the ThemeSwitcher component to allow theme switching
import './Navbar.css'; // Importing the CSS file to style the Navbar component

// The Navbar component
const Navbar = ({ setTheme }) => {
  return (
    // Navbar container
    <nav className="navbar">
      
      {/* Left section of the navbar, contains the title */}
      <div className="navbar-left">
        <h1>Online Code Compiler</h1> {/* Title of the website */}
      </div>
      
      {/* Center section of the navbar, contains the theme switcher */}
      <div className="navbar-center">
        <ThemeSwitcher setTheme={setTheme} /> {/* ThemeSwitcher component to toggle between themes */}
      </div>
      
      {/* Right section of the navbar, contains the navigation links */}
      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/">Home</Link> {/* Link to the Home page */}
          <Link to="/compiler">Compiler</Link> {/* Link to the Code Compiler page */}
          <Link to="/snippets">Snippets</Link> {/* Link to the Snippet Library page */}
        </div>
      </div>
      
    </nav>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
