import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/login/LoginForm.tsx";
import './css/createEvent.css';
import { useUser } from "../contexts/UserContext.tsx";
import Loader from "../components/loader/Loader.tsx";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { IoChevronBack } from "react-icons/io5";

const Login: React.FC = () => {
    const currentUser = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, [currentUser]);

    const logOut = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={"page"}>
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}><IoChevronBack /></button>
                <img className="logo-return" src={logo} alt="Logo de l'entreprise"/>
            </div>
            <div className={"form-container login"}>
                <div className={"form-title"}>
                    <h1>Login</h1>
                </div>
                {!currentUser && (
                    <LoginForm />
                )}
                {!currentUser && (
                    <p>Don't have an account? <a href="/register">Register</a></p>
                )}
                {currentUser && (
                    <p>Logged in as {currentUser.email}, <a href="/home">Go to home</a></p>
                )}
                {currentUser && (
                    <button onClick={() => logOut()}>Log Out</button>
                )}
            </div>
        </div>
    );
}

export default Login;
