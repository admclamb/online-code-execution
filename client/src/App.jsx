// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import CodeCompiler from './CodeCompiler/CodeCompiler';
import SnippetLibraryPage from './SnippetLibrary/SnippetLibraryPage';
import './App.css';

const App = () => {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState('python');

    return (
        <Router>
            <Navbar />
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
        </Router>
    );
};

export default App;
