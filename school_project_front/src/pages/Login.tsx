import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/login/LoginForm.tsx";
import './css/createEvent.css';
import { useUser } from "../contexts/UserContext.tsx";
import Loader from "../components/loader/Loader.tsx";

const Login: React.FC = () => {
    const currentUser = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Délai de 100 millisecondes

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
        <div className={"form-container"}>
            <h1>Login</h1>
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
    );
}

export default Login;
