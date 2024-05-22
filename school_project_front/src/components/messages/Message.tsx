// Message.tsx
import React from "react";
import "./css/messages.css";
import logo from "../../assets/images/minilogo.png";

interface MessageProps {
    type: "success" | "error";
    text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
    return (
        <div className={`overlay-message ${type === "success" ? "success" : "error"}`}>
            <div className={`message ${type}`}>
                <div className={"message-back"}>
                    <img src={logo} alt="Logo de l'entreprise" />
                    <p className={"neuly"}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
