import React, { useState } from "react";
import AuthService from "../../../services/authentication/AuthService.tsx";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const authService = AuthService.getInstance();

    const handleLogin = async () => {
        try {
            await authService.login(username, password);
            window.location.href = "/";
        } catch (error) {
            setError("Identifiant ou mot de passe incorrect.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <div>
                <label htmlFor="username">Email :</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password :</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div>{error}</div>}
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LoginForm;
