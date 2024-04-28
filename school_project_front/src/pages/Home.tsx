import React from "react";
import EventsList from "../components/events/EventsList.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <EventsList />
        </div>
    );
}

export default Home;