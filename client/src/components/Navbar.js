import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <h1>Welcome to our quiz</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Register</a></li>
                <li><a href="#">Leaderboard</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;