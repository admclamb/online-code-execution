// App.jsx
import React, { useState } from 'react';
import Axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { javaLanguage } from '@codemirror/lang-java';
import { pythonLanguage } from '@codemirror/lang-python';
import { cppLanguage } from '@codemirror/lang-cpp';
import { javascriptLanguage } from '@codemirror/lang-javascript'; // Import JavaScript language support
import SnippetLibrary from './snippets/SnippetLibrary';
import './App.css';

const languages = [
    { value: 'python', label: 'Python', extension: pythonLanguage },
    { value: 'c', label: 'C', extension: cppLanguage },
    { value: 'cpp', label: 'C++', extension: cppLanguage },
    { value: 'java', label: 'Java', extension: javaLanguage },
    { value: 'javascript', label: 'JavaScript', extension: javascriptLanguage } // Add JavaScript language support
];

const App = () => {
    const [userCode, setUserCode] = useState('');
    const [userLang, setUserLang] = useState('python');
    const [userOutput, setUserOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const compile = () => {
        setLoading(true);
        console.log("Sending data to backend:", {
            code: userCode,
            language: userLang,
            input: ''
        });
        Axios.post('http://localhost:8000/compile', {
            code: userCode,
            language: userLang,
            input: ''
        }).then((res) => {
            console.log("Received response from backend:", res.data);
            setUserOutput(res.data.output);
            setLoading(false);
        }).catch((error) => {
            console.error('Error during code compilation:', error.message);
            setLoading(false);
        });
    };

    const getLanguageExtension = (language) => {
        const langObj = languages.find((lang) => lang.value === language);
        return langObj ? langObj.extension : pythonLanguage;
    };

    return (
        <div className="App">
            <div className="app-container">
                <h1>Online Code Compiler</h1>
                <SnippetLibrary setUserCode={setUserCode} setUserLang={setUserLang} />
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
                    <CodeMirror 
                        value={userCode} 
                        height="400px"
                        extensions={[getLanguageExtension(userLang)]} 
                        theme={monokai} 
                        onChange={(value) => setUserCode(value)}
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
            </div>
        </div>
    );
};

export default App;
