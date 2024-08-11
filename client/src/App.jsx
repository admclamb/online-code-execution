import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import CodeCompiler from './CodeCompiler/CodeCompiler';
import SnippetLibraryPage from './SnippetLibrary/SnippetLibraryPage';
import './App.css'; // Import the main CSS for the app

const App = () => {
  // State to manage the current theme (day, night, colorblind)
  const [theme, setTheme] = useState('day');
  // State to store the code input by the user
  const [userCode, setUserCode] = useState('');
  // State to store the programming language selected by the user
  const [userLang, setUserLang] = useState('python');

  // useEffect to apply the theme class to the body whenever the theme changes
  useEffect(() => {
    document.body.className = theme; // Apply the selected theme to the body element
  }, [theme]); // Dependency array with theme, so useEffect runs when theme changes

  return (
    <Router>
      <div className="App">
        {/* Navbar component with setTheme prop to allow theme switching */}
        <Navbar setTheme={setTheme} />
        <div className="main-content">
          <div className="app-container">
            {/* Define the routes for the application */}
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Home />} />
              {/* Code compiler route, passing userCode and userLang as props */}
              <Route
                path="/compiler"
                element={<CodeCompiler userCode={userCode} userLang={userLang} />}
              />
              {/* Snippet library route, passing setUserCode and setUserLang as props */}
              <Route
                path="/snippets"
                element={<SnippetLibraryPage setUserCode={setUserCode} setUserLang={setUserLang} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
