// src/SnippetLibrary/SnippetLibrary.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pythonSnippets from './python.json';
import javaSnippets from './java.json';
import cSnippets from './c.json';
import cppSnippets from './cpp.json';
import javascriptSnippets from './javascript.json';

const SnippetLibrary = ({ setUserCode, setUserLang }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [snippets, setSnippets] = useState([]);
    const [selectedSnippet, setSelectedSnippet] = useState('');
    const navigate = useNavigate();

    const loadSnippets = (language) => {
        const langMap = {
            python: pythonSnippets,
            java: javaSnippets,
            c: cSnippets,
            cpp: cppSnippets,
            javascript: javascriptSnippets
        };

        const selectedSnippets = langMap[language] || [];
        console.log("Loaded snippets:", selectedSnippets);
        if (Array.isArray(selectedSnippets)) {
            setSnippets(selectedSnippets);
        } else {
            console.error('Snippets data is not an array:', selectedSnippets);
            setSnippets([]);
        }
    };

    const handleSnippetClick = (id) => {
        const snippet = snippets.find(snip => snip.id === id);

        if (!snippet) {
            return;
        }

        console.log("Snippet selected:", snippet);
        setUserCode(snippet.code);
        setUserLang(snippet.language);
        navigate('/compiler');
    };

    return (
        <div className="snippet-library">
            <h2>Code Snippet Library</h2>
            <div className="form-group">
                <label>Select Language:</label>
                <select onChange={(e) => {
                    const lang = e.target.value;
                    setSelectedLanguage(lang);
                    loadSnippets(lang);
                    setSelectedSnippet('');
                }} value={selectedLanguage}>
                    <option value="">Select Language</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </div>
            <div className="form-group">
                <label>Select Snippet:</label>
                <select onChange={(e) => {
                    const snippetId = parseInt(e.target.value, 10);
                    setSelectedSnippet(snippetId);
                    handleSnippetClick(snippetId);
                }} value={selectedSnippet}>
                    <option value="">Select Snippet</option>
                    {snippets.map((snippet) => (
                        <option key={snippet.id} value={snippet.id}>
                            {snippet.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SnippetLibrary;
