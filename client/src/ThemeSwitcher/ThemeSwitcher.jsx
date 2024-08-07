import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ setTheme }) => {
  const handleThemeChange = (e) => {
    const theme = e.target.value;
    document.body.className = theme; // Apply the theme class to the body
    setTheme(theme);
  };

  return (
    <div className="theme-switcher">
      <label htmlFor="theme-select">Theme:</label>
      <select id="theme-select" onChange={handleThemeChange}>
        <option value="">Day</option>
        <option value="night">Night</option>
        <option value="colorblind">Colorblind</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
