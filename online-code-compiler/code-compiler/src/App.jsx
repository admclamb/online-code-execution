// App.jsx
import React, { useState } from 'react';
import Axios from 'axios';
import SnippetLibrary from './SnippetLibrary';
import './App.css';

const languages = [
    { value: 'python', label: 'Python' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' }
];

const App = () => {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState('python');
    const [userOutput, setUserOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const compile = () => {
        setLoading(true);
        Axios.post('http://localhost:8000/compile', {
            code: userCode,
            language: userLang,
        }).then((res) => {
            setUserOutput(res.data.output);
            setLoading(false);
        }).catch((error) => {
            console.error('Error during code compilation:', error.message);
            setLoading(false);
        });
    };

    return (
        <div className="App">
            <h1>Online Code Compiler</h1>
            <div className="form-group">
                <label>Language:</label>
                <select onChange={(e) => setUserLang(e.target.value)} value={userLang}>
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Code:</label>
                <textarea 
                    rows="20" 
                    value={userCode} 
                    onChange={(e) => setUserCode(e.target.value)} 
                    placeholder="Enter your code here"
                />
            </div>
            <button onClick={compile} disabled={loading}>
                {loading ? 'Running...' : 'Run'}
            </button>
            <div className="output">
                <label>Output:</label>
                <textarea 
                    rows="10" 
                    value={userOutput} 
                    readOnly 
                    placeholder="Output will be displayed here"
                />
            </div>
            <SnippetLibrary setUserCode={setUserCode} setUserLang={setUserLang} />
        </div>
    );
};

export default App;
