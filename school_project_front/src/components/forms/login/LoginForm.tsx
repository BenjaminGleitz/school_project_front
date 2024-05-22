import React, { useState } from "react";
import AuthService from "../../../services/authentication/AuthService.tsx";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const authService = AuthService.getInstance();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire
        try {
            await authService.login(username, password);
            window.location.href = "/home";
        } catch (error) {
            setError("Identifiant ou mot de passe incorrect.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className={"form-input"}>
                <input
                    placeholder={" Email "}
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={"form-input"}>
                <input
                    placeholder={" Password "}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div>{error}</div>}
            <button className={"btn-login"} type="submit">Log In</button>
        </form>
    );
};

export default LoginForm;
