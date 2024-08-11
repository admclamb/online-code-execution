// Importing necessary libraries and components
import React from 'react'; // Importing React to use its features for building UI components
import SnippetLibrary from './SnippetLibrary'; // Importing the SnippetLibrary component to be used within this page

// The SnippetLibraryPage component
const SnippetLibraryPage = ({ setUserCode, setUserLang }) => {
    return (
        // Main container for the SnippetLibraryPage component
        <div className="App">
            <div className="app-container">
                {/* Heading for the snippet library page */}
                <h1>Code Snippet Library</h1>
                
                {/* Embedding the SnippetLibrary component */}
                {/* Passing down setUserCode and setUserLang props to allow the SnippetLibrary to update the code editor */}
                <SnippetLibrary setUserCode={setUserCode} setUserLang={setUserLang} />
            </div>
        </div>
    );
};

// Exporting the SnippetLibraryPage component as the default export
export default SnippetLibraryPage;
