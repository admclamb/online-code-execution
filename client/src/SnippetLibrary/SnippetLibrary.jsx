// Importing necessary libraries and JSON files
import React, { useState } from 'react'; // Importing React and useState for managing state within the component
import { useNavigate } from 'react-router-dom'; // Importing useNavigate to programmatically navigate between routes
import pythonSnippets from './python.json'; // Importing Python code snippets from a JSON file
import javaSnippets from './java.json'; // Importing Java code snippets from a JSON file
import cSnippets from './c.json'; // Importing C code snippets from a JSON file
import cppSnippets from './cpp.json'; // Importing C++ code snippets from a JSON file
import javascriptSnippets from './javascript.json'; // Importing JavaScript code snippets from a JSON file

// SnippetLibrary component
const SnippetLibrary = ({ setUserCode, setUserLang }) => {
    // State variables for selected language, snippets, and selected snippet
    const [selectedLanguage, setSelectedLanguage] = useState(''); // Tracks the currently selected programming language
    const [snippets, setSnippets] = useState([]); // Holds the list of snippets for the selected language
    const [selectedSnippet, setSelectedSnippet] = useState(''); // Tracks the currently selected snippet
    const navigate = useNavigate(); // Hook for navigating programmatically to different routes

    // Function to load snippets based on the selected language
    const loadSnippets = (language) => {
        // Map of languages to their corresponding JSON snippet files
        const langMap = {
            python: pythonSnippets,
            java: javaSnippets,
            c: cSnippets,
            cpp: cppSnippets,
            javascript: javascriptSnippets
        };

        // Fetch the snippets for the selected language from the map
        const selectedSnippets = langMap[language] || [];
        console.log("Loaded snippets:", selectedSnippets);
        
        // If the selected snippets are an array, update the state; otherwise, log an error
        if (Array.isArray(selectedSnippets)) {
            setSnippets(selectedSnippets);
        } else {
            console.error('Snippets data is not an array:', selectedSnippets);
            setSnippets([]); // Reset to an empty array if the data is not valid
        }
    };

    // Function to handle the selection of a snippet
    const handleSnippetClick = (id) => {
        // Find the snippet by its ID
        const snippet = snippets.find(snip => snip.id === id);

        // If no snippet is found, return early
        if (!snippet) {
            return;
        }

        console.log("Snippet selected:", snippet);
        // Set the user's code and language to the selected snippet's code and language
        setUserCode(snippet.code);
        setUserLang(snippet.language);
        // Navigate to the code compiler page
        navigate('/compiler');
    };

    return (
        // JSX structure of the SnippetLibrary component
        <div className="snippet-library">
            <h2>Code Snippet Library</h2>
            
            {/* Dropdown for selecting a programming language */}
            <div className="form-group">
                <label>Select Language:</label>
                <select onChange={(e) => {
                    const lang = e.target.value;
                    setSelectedLanguage(lang); // Update the selected language
                    loadSnippets(lang); // Load snippets for the selected language
                    setSelectedSnippet(''); // Reset the selected snippet
                }} value={selectedLanguage}>
                    <option value="">Select Language</option> {/* Default option */}
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </div>
            
            {/* Dropdown for selecting a code snippet */}
            <div className="form-group">
                <label>Select Snippet:</label>
                <select onChange={(e) => {
                    const snippetId = parseInt(e.target.value, 10);
                    setSelectedSnippet(snippetId); // Update the selected snippet
                    handleSnippetClick(snippetId); // Load the selected snippet's code into the compiler
                }} value={selectedSnippet}>
                    <option value="">Select Snippet</option> {/* Default option */}
                    {/* Dynamically generate options based on the loaded snippets */}
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

// Exporting the SnippetLibrary component as the default export
export default SnippetLibrary;
