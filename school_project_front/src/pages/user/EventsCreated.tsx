import React, {useEffect, useState} from "react";
import EventCard from "../../components/events/EventCard";
import useGetEventsCreatedByCurrentUser from "../../services/getEvent/UseGetEventsCreatedByCurrentUser.tsx";
import Event from "../../types/Event";
import Loader from "../../components/loader/Loader.tsx";
import "../../components/events/css/eventsList.css";

const MyEventsCreated: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const {eventsCreated, loading} = useGetEventsCreatedByCurrentUser();

    useEffect(() => {
        setEvents(eventsCreated);
    }, [eventsCreated]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="content">
            <div className="events-list">
                <h2 className={"neuly"}>My created activities</h2>
                <ul>
                    {events.length === 0 ? (
                        <div>No events created yet.</div>
                    ) : (
                        <div className="event-cards event-cards-home">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} setEvents={setEvents}/>
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MyEventsCreated;
