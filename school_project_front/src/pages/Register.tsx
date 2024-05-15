import React from "react";
import RegisterForm from "../components/forms/register/RegisterForm.tsx";
import "../../src/components/forms/event/createEventForm.css";
const Register: React.FC = () => {
    return (
        <div className={"form-container"}>
            <h1>Register</h1>
            <RegisterForm/>
        </div>
    );
}

export default Register;