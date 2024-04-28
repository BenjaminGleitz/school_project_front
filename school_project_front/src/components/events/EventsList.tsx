import React from "react";
import useGetAllEvents from "../../services/getEvent/UseGetAllEvents.tsx";

const EventsList: React.FC = () => {
    const { events } = useGetAllEvents();

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;