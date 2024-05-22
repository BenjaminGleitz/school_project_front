import React, { useState } from "react";
import RegisterForm from "../components/forms/register/RegisterForm.tsx";
import "../../src/components/forms/event/createEventForm.css";
import { IoChevronBack } from "react-icons/io5";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNextStep = () => {
        setStep(step + 1);
    };

    return (
        <div className="page-register">
            <div className="header-register">
                <button className="back-button-register" onClick={() => navigate(-1)}><IoChevronBack /></button>
                <img className="logo-return-register" src={logo} alt="Logo de l'entreprise" />
            </div>
            <div className={"form-container-register"}>
                <div className={"form-title-register"}>
                    <h1 className={"register-title neuly"}>{step === 1 ? "Your e-mail address?" : "More About You!"}</h1>
                    <p className={"register-subtitle"}>
                        {step === 1
                            ? "Check your e-mail address so you don't lose access to your account."
                            : "Fill in more details about yourself to complete the registration."}
                    </p>
                </div>
                <RegisterForm step={step} onNextStep={handleNextStep} />
            </div>
        </div>
    );
};

export default Register;
