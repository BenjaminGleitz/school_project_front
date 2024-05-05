// Message.tsx
import React from "react";
import "./messages.css";

interface MessageProps {
    type: "success" | "error";
    text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
    return (
        <div className={`message ${type}`}>
            <p>{text}</p>
        </div>
    );
};

export default Message;
