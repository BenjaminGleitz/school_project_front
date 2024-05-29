import React from "react";
import "./css/auth.css"
import logo from "../assets/images/logo.png";

const Register: React.FC = () => {

    const goToLogin = () => {
        window.location.href = "/login";
    }

    const goToRegister = () => {
        window.location.href = "/register";
    }

    return (
        <div className={"form-container"}>
            <div className={"container logo-container"}>
                <img className="logo" src={logo} alt="Logo de l'entreprise"/>
            </div>
            <div className={"container choice-container"}>
                <p>By clicking on Login, you agree to our Terms and Conditions. To find out more about how we use your data, please read our Privacy Policy and Cookie Policy.</p>
                <button className={"choice-button choice-button-register"} onClick={goToRegister}>Create an account</button>
                <button className={"choice-button choice-button-login"} onClick={goToLogin} >Login</button>
                <p>Problems connecting ?</p>
            </div>
        </div>
    );
}

export default Register;