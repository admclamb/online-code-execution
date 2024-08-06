import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ setTheme }) => {
    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <div className="theme-switcher">
            <label htmlFor="theme">Select Theme:</label>
            <select id="theme" onChange={handleThemeChange}>
                <option value="day">Day Mode</option>
                <option value="night">Night Mode</option>
                <option value="colorblind">Colorblind Mode</option>
            </select>
        </div>
    );
};

export default ThemeSwitcher;
