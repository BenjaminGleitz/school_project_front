import React, { useState } from "react";
import useCreateEvent from "../../../services/getEvent/UseCreateEvent.tsx";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import useGetAllCategories from "../../../services/getCategory/useGetAllCategories.tsx";
import "./createEventForm.css";
import Message from "../../messages/Message.tsx";

const CreateEventForm: React.FC = () => {
    const createEvent = useCreateEvent();
    const { countries } = useGetAllCountries();
    const { categories } = useGetAllCategories();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_at: "",
        city_id: 0,
        category_id: 0,
        participantLimit: "" as number | string | null
    });
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [startAtError, setStartAtError] = useState<string>("");
    const [cityError, setCityError] = useState<string>("");
    const [categoryError, setCategoryError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = e.target.value;
        setSelectedCountry(countryId);
        const selectedCountryObj = countries.find(country => country.id === parseInt(countryId));
        if (selectedCountryObj) {
            setFormData({ ...formData, city_id: 0 });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        let hasError = false;

        if (!formData.title) {
            setTitleError("Title is required");
            hasError = true;
        } else {
            setTitleError("");
        }

        if (!formData.description) {
            setDescriptionError("Description is required");
            hasError = true;
        } else {
            setDescriptionError("");
        }

        if (!formData.start_at) {
            setStartAtError("Start date is required");
            hasError = true;
        } else if (new Date(formData.start_at) < new Date()) {
            setStartAtError("Start date must be in the future");
            hasError = true;
        } else {
            setStartAtError("");
        }

        if (!formData.city_id) {
            setCityError("City is required");
            hasError = true;
        } else {
            setCityError("");
        }

        if (!formData.category_id) {
            setCategoryError("Category is required");
            hasError = true;
        } else {
            setCategoryError("");
        }

        if (hasError) {
            return;
        }

        // Transform participantLimit to null if it's 0 or an empty string
        const dataToSubmit = {
            ...formData,
            participantLimit: formData.participantLimit === "" || formData.participantLimit === "0" ? null : Number(formData.participantLimit)
        };

        try {
            const createdEvent = await createEvent(dataToSubmit);
            if (createdEvent) {
                console.log("Event created:", createdEvent);
                setMessage({ type: "success", text: "Event created successfully" });
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    window.location.href = `/my-events`;
                }, 3000);
            } else {
                console.log("Failed to create event");
                setMessage({ type: "error", text: "Error creating event. Please try again later." });
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error creating event:", error);
            setMessage({ type: "error", text: "Error creating event. Please try again later." });
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        }
    };

    return (
        <form className={"create-event"} onSubmit={handleSubmit} noValidate>
            <div className={"form-input-event"}>
                <label>
                    <input
                        placeholder={formSubmitted && !formData.title ? titleError : "Title : "}
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={formSubmitted && !formData.title ? 'invalid' : ''}
                    />
                </label>
            </div>
            <div className={"form-input-event"}>
                <label>
                    <textarea
                        placeholder={formSubmitted && !formData.description ? descriptionError : "Description : "}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className={formSubmitted && !formData.description ? 'invalid' : ''}
                    />
                </label>
            </div>
            <div className={"form-input-event"}>
                <label>
                    <input
                        placeholder={formSubmitted && !formData.start_at ? startAtError : "Start Date : "}
                        type="datetime-local"
                        name="start_at"
                        value={formData.start_at}
                        onChange={handleChange}
                        required
                        className={formSubmitted && (formData.start_at === "" || new Date(formData.start_at) < new Date()) ? 'invalid' : ''}
                    />
                    {startAtError && <p className="error-message future-date">{startAtError}</p>}
                </label>
            </div>
            <div className={"form-input-event"}>
                <label>
                    <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        required
                        className={formSubmitted && !selectedCountry ? 'invalid' : ''}
                    >
                        <option value="">
                            {formSubmitted && !selectedCountry ? "Select Country" : "Select Country"}
                        </option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {selectedCountry && (
                <div className={"form-input-event"}>
                    <label>
                        <select
                            value={formData.city_id}
                            onChange={(e) => setFormData({...formData, city_id: parseInt(e.target.value)})}
                            required
                            className={formSubmitted && !formData.city_id ? 'invalid' : ''}
                        >
                            <option value="">
                                {formSubmitted && !formData.city_id ? cityError : "Select City"}
                            </option>
                            {countries
                                .find((country) => country.id === parseInt(selectedCountry))
                                ?.cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>
            )}
            <div className={"form-input-event"}>
                <label>
                    <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                        required
                        className={formSubmitted && !formData.category_id ? 'invalid' : ''}
                    >
                        <option value="">
                            {formSubmitted && !formData.category_id ? categoryError : "Select Category"}
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className={"form-input-event"}>
                <label>
                    <input
                        placeholder={"Participant Limit : (don't fill if no limit)"}
                        type="number"
                        name="participantLimit"
                        value={formData.participantLimit || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>
            {showModal && message && <Message type={message.type} text={message.text}/>}
            <button type="submit">Create Event</button>
        </form>
    );
}

export default CreateEventForm;
