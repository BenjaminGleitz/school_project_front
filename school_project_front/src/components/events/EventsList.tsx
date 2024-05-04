import React, { useState } from "react";
import useGetAllEvents from "../../services/getEvent/UseGetAllEvents.tsx";
import EventCard from "./EventCard.tsx";
import "./css/eventsList.css";
import useGetAllCategories from "../../services/getCategory/useGetAllCategories.tsx";
import useGetAllCountries from "../../services/getCountry/UseGetAllCountries.tsx";
import Filters from "./Filters.tsx";
import { useUser } from "../../contexts/UserContext.tsx";

const EventsList: React.FC = () => {
    const { events } = useGetAllEvents();
    const { categories } = useGetAllCategories();
    const { countries } = useGetAllCountries();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const currentUser = useUser();

    const filteredEvents = events.filter(event =>
        (!selectedCategory || event.category.title === selectedCategory) &&
        (!selectedDate || new Date(event.start_at) >= new Date(selectedDate)) &&
        (!selectedCountry || event.city.country.name === selectedCountry) &&
        (!selectedCity || event.city.name === selectedCity)
    );

    const selectedCountryObject = countries.find(country => country.name === selectedCountry);
    const cities = selectedCountryObject ? selectedCountryObject.cities : [];

    const handleReset = () => {
        setSelectedCategory(null);
        setSelectedDate(null);
        setSelectedCountry(null);
        setSelectedCity(null);
    };

    const handleUpdateFilters = () => {
        if (currentUser && currentUser.favoriteCity) {
            setSelectedCountry(currentUser.favoriteCity.country.name);
            setSelectedCity(currentUser.favoriteCity.name);
        }
    };

    return (
        <div className="events-list">
            <Filters
                categories={categories}
                countries={countries}
                cities={cities}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                handleReset={handleReset}
                handleUpdateFilters={handleUpdateFilters}
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
