import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/navbar.css";
import logo from "../../assets/images/logo.png";
import { useUser } from "../../contexts/UserContext";
import { RxCross2 } from "react-icons/rx";

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const currentUser = useUser();
    const location = useLocation();

    const toggleNav = () => {
        const newState = !showNav;
        setShowNav(newState);
        setShowOverlay(newState);
    };

    const closeOverlay = () => {
        setShowNav(false);
        setShowOverlay(false);
    };

    const logOut = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    const goToProfile = () => {
        window.location.href = "/profile";
    };

    const goToHome = () => {
        window.location.href = "/home";
    };

    const goToMyEvents = () => {
        window.location.href = "/my-events";
    };

    const goToMyParticipation = () => {
        window.location.href = "/my-participation";
    };

    const isProfilePage = location.pathname === "/profile";

    return (
        <nav className={`navbar ${isProfilePage ? 'navbar-profile' : ''}`}>
            <div className="navbar-logo" onClick={goToHome}>
                <img className="logo" src={logo} alt="Logo de l'entreprise" />
            </div>
            <div className={`navbar-items ${showNav ? "active" : ""}`}>
                <a href="/home" className={location.pathname === "/home" ? "active" : ""}>Home</a>
                {currentUser && <a href="/profile" className={location.pathname === "/profile" ? "active" : ""}>My Profile</a>}
                {currentUser && <a href="/my-events" className={location.pathname === "/my-events" ? "active" : ""}>My Events</a>}
                {currentUser && <a href="/my-participation" className={location.pathname === "/my-participation" ? "active" : ""}>My Participation</a>}
                <a href="#top">&#8593;</a>
            </div>
            <div className={`navbar-toggle ${showNav ? "active" : ""}`} onClick={toggleNav}>
                <div className="navbar-toggle-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`overlay ${showOverlay ? "active" : ""}`}>
                {currentUser && (
                    <button onClick={goToHome} className={location.pathname === "/home" ? "active" : ""}>Home</button>
                )}
                {currentUser && (
                    <button onClick={goToProfile} className={location.pathname === "/profile" ? "active" : ""}>My Profile</button>
                )}
                {currentUser && (
                    <button onClick={goToMyEvents} className={location.pathname === "/my-events" ? "active" : ""}>My Events</button>
                )}
                {currentUser && (
                    <button onClick={goToMyParticipation} className={location.pathname === "/my-participation" ? "active" : ""}>My Participation</button>
                )}
                {currentUser && (
                    <button onClick={logOut}>Log Out</button>
                )}
                {!currentUser && (
                    <button onClick={() => window.location.href = "/login"}>Login</button>
                )}
                {!currentUser && (
                    <button onClick={() => window.location.href = "/register"}>Register</button>
                )}
                <button className="close-menu-btn" onClick={closeOverlay}><RxCross2 /></button>
            </div>
        </nav>
    );
};

export default Navbar;
