import React from "react";
import ChangeLocationUserForm from "../../components/forms/user/ChangeLocationUserForm.tsx";


const ChangeLocationUser: React.FC = () => {
    return (
        <div className={"form-container"}>
            <h1>Change Location</h1>
            <ChangeLocationUserForm />
        </div>
    );
}

export default ChangeLocationUser;
