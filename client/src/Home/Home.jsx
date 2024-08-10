// Importing necessary libraries and styles
import React from 'react'; // Importing React to use its features for building UI components
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom to create navigation links
import './Home.css'; // Importing the CSS file to style this component

// The Home component
const Home = () => {
    return (
        // Main container for the Home component
        <div className="home-container">
            {/* Heading of the Home page */}
            <h1>Welcome to the Online Code Compiler</h1>
            
            {/* Brief description or tagline */}
            <p>Your one-stop solution for coding and learning with snippets.</p>
            
            {/* Container holding the navigation links */}
            <div className="home-links">
                {/* Navigation link to the Code Compiler page */}
                <Link to="/compiler" className="home-link">Code Compiler</Link>
                
                {/* Navigation link to the Snippet Library page */}
                <Link to="/snippets" className="home-link">Snippet Library</Link>
            </div>
        </div>
    );
};

// Exporting the Home component as the default export
export default Home;
