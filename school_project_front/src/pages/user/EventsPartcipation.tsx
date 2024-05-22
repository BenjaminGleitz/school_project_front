// MyEventsParticipation.tsx
import React, { useEffect, useState } from "react";
import EventCard from "../../components/events/EventCard";
import useGetEventsParticipationByCurrentUser from "../../services/getEvent/useGetEventsParticipationByCurrentUser";
import Event from "../../types/Event";
import Loader from "../../components/loader/Loader.tsx";

const MyEventsParticipation: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const { eventsParticipation, loading } = useGetEventsParticipationByCurrentUser();

    useEffect(() => {
        setEvents(eventsParticipation);
    }, [eventsParticipation]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="my-events-created content">
            <h2 className={"neuly"}>My Participations</h2>
            {events.length === 0 ? (
                <div>No events created yet.</div>
            ) : (
                <div className="event-cards">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} setEvents={setEvents} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEventsParticipation;