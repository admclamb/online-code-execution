import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { javaLanguage } from "@codemirror/lang-java";
import { pythonLanguage } from "@codemirror/lang-python";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import "./CodeCompiler.css";

// Array of supported programming languages with their CodeMirror extensions
const languages = [
  { value: "python", label: "Python", extension: pythonLanguage },
  { value: "c", label: "C", extension: cppLanguage },
  { value: "cpp", label: "C++", extension: cppLanguage },
  { value: "java", label: "Java", extension: javaLanguage },
  { value: "javascript", label: "JavaScript", extension: javascriptLanguage },
];

// Create an Axios instance to handle API requests
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL ?? "", // Use baseURL from environment variables or default to an empty string
  timeout: 30_000, // Set a timeout of 30 seconds for API requests
});

const CodeCompiler = ({ userCode, userLang }) => {
  // State variables for local code, language, output, loading state, and timer
  const [localCode, setLocalCode] = useState(userCode); // Holds the code entered by the user
  const [localLang, setLocalLang] = useState(userLang); // Holds the selected programming language
  const [userOutput, setUserOutput] = useState(""); // Holds the output returned from the API
  const [loading, setLoading] = useState(false); // Tracks whether the code is being compiled
  const [milliseconds, setMilliseconds] = useState(0); // Tracks the time taken for code execution
  const timerRef = useRef(null); // Reference to the timer, used for starting and stopping intervals

  // Effect hook to update local code and language when they change
  useEffect(() => {
    setLocalCode(userCode);
    setLocalLang(userLang);
  }, [userCode, userLang]); // Runs whenever userCode or userLang changes

  // Effect hook to manage the timer when the code is being compiled
  useEffect(() => {
    if (loading) {
      // Start the timer if code is being compiled
      timerRef.current = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
      }, 10); // Increment the timer every 10 milliseconds
    } else {
      // Clear the timer if the code compilation is finished
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Cleanup the interval when the component unmounts or loading state changes
    return () => clearInterval(timerRef.current);
  }, [loading]);

  // Function to handle code compilation
  const compile = () => {
    setLoading(true); // Set loading to true to indicate that compilation is in progress
    setMilliseconds(0); // Reset the timer
    console.log("Sending data to backend:", {
      code: localCode,
      language: localLang,
      input: "",
    });
    // Send a POST request to the backend with the code and selected language
    axiosApi
      .post("/compile", {
        code: localCode,
        language: localLang,
        input: "",
      })
      .then((res) => {
        console.log("Received response from backend:", res.data); // Log the response for debugging
        setUserOutput(res.data.output); // Update the output with the result from the backend
        setLoading(false); // Set loading to false after the code is compiled
      })
      .catch((error) => {
        console.error("Error during code compilation:", error.message); // Log any errors that occur
        setLoading(false); // Set loading to false in case of an error
      });
  };

  // Function to get the CodeMirror extension for the selected language
  const getLanguageExtension = (language) => {
    const langObj = languages.find((lang) => lang.value === language); // Find the corresponding language object
    return langObj ? langObj.extension : pythonLanguage; // Return the extension or default to Python
  };

  // JSX to render the component
  return (
    <div className="App">
      <div className="app-container">
        {/* Language selection dropdown */}
        <div className="form-group">
          <label>Language:</label>
          <select
            onChange={(e) => setLocalLang(e.target.value)} // Update the selected language when changed
            value={localLang} // Set the value of the dropdown to the current language
          >
            {/* Map through the languages array to create options */}
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Code editor using CodeMirror */}
        <div className="form-group">
          <label>Code:</label>
          <CodeMirror
            value={localCode} // Set the initial value to the local code
            height="400px" // Set the height of the editor
            extensions={[getLanguageExtension(localLang)]} // Use the appropriate language extension for syntax highlighting
            theme={monokai} // Set the theme to Monokai
            onChange={(value) => setLocalCode(value)} // Update the local code when the editor content changes
          />
        </div>

        {/* Container for the Run button and timer */}
        <div className="button-timer-container">
          <button className="run-button" onClick={compile} disabled={loading}>
            {loading ? "Running..." : "Run"} {/* Change the button text based on loading state */}
          </button>
        </div>

        {/* Output section */}
        <div className="output">
          <label>Output:</label>
          <textarea
            rows="10" // Set the number of rows in the textarea
            value={userOutput} // Set the value to the compiled output
            readOnly // Make the textarea read-only
            placeholder="Output will be displayed here" // Placeholder text when there is no output
          />
          
          {/* Timer display */}
          <div className="timer">
            <span>Run Time: {(milliseconds / 1000).toFixed(2)}s</span> {/* Display the elapsed time */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;
