import React, { useState } from 'react';
import pythonSnippets from './python.json';
import javaSnippets from './java.json';
import cSnippets from './c.json';
import cppSnippets from './cpp.json';

const SnippetLibrary = ({ setUserCode, setUserLang }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [snippets, setSnippets] = useState([]);

    const loadSnippets = (language) => {
        const langMap = {
            python: pythonSnippets,
            java: javaSnippets,
            c: cSnippets,
            cpp: cppSnippets
        };

        const selectedSnippets = langMap[language];
        console.log("Loaded snippets:", selectedSnippets); // Debugging line
        if (Array.isArray(selectedSnippets)) {
            setSnippets(selectedSnippets);
        } else {
            console.error('Snippets data is not an array:', selectedSnippets);
            setSnippets([]); // Reset to an empty array if data is not valid
        }
    };

    const handleSnippetClick = (snippet) => {
        console.log("Snippet selected:", snippet);
        setUserCode(snippet.code);
        setUserLang(snippet.language);
    };

    return (
        <div className="snippet-library">
            <h2>Code Snippet Library</h2>
            <select onChange={(e) => {
                setSelectedLanguage(e.target.value);
                loadSnippets(e.target.value);
            }} value={selectedLanguage}>
                <option value="">Select Language</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
            </select>
            <ul>
                {snippets.map((snippet) => (
                    <li key={snippet.id} onClick={() => handleSnippetClick(snippet)}>
                        <strong>{snippet.title}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SnippetLibrary;
