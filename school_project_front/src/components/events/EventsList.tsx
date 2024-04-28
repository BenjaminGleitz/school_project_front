import React from "react";
import useGetAllEvents from "../../services/getEvent/UseGetAllEvents.tsx";
import EventCard from "./EventCard.tsx";
import "./css/eventsList.css";

const EventsList: React.FC = () => {
    const { events } = useGetAllEvents();

    return (
        <div className="events-list">
            <ul>
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ul>
        </div>
    );
}

export default EventsList;