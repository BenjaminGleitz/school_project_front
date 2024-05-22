import React, { useState } from "react";
import AuthService from "../../../services/authentication/AuthService.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import City from "../../../types/City.tsx";
import "./registerForm.css";

interface FormErrors {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    selectedCountry: string;
    nationality: string;
    birthdate: string;
    gender: string;
    general?: string;
}

const RegisterForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const { countries } = useGetAllCountries();
    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [errors, setErrors] = useState<FormErrors>({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        selectedCountry: "",
        nationality: "",
        birthdate: "",
        gender: ""
    });

    const authService = AuthService.getInstance();

    const handleRegister = async () => {
        try {
            await authService.register(username, password, firstname, lastname, selectedCity?.id || null, nationality, birthdate, gender);
            console.log("User registered with data: ", { username, firstname, lastname, selectedCity, nationality, birthdate, gender });
            window.location.href = "/login";
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, general: "Erreur lors de l'inscription." }));
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

    const validateStep1 = () => {
        const newErrors = { ...errors };
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

        setErrors(newErrors);
        return newErrors.username === "" && newErrors.password === "";
    };

    const validateStep2 = () => {
        const newErrors = { ...errors };
        if (!firstname.trim()) {
            newErrors.firstname = "Please enter your first name.";
        } else {
            newErrors.firstname = "";
        }

        if (!lastname.trim()) {
            newErrors.lastname = "Please enter your last name.";
        } else {
            newErrors.lastname = "";
        }

        if (!selectedCountry) {
            newErrors.selectedCountry = "Please select your country.";
        } else {
            newErrors.selectedCountry = "";
        }

        if (!nationality.trim()) {
            newErrors.nationality = "Please enter your nationality.";
        } else {
            newErrors.nationality = "";
        }

        if (!birthdate) {
            newErrors.birthdate = "Please enter your birthdate.";
        } else {
            newErrors.birthdate = "";
        }

        if (!gender) {
            newErrors.gender = "Please select your gender.";
        } else {
            newErrors.gender = "";
        }

        setErrors(newErrors);
        return newErrors.firstname === "" && newErrors.lastname === "" && newErrors.selectedCountry === "" && newErrors.nationality === "" && newErrors.birthdate === "" && newErrors.gender === "";
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
            }
        } else {
            if (validateStep2()) {
                handleRegister();
            }
        }
    };

    return (
        <form className={"form-registerForm"} onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"Email :"}
                                type="email"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <div className="invalid">{errors.username}</div>}
                        </label>
                    </div>
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"Password :"}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <div className="invalid">{errors.password}</div>}
                        </label>
                    </div>
                    <button type="button" onClick={() => { if (validateStep1()) setStep(2); }}>Next</button>
                </>
            )}
            {step === 2 && (
                <>
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"First Name :"}
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                            {errors.firstname && <div className="invalid">{errors.firstname}</div>}
                        </label>
                    </div>
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"Last Name :"}
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                            {errors.lastname && <div className="invalid">{errors.lastname}</div>}
                        </label>
                    </div>
                    <div className={"form-input-registerform"}>
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
                            {errors.selectedCountry && <div className="invalid">{errors.selectedCountry}</div>}
                        </label>
                    </div>
                    {selectedCountry && (
                        <div className={"form-input-registerform"}>
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
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"Nationality :"}
                                type="text"
                                id="nationality"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                required
                            />
                            {errors.nationality && <div className="invalid">{errors.nationality}</div>}
                        </label>
                    </div>
                    <div className={"form-input-registerform"}>
                        <label>
                            <input
                                placeholder={"Birthdate :"}
                                type="date"
                                id="birthdate"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                            />
                            {errors.birthdate && <div className="invalid">{errors.birthdate}</div>}
                        </label>
                    </div>
                    <div className={"form-input-registerform radio"}>
                        <label className={"label"}>Gender</label>
                        <div className="gender-options">
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="man"
                                    checked={gender === "man"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="custom-radio">Man</span>
                            </label>
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="woman"
                                    checked={gender === "woman"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="custom-radio">Woman</span>
                            </label>
                            <label className="radio-container">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="non-binary"
                                    checked={gender === "non-binary"}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="custom-radio">Non-binary</span>
                            </label>
                        </div>
                        {errors.gender && <div className="invalid">{errors.gender}</div>}
                    </div>
                    {errors.general && <div className="invalid">{errors.general}</div>}
                    <button type="submit">Submit</button>
                </>
            )}
        </form>
    );
}

export default RegisterForm;
