// UpdateUserForm.tsx
import React, {useState, useEffect} from "react";
import useUpdateConnectedUser from "../../../services/getUser/useUpdateConnectedUser.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import User from "../../../types/User.tsx";
import City from "../../../types/City.tsx";
import {useUser} from "../../../contexts/UserContext.tsx";
import Message from "../../messages/Message.tsx";

interface FormErrors {
    firstname: string;
    lastname: string;
    selectedCountry: string;
    selectedCity: string;
    image: string;
    general?: string;
}

const UpdateUserForm: React.FC = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [image, setImage] = useState("");

    const [selectedCountry, setSelectedCountry] = useState<number | "">("");
    const [selectedCityObj, setSelectedCityObj] = useState<City | null>(null);
    const [errors, setErrors] = useState<FormErrors>({
        firstname: "",
        lastname: "",
        selectedCountry: "",
        selectedCity: "",
        image: ""
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // État pour gérer l'affichage du message de succès
    const updateUser = useUpdateConnectedUser();
    const {countries} = useGetAllCountries();
    const currentUser = useUser();

    useEffect(() => {
        if (currentUser) {
            setFirstname(currentUser.firstname);
            setLastname(currentUser.lastname);
            setSelectedCountry(currentUser.favoriteCity?.country.id || "");
            setSelectedCityObj(currentUser.favoriteCity || null);
            setImage(currentUser.image || "")
        }
    }, [currentUser]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            const updatedUserData: Partial<User> = {
                firstname: firstname,
                lastname: lastname,
                favoriteCity: selectedCityObj,
                image: image
            };

            const updatedUser = await updateUser(updatedUserData);
            if (updatedUser) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 3000);
            } else {
                setErrors({
                    firstname: "",
                    lastname: "",
                    selectedCountry: "",
                    selectedCity: "",
                    image: "",
                    general: "Erreur lors de la mise à jour."
                });
            }
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {...errors};

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
            newErrors.selectedCountry = "Please select a country.";
        } else {
            newErrors.selectedCountry = "";
        }

        if (!selectedCityObj) {
            newErrors.selectedCity = "Please select a city.";
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
                <Message type="success" text="Profile updated successfully"/>
            )}
            <div className={"form-input"}>
                <label htmlFor="firstname">Prénom :</label>
                <input
                    type="text"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                {errors.firstname && <div>{errors.firstname}</div>}
            </div>
            <div className={"form-input"}>
                <label htmlFor="lastname">Nom :</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                {errors.lastname && <div>{errors.lastname}</div>}
            </div>
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
            <div className={"form-input"}>
                <label htmlFor="image">Image :</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.value)}
                />
                {errors.image && <div>{errors.image}</div>}
            </div>
            {errors.general && <div>{errors.general}</div>}
            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateUserForm;
