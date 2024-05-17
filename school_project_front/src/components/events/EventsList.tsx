import React, { useEffect, useState } from "react";
import EventCard from "./EventCard.tsx";
import "./css/eventsList.css";
import useGetAllEventsByFavoriteCityOfCurrentUser from "../../services/getEvent/UseGetAllEventsByFavoriteCityOfCurrentUser.tsx";
import Filters from "./Filters.tsx";
import Event from "../../types/Event.tsx";
import useGetEventsFiltered from "../../services/getEvent/UseGetEventsFiltered.tsx";
import Loader from "../loader/Loader.tsx";
import { ImLocation } from "react-icons/im";
import ChangeFavoriteCityModal from "../users/ChangeFavoriteCityModal.tsx";

interface FilterValues {
    country: string;
    city: string | undefined;
    category: string | undefined;
    date: string | undefined;
}

const EventsList: React.FC = () => {
    const { events, loading, refetch } = useGetAllEventsByFavoriteCityOfCurrentUser();
    const { getFilteredEvents } = useGetEventsFiltered();
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

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
                console.log("filterValues : ", filterValues);
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
        return <Loader />;
    }

    return (
        <div className="events-list">
            <button className="create-event-button" onClick={() => window.location.href = "/create-event"}>Create Event</button>
            <div className="btn-group">
                <button className="toggle-filter" onClick={() => setShowFilters(!showFilters)}>Filters</button>
                <button className="toggle-filter" onClick={() => setShowLocationModal(true)}>
                    <ImLocation />
                </button>
            </div>
            {showFilters && <Filters onFilterSubmit={handleFilterSubmit} />}
            <ul>
                {filteredEvents.length === 0 ? (
                    <div>No events available with your filter</div>
                ) : (
                    <div className="event-cards">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </ul>
            {showLocationModal && <ChangeFavoriteCityModal onClose={() => setShowLocationModal(false)} onUpdate={refetch} />}
        </div>
    );
}

export default EventsList;
