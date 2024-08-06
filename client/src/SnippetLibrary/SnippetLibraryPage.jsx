// SnippetLibraryPage.jsx
import React from 'react';
import SnippetLibrary from './SnippetLibrary';

const SnippetLibraryPage = ({ setUserCode, setUserLang }) => {
    return (
        <div className="App">
            <div className="app-container">
                <h1>Code Snippet Library</h1>
                <SnippetLibrary setUserCode={setUserCode} setUserLang={setUserLang} />
            </div>
        </div>
    );
};

export default SnippetLibraryPage;
