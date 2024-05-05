import React from "react";
import EventCard from "../../components/events/EventCard";
import useGetEventsCreatedByCurrentUser from "../../services/getEvent/UseGetEventsCreatedByCurrentUser.tsx";

const MyEventsCreated: React.FC = () => {
    const { eventsCreated, loading } = useGetEventsCreatedByCurrentUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-events-created">
            <h2>My Events Created</h2>
            {eventsCreated.length === 0 ? (
                <div>No events created yet.</div>
            ) : (
                <div className="event-cards">
                    {eventsCreated.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEventsCreated;
