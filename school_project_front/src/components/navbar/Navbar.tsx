import React, { useState } from "react";
import "./navbar.css";

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">
                <h1>TooGether</h1>
            </div>
            <div className={`navbar-items ${showNav ? "active" : ""}`}>
                <a href="">Home</a>
                <a href="#top">&#8593;</a>
            </div>
            <div className={`navbar-toggle ${showNav ? "active" : ""}`} onClick={toggleNav}>
                <span className="navbar-toggle-btn">&#9776;</span>
            </div>
        </nav>
    );
};

export default Navbar;
