// ChangeFavoriteCityModal.tsx
import React, { useState, useEffect } from "react";
import useGetAllCountries from "../../services/getCountry/UseGetAllCountries.tsx";
import useUpdateConnectedUser from "../../services/getUser/useUpdateConnectedUser.tsx";
import { useUser } from "../../contexts/UserContext.tsx";
import City from "../../types/City.tsx";
import "./css/changeFavoriteCityModal.css";
import Message from "../messages/Message.tsx";

interface ChangeFavoriteCityModalProps {
    onClose: () => void;
    onUpdate: () => void;  // Nouvelle fonction de rappel pour mettre à jour la liste des événements
}

const ChangeFavoriteCityModal: React.FC<ChangeFavoriteCityModalProps> = ({ onClose, onUpdate }) => {
    const { countries } = useGetAllCountries();
    const updateUser = useUpdateConnectedUser();
    const currentUser = useUser();

    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCityObj, setSelectedCityObj] = useState<City | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [errors, setErrors] = useState<{ selectedCountry: string; selectedCity: string; general?: string }>({
        selectedCountry: "",
        selectedCity: ""
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setSelectedCountry(currentUser.favoriteCity?.country.id || "");
            setSelectedCityObj(currentUser.favoriteCity || null);
            if (currentUser.favoriteCity?.country.id) {
                const selectedCountryObj = countries.find(country => country.id === currentUser.favoriteCity?.country.id);
                if (selectedCountryObj) {
                    setCities(selectedCountryObj.cities);
                }
            }
        }
    }, [currentUser, countries]);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = parseInt(e.target.value);
        setSelectedCountry(countryId);
        const selectedCountryObj = countries.find(country => country.id === countryId);
        if (selectedCountryObj) {
            setCities(selectedCountryObj.cities);
        } else {
            setCities([]);
        }
        setSelectedCityObj(null);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = parseInt(e.target.value);
        const city = cities.find(city => city.id === cityId) || null;
        setSelectedCityObj(city);
    };

    const validateForm = () => {
        const newErrors = {
            selectedCountry: !selectedCountry ? "Veuillez sélectionner un pays." : "",
            selectedCity: !selectedCityObj ? "Veuillez sélectionner une ville." : ""
        };
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const updatedUserData = { favoriteCity: selectedCityObj };

        const updatedUser = await updateUser(updatedUserData);
        if (updatedUser) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                onClose();
                onUpdate();  // Appeler la fonction de rappel pour rafraîchir la liste des événements
            }, 3000);
        } else {
            setErrors(prevErrors => ({ ...prevErrors, general: "Erreur lors de la mise à jour." }));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Change Favorite City</h2>
                <form onSubmit={handleSubmit}>
                    {showSuccessMessage && <Message type="success" text="Location updated successfully"/>}
                    <div className="filter-input">
                        <div className="country-filter">
                            <select id="country" onChange={handleCountryChange} value={selectedCountry} required>
                                <option value="">Sélectionner un pays</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedCountry && <div className="error-message">{errors.selectedCountry}</div>}
                        </div>
                        {selectedCountry && (
                            <div className="city-filter">
                                <select id="city" onChange={handleCityChange} value={selectedCityObj?.id || ""} required>
                                    <option value="">Sélectionner une ville</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedCity && <div className="error-message">{errors.selectedCity}</div>}
                            </div>
                        )}
                        {errors.general && <div className="error-message">{errors.general}</div>}
                        <div className="filter-button">
                            <button type="submit">Update Location</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeFavoriteCityModal;
