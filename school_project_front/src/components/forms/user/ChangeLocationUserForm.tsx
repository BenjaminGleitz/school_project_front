// ChangeLocationUserForm.tsx
import React, { useState, useEffect } from "react";
import useUpdateConnectedUser from "../../../services/getUser/useUpdateConnectedUser.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import City from "../../../types/City.tsx";
import { useUser } from "../../../contexts/UserContext.tsx";
import Message from "../../messages/Message.tsx";

interface FormErrors {
    selectedCountry: string;
    selectedCity: string;
    general?: string;
}

const ChangeLocationUserForm: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCityObj, setSelectedCityObj] = useState<City | null>(null);
    const [errors, setErrors] = useState<FormErrors>({
        selectedCountry: "",
        selectedCity: ""
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const updateUser = useUpdateConnectedUser();
    const { countries } = useGetAllCountries();
    const currentUser = useUser();

    useEffect(() => {
        if (currentUser) {
            setSelectedCountry(currentUser.favoriteCity?.country.id || "");
            setSelectedCityObj(currentUser.favoriteCity || null);
        }
    }, [currentUser]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            const updatedUserData = {
                favoriteCity: selectedCityObj
            };

            const updatedUser = await updateUser(updatedUserData);
            if (updatedUser) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    window.location.href = "/home";
                }, 3000);
            } else {
                setErrors({
                    selectedCountry: "",
                    selectedCity: "",
                    general: "Erreur lors de la mise à jour."
                });
            }
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = { ...errors };

        if (!selectedCountry) {
            newErrors.selectedCountry = "Veuillez sélectionner un pays.";
        } else {
            newErrors.selectedCountry = "";
        }

        if (!selectedCityObj) {
            newErrors.selectedCity = "Veuillez sélectionner une ville.";
        } else {
            newErrors.selectedCity = "";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === "");
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(parseInt(e.target.value) || "");
        setSelectedCityObj(null);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = parseInt(e.target.value);
        const selectedCountryObj = countries.find((country) => country.id === selectedCountry);
        const city = selectedCountryObj?.cities.find((city) => city.id === cityId) || null;
        setSelectedCityObj(city);
    };

    return (
        <form onSubmit={handleSubmit}>
            {showSuccessMessage && (
                <Message type="success" text="Location updated successfully" />
            )}
            <div className={"form-input"}>
                <label htmlFor="country">Pays :</label>
                <select
                    id="country"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                    required
                >
                    <option value="">Sélectionner un pays</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
                {errors.selectedCountry && <div>{errors.selectedCountry}</div>}
            </div>
            {selectedCountry && (
                <div className={"form-input"}>
                    <label htmlFor="city">Ville :</label>
                    <select
                        id="city"
                        onChange={handleCityChange}
                        value={selectedCityObj?.id || ""}
                        required
                    >
                        <option value="">Sélectionner une ville</option>
                        {countries
                            .find((country) => country.id === selectedCountry)
                            ?.cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                    </select>
                    {errors.selectedCity && <div>{errors.selectedCity}</div>}
                </div>
            )}
            {errors.general && <div>{errors.general}</div>}
            <button type="submit">Update Location</button>
        </form>
    );
}

export default ChangeLocationUserForm;
