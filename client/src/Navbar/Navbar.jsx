// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/compiler" className="nav-link">Code Compiler</Link>
            <Link to="/snippets" className="nav-link">Snippet Library</Link>
        </nav>
    );
};

export default Navbar;
