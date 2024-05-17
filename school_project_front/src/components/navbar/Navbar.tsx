import React, {useState} from "react";
import "./css/navbar.css";
import logo from "../../assets/images/logobleu.png";
import {useUser} from "../../contexts/UserContext";

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const currentUser = useUser();

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
        window.location.href = "/login";
    };

    const goToProfile = () => {
        window.location.href = "/profile";
    }

    const goToHome = () => {
        window.location.href = "/home";
    }

    const goToMyEvents = () => {
        window.location.href = "/my-events";
    }

    const goToMyParticipation = () => {
        window.location.href = "/my-participation";
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={goToHome}>
                <img className="logo" src={logo} alt="Logo de l'entreprise"/>
            </div>
            <div className={`navbar-items ${showNav ? "active" : ""}`}>
                <a href="">Home</a>
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
                    <button onClick={goToHome}>Home</button>
                )}
                {currentUser && (
                    <button onClick={goToProfile}>My Profile</button>
                )}
                {currentUser && (
                    <button onClick={goToMyEvents}>My Events</button>
                )}
                {currentUser && (
                    <button onClick={goToMyParticipation}>My Participation</button>
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
                <button className="close-menu-btn" onClick={closeOverlay}>Fermer</button>
            </div>
        </nav>
    );
};

export default Navbar;
