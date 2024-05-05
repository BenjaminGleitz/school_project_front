import React from "react";
import EventCard from "../../components/events/EventCard";
import useGetEventsParticipationByCurrentUser from "../../services/getEvent/useGetEventsParticipationByCurrentUser.tsx";

const MyEventsParticipation: React.FC = () => {
    const { eventsParticipation, loading } = useGetEventsParticipationByCurrentUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-events-created">
            <h2>My Participation to Events</h2>
            {eventsParticipation.length === 0 ? (
                <div>No events created yet.</div>
            ) : (
                <div className="event-cards">
                    {eventsParticipation.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEventsParticipation;
