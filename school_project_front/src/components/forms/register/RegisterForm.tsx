import React, {useState} from "react";
import AuthService from "../../../services/authentication/AuthService.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import City from "../../../types/City.tsx";

interface FormErrors {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    selectedCountry: string;
    general?: string;
}

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const {countries} = useGetAllCountries();
    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [errors, setErrors] = useState<FormErrors>({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        selectedCountry: ""
    });

    const authService = AuthService.getInstance();

    const handleRegister = async () => {
        try {
            await authService.register(username, password, firstname, lastname, selectedCity?.id || null);
            window.location.href = "/login";
        } catch (error) {
            setErrors((prevErrors) => ({...prevErrors, general: "Erreur lors de l'inscription."}));
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

    const validateForm = () => {
        const newErrors = {...errors};
        if (!username.trim()) {
            newErrors.username = "Veuillez saisir votre email.";
        } else {
            newErrors.username = "";
        }

        if (!password.trim()) {
            newErrors.password = "Veuillez saisir votre mot de passe.";
        } else if (password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        } else {
            newErrors.password = "";
        }

        if (!firstname.trim()) {
            newErrors.firstname = "Veuillez saisir votre prénom.";
        } else {
            newErrors.firstname = "";
        }

        if (!lastname.trim()) {
            newErrors.lastname = "Veuillez saisir votre nom.";
        } else {
            newErrors.lastname = "";
        }

        if (!selectedCountry) {
            newErrors.selectedCountry = "Veuillez sélectionner un pays.";
        } else {
            newErrors.selectedCountry = "";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === "");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            handleRegister();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={"form-input"}>
                <label>
                    <input
                        placeholder={" Email :"}
                        type="email"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <div>{errors.username}</div>}
                </label>
            </div>
            <div className={"form-input"}>
                <label>
                    <input
                        placeholder={" Password :"}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div>{errors.password}</div>}
                </label>
            </div>
            <div className={"form-input"}>
                <label>
                    <input
                        placeholder={" First Name :"}
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    {errors.firstname && <div>{errors.firstname}</div>}
                </label>
            </div>
            <div className={"form-input"}>
                <label>
                    <input
                        placeholder={" Last Name :"}
                        type="text"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                    {errors.lastname && <div>{errors.lastname}</div>}
                </label>
            </div>
            <div className={"form-input"}>
                <label>
                    <select
                        id="country"
                        onChange={handleCountryChange}
                        value={selectedCountry}
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                    </select>
                    {errors.selectedCountry && <div>{errors.selectedCountry}</div>}
                </label>
            </div>
            {selectedCountry && (
                <div className={"form-input"}>
                    <label>
                        <select
                            id="city"
                            onChange={handleCityChange}
                            value={selectedCity?.id || ""}
                        >
                            <option value="">Select a city</option>
                            {countries
                                .find((country) => country.id === selectedCountry)
                                ?.cities.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                        </select>
                    </label>
                </div>
            )}
            {errors.general && <div>{errors.general}</div>}
            <button type="submit">Sign up</button>
        </form>
    );
}

export default RegisterForm;
