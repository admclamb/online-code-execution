// Importing necessary libraries and styles
import React from 'react'; // Importing React to use its features for building UI components
import './ThemeSwitcher.css'; // Importing the CSS file to style the ThemeSwitcher component

// The ThemeSwitcher component
const ThemeSwitcher = ({ setTheme }) => {
  
  // Function to handle theme changes
  const handleThemeChange = (e) => {
    const theme = e.target.value; // Get the selected theme from the dropdown
    document.body.className = theme; // Apply the selected theme as a class to the body element
    setTheme(theme); // Update the state in the parent component with the selected theme
  };

  return (
    // JSX structure of the ThemeSwitcher component
    <div className="theme-switcher">
      <label htmlFor="theme-select">Theme:</label> {/* Label for the theme dropdown */}
      
      {/* Dropdown to select the theme */}
      <select id="theme-select" onChange={handleThemeChange}>
        <option value="">Day</option> {/* Default option for the day theme */}
        <option value="night">Night</option> {/* Option for the night theme */}
        <option value="colorblind">Colorblind</option> {/* Option for the colorblind theme */}
      </select>
    </div>
  );
};

// Exporting the ThemeSwitcher component as the default export
export default ThemeSwitcher;
