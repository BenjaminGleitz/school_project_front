import React, { useState } from "react";
import "./navbar.css";

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
        setShowOverlay(!showOverlay);
    };

    const logOut = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    const goToProfile = () => {
        window.location.href = "/profile";
    }

    const goToHome = () => {
        window.location.href = "/";
    }

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
            {/* Overlay */}
            {showOverlay && (
                <div className="overlay">
                    <button onClick={() => goToHome()}>Home</button>
                    <button onClick={() => goToProfile()}>My Profile</button>
                    <button onClick={() => logOut()}>Log Out</button>
                    <button className="close-menu-btn" onClick={() => setShowOverlay(false)}>Fermer</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
