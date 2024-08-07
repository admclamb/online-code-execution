import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import CodeCompiler from './CodeCompiler/CodeCompiler';
import SnippetLibraryPage from './SnippetLibrary/SnippetLibraryPage';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import './App.css';

const App = () => {
    const [theme, setTheme] = useState('day');
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState('python');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="main-content">
                    <ThemeSwitcher setTheme={setTheme} />
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route 
                                path="/compiler" 
                                element={<CodeCompiler userCode={userCode} userLang={userLang} />} 
                            />
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
