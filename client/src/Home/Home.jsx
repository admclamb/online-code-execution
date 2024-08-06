// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Online Code Compiler</h1>
            <p>Your one-stop solution for coding and learning with snippets.</p>
            <div className="home-links">
                <Link to="/compiler" className="home-link">Code Compiler</Link>
                <Link to="/snippets" className="home-link">Snippet Library</Link>
            </div>
        </div>
    );
};

export default Home;
