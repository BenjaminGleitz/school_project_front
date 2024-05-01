import React from "react";
import EventsList from "../components/events/EventsList.tsx";
import "./css/home.css";

const Home: React.FC = () => {
    return (
        <div className="content">
            <EventsList />
        </div>
    );
}

export default Home;