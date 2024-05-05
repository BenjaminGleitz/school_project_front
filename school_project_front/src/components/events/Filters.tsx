import React, { useState, useEffect } from "react";
import useGetAllCategories from "../../services/getCategory/useGetAllCategories.tsx";
import useGetAllCountries from "../../services/getCountry/UseGetAllCountries.tsx";
import {useUser} from "../../contexts/UserContext.tsx";

interface FiltersProps {
    setSelectedCategory: (value: string | null) => void;
    setSelectedDate: (value: string | null) => void;
    setSelectedCountry: (value: string | null) => void;
    setSelectedCity: (value: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             setSelectedCategory,
                                             setSelectedDate,
                                             setSelectedCountry,
                                             setSelectedCity,
                                         }) => {
    const { categories } = useGetAllCategories();
    const { countries } = useGetAllCountries();
    const [selectedCategory, setSelectedCategoryLocal] = useState<string | null>(null);
    const [selectedDate, setSelectedDateLocal] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountryLocal] = useState<string | null>(null);
    const [selectedCity, setSelectedCityLocal] = useState<string | null>(null);
    const [cities, setCities] = useState<string[]>([]);
    const currentUser = useUser();

    useEffect(() => {
        if (selectedCountry) {
            const selectedCountryObj = countries.find(country => country.name === selectedCountry);
            if (selectedCountryObj) {
                setCities(selectedCountryObj.cities.map(city => city.name));
            } else {
                setCities([]);
            }
        } else {
            setCities([]);
        }
    }, [selectedCountry, countries]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryLocal(e.target.value);
        setSelectedCategory(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDateLocal(e.target.value);
        setSelectedDate(e.target.value);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountryLocal(e.target.value);
        setSelectedCountry(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCityLocal(e.target.value);
        setSelectedCity(e.target.value);
    };

    const handleReset = () => {
        setSelectedCategory(null);
        setSelectedDate(null);
        setSelectedCountry(null);
        setSelectedCity(null);
    };

    const handleSearchFavoriteCity = () => {
        if (currentUser && currentUser.favoriteCity) {
            setSelectedCountry(currentUser.favoriteCity.country.name);
            setSelectedCity(currentUser.favoriteCity.name);
            setSelectedCountryLocal(currentUser.favoriteCity.country.name);
            setSelectedCityLocal(currentUser.favoriteCity.name);
        }
    };

    return (
        <div className="filters">
            <div className="category-filter">
                <select
                    value={selectedCategory || ""}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.title}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="date-filter">
                <input
                    type="date"
                    value={selectedDate || ""}
                    onChange={handleDateChange}
                />
            </div>
            <div className="country-filter">
                <select
                    value={selectedCountry || ""}
                    onChange={handleCountryChange}
                >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCountry && (
                <div className="city-filter">
                    <select
                        value={selectedCity || ""}
                        onChange={handleCityChange}
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="reset-button">
                <button onClick={handleReset}>Reset filter</button>
            </div>
            <div className="search-favorite-button">
                <button onClick={handleSearchFavoriteCity}>Search in my favorite city</button>
            </div>
        </div>
    );
};

export default Filters;
