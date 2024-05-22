import React from "react";
import RegisterForm from "../components/forms/register/RegisterForm.tsx";
import "../../src/components/forms/event/createEventForm.css";
import {IoChevronBack} from "react-icons/io5";
import logo from "../assets/images/logo.png";
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="page-register">
            <div className="header-register">
                <button className="back-button-register" onClick={() => navigate(-1)}><IoChevronBack/></button>
                <img className="logo-return-register" src={logo} alt="Logo de l'entreprise"/>
            </div>
            <div className={"form-container-register"}>
                <div className={"form-title-register"}>
                    <h1 className={"register-title"}>Your e-mail address ?</h1>
                    <p className={"register-subtitle"}>Check your e-mail adress so you don't lose access to your account.</p>
                </div>
                <RegisterForm/>
            </div>
        </div>
    );
}

export default Register;