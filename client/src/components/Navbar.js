import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/register">Register</Link></li>
                <li><Link to = "/leaderboard">Leaderboard</Link></li>
                <li><Link to = "/">Log Out</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;