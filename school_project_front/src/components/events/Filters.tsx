import React, { useState } from "react";
import useGetAllCountries from "../../services/getCountry/UseGetAllCountries.tsx";
import useGetAllCategories from "../../services/getCategory/useGetAllCategories.tsx";

interface FilterValues {
    country: string;
    city: string | undefined;
    category: string | undefined;
    date: string | undefined;
}

interface FiltersProps {
    onFilterSubmit: (filterValues: FilterValues) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterSubmit }) => {
    const { countries } = useGetAllCountries();
    const { categories } = useGetAllCategories();
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryName = event.target.value;
        setSelectedCountry(countryName);
        // Filtrer les villes pour le pays sélectionné
        const selectedCountryObj = countries.find(country => country.name === countryName);
        if (selectedCountryObj) {
            setCities(selectedCountryObj.cities.map(city => city.name));
        } else {
            setCities([]);
        }
    };

    const handleSubmit = () => {
        // Créer un objet FilterValues avec les valeurs sélectionnées
        const filterValues: FilterValues = {
            country: selectedCountry,
            city: selectedCity !== "" ? selectedCity : undefined, // Ne pas inclure si non sélectionné
            category: selectedCategory !== "" ? selectedCategory : undefined, // Ne pas inclure si non sélectionné
            date: selectedDate !== "" ? selectedDate : undefined // Ne pas inclure si non sélectionné
        };

        onFilterSubmit(filterValues);
    };

    const handleReset = () => {
        // Réinitialiser les valeurs des filtres
        setSelectedCountry("");
        setSelectedCity("");
        setSelectedCategory("");
        setSelectedDate("");

        // Créer un objet FilterValues avec les valeurs par défaut
        const defaultFilterValues: FilterValues = {
            country: "",
            city: undefined,
            category: undefined,
            date: undefined
        };

        // Appeler onFilterSubmit avec les valeurs par défaut
        onFilterSubmit(defaultFilterValues);
    };

    return (
        <div className="filters">
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
                        onChange={(e) => setSelectedCity(e.target.value)}
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
            <div className="category-filter">
                <select
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Date"
                />
            </div>
            <div className="submit-button">
                <button onClick={handleSubmit}>Submit filter</button>
            </div>
            <div className="reset-button">
                <button onClick={handleReset}>Reset filter</button>
            </div>
        </div>
    );
};

export default Filters;
