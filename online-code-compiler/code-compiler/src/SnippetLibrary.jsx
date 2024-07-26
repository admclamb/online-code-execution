// SnippetLibrary.jsx
import React, { useState } from 'react';
import snippets from './snippets.json';

const SnippetLibrary = ({ setUserCode, setUserLang }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleSnippetClick = (snippet) => {
        setUserCode(snippet.code);
        setUserLang({ value: snippet.language, label: snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1) });
    };

    return (
        <div className="snippet-library">
            <h2>Code Snippet Library</h2>
            <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
                <option value="">Select Language</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
            </select>
            <ul>
                {snippets.filter(snippet => snippet.language === selectedLanguage).map((snippet) => (
                    <li key={snippet.id} onClick={() => handleSnippetClick(snippet)}>
                        <strong>{snippet.title}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SnippetLibrary;
