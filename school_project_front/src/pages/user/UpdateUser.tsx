import React from "react"
import UpdateUserForm from "../../components/forms/user/UpdateUserForm.tsx";

const UpdateUser: React.FC = () => {
    return (
        <div className={"form-container"}>
            <h2>Mise à jour de l'utilisateur</h2>
            < UpdateUserForm/>
        </div>
    );
};

export default UpdateUser;
