import React, { useState } from "react";
import AuthService from "../../../services/authentication/AuthService.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import City from "../../../types/City.tsx";

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const { countries } = useGetAllCountries();
    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [error, setError] = useState("");

    const authService = AuthService.getInstance();

    const handleRegister = async () => {
        try {
            await authService.register(username, password, firstname, lastname, selectedCity?.id || null);
            window.location.href = "/login";
        } catch (error) {
            setError("Erreur lors de l'inscription.");
        }
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(parseInt(e.target.value) || "");
        setSelectedCity(null);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = parseInt(e.target.value);
        const selectedCountryObj = countries.find((country) => country.id === selectedCountry);
        const city = selectedCountryObj?.cities.find((city) => city.id === cityId) || null;
        setSelectedCity(city);
    };

    return (
        <div>
            <h2>Inscription</h2>
            <div>
                <label htmlFor="username">Email :</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password :</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="firstname">Firstname :</label>
                <input
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastname">Lastname :</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="country">Choisissez votre ville favorite :</label>
                <select id="country" onChange={handleCountryChange} value={selectedCountry}>
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                </select>
                {selectedCountry && (
                    <div>
                        <label htmlFor="city">City :</label>
                        <select id="city" onChange={handleCityChange} value={selectedCity?.id || ""}>
                            <option value="">Select a city</option>
                            {countries
                                .find((country) => country.id === selectedCountry)
                                ?.cities.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                        </select>
                    </div>
                )}
            </div>
            {error && <div>{error}</div>}
            <button onClick={handleRegister}>S'inscrire</button>
        </div>
    );
}

export default RegisterForm;
