// Importing the necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main App component and the global CSS stylesheet
import App from './App.jsx';
import './index.css';

// Rendering the React application inside the root DOM element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrapping the App component with React.StrictMode for highlighting potential problems */}
    <App />
  </React.StrictMode>,
);
