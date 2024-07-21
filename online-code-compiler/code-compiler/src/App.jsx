import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Axios from 'axios';
import Select from 'react-select';
import './App.css';
import spinner from './spinner.svg';  // Ensure this file exists in the src folder

const languages = [
    { value: 'python', label: 'Python' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' }
];

const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' }
];

const App = () => {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState(languages[0]);
    const [userTheme, setUserTheme] = useState(themes[0]);
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState('');
    const [userOutput, setUserOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const options = { fontSize };

    const compile = () => {
        setLoading(true);
        Axios.post('http://localhost:8000/compile', {
            code: userCode,
            language: userLang.value,
            input: userInput
        }).then((res) => {
            setUserOutput(res.data.output);
            setLoading(false);
        }).catch((error) => {
            console.error('Error during code compilation:', error.message);
            setLoading(false);
        });
    };

    const clearOutput = () => setUserOutput('');

    return (
        <div className="App">
            <div className="navbar">
                <h1>Online Code Compiler</h1>
                <Select
                    options={languages}
                    value={userLang}
                    onChange={setUserLang}
                    placeholder={userLang.label}
                />
                <Select
                    options={themes}
                    value={userTheme}
                    onChange={setUserTheme}
                    placeholder={userTheme.label}
                />
                <label>Font Size</label>
                <input
                    type="range"
                    min="18"
                    max="30"
                    value={fontSize}
                    step="2"
                    onChange={(e) => setFontSize(e.target.value)}
                />
            </div>
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme.value}
                        language={userLang.value}
                        defaultLanguage="python"
                        defaultValue="# Enter your code here"
                        onChange={(value) => setUserCode(value)}
                    />
                    <button className="run-btn" onClick={compile}>Run</button>
                </div>
                <div className="right-container">
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                            <img src={spinner} alt="Loading..." />
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={clearOutput} className="clear-btn">Clear</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
