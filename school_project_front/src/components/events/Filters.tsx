import React from "react";

interface FiltersProps {
    categories: any[];
    countries: any[];
    cities: any[];
    selectedCategory: string | null;
    setSelectedCategory: (value: string | null) => void;
    selectedDate: string | null;
    setSelectedDate: (value: string | null) => void;
    selectedCountry: string | null;
    setSelectedCountry: (value: string | null) => void;
    selectedCity: string | null;
    setSelectedCity: (value: string | null) => void;
    handleReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
    categories,
    countries,
    cities,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
    setSelectedDate,
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    handleReset
}) => {
    return (
        <div className="filters">
            <div className="category-filter">
                <select
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
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
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div className="country-filter">
                <select
                    value={selectedCountry || ""}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">All Countries</option>
                    {countries.map(country => (
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
                        {cities.map(city => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="reset-button">
                <button onClick={handleReset}>Réinitialiser</button>
            </div>
        </div>
    );
}

export default Filters;