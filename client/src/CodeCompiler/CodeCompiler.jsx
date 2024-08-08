import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { javaLanguage } from "@codemirror/lang-java";
import { pythonLanguage } from "@codemirror/lang-python";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import "./CodeCompiler.css";

const languages = [
  { value: "python", label: "Python", extension: pythonLanguage },
  { value: "c", label: "C", extension: cppLanguage },
  { value: "cpp", label: "C++", extension: cppLanguage },
  { value: "java", label: "Java", extension: javaLanguage },
  { value: "javascript", label: "JavaScript", extension: javascriptLanguage },
];

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL ?? "",
  timeout: 30_000,
});

const CodeCompiler = ({ userCode, userLang }) => {
  const [localCode, setLocalCode] = useState(userCode);
  const [localLang, setLocalLang] = useState(userLang);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalCode(userCode);
    setLocalLang(userLang);
  }, [userCode, userLang]);

  useEffect(() => {
    if (loading) {
      timerRef.current = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [loading]);

  const compile = () => {
    setLoading(true);
    setMilliseconds(0); // Reset timer
    console.log("Sending data to backend:", {
      code: localCode,
      language: localLang,
      input: "",
    });
    axiosApi
      .post("/compile", {
        code: localCode,
        language: localLang,
        input: "",
      })
      .then((res) => {
        console.log("Received response from backend:", res.data);
        setUserOutput(res.data.output);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during code compilation:", error.message);
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
        <div className="form-group">
          <label>Language:</label>
          <select
            onChange={(e) => setLocalLang(e.target.value)}
            value={localLang}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Code:</label>
          <CodeMirror
            value={localCode}
            height="400px"
            extensions={[getLanguageExtension(localLang)]}
            theme={monokai}
            onChange={(value) => setLocalCode(value)}
          />
        </div>
        <div className="button-timer-container">
          <button className="run-button" onClick={compile} disabled={loading}>
            {loading ? "Running..." : "Run"}
          </button>
        </div>
        <div className="output">
          <label>Output:</label>
          <textarea
            rows="10"
            value={userOutput}
            readOnly
            placeholder="Output will be displayed here"
          />
          <div className="timer">
            <span>Run Time: {(milliseconds / 1000).toFixed(2)}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;
