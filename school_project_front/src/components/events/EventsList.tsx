import React, { useEffect, useState } from "react";
import EventCard from "./EventCard.tsx";
import "./css/eventsList.css";
import useGetAllEventsByFavoriteCityOfCurrentUser from "../../services/getEvent/UseGetAllEventsByFavoriteCityOfCurrentUser.tsx";
import Filters from "./Filters.tsx";
import Event from "../../types/Event.tsx";
import useGetEventsFiltered from "../../services/getEvent/UseGetEventsFiltered.tsx";

interface FilterValues {
    country: string;
    city: string | undefined;
    category: string | undefined;
    date: string | undefined;
}

const EventsList: React.FC = () => {
    const { events, loading } = useGetAllEventsByFavoriteCityOfCurrentUser();
    const { getFilteredEvents } = useGetEventsFiltered();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (!loading && events.length > 0) {
            setFilteredEvents(events);
        }
    }, [events, loading]);

    const handleFilterSubmit = async (filterValues: FilterValues) => {
        const areAllFiltersEmpty = Object.values(filterValues).every(value => !value);

        if (areAllFiltersEmpty) {
            setFilteredEvents(events);
        } else {
            try {
                console.log("filterValues : ", filterValues)
                const filteredData = await getFilteredEvents(filterValues);
                if (Array.isArray(filteredData)) {
                    setFilteredEvents(filteredData);
                }
            } catch (error) {
                console.error("Error filtering events:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="events-list">
        <button onClick={() => setShowFilters(!showFilters)}>Toggle Filters</button>
        <button onClick={() => window.location.href = "/create-event"}>Create Event</button>
            {showFilters && <Filters onFilterSubmit={handleFilterSubmit} />}
            <ul>
                {filteredEvents.length === 0 ? (
                    <div>No events available with your filter</div>
                ) : (
                    <div className="event-cards">
                        {filteredEvents
                            .map((event) => (
                            <EventCard key={event.id} event={event}/>
                        ))}
                    </div>
                )}
            </ul>
        </div>
    );
}

export default EventsList;