import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <h1>Welcome to our quiz</h1>
            <ul>
                <li><Link to = "/login">Login</Link></li>
                <li><Link to = "/quiz">Quiz</Link></li>
                <li><Link to = "/register">Register</Link></li>
                <li><Link to = "/leaderboard">Leaderboard</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;