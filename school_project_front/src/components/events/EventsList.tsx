import React, { useState } from "react";
import useGetAllEvents from "../../services/getEvent/UseGetAllEvents.tsx";
import EventCard from "./EventCard.tsx";
import "./css/eventsList.css";
import Filters from "./Filters.tsx";

const EventsList: React.FC = () => {
    const { events, loading } = useGetAllEvents();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const filteredEvents = events.filter(event =>
        (!selectedCategory || event.category.title === selectedCategory) &&
        (!selectedDate || new Date(event.start_at) >= new Date(selectedDate)) &&
        (!selectedCountry || event.city.country.name === selectedCountry) &&
        (!selectedCity || event.city.name === selectedCity)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="events-list">
            <Filters
                setSelectedCategory={setSelectedCategory}
                setSelectedDate={setSelectedDate}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
            />
            <ul>
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ul>
        </div>
    );
}

export default EventsList;
