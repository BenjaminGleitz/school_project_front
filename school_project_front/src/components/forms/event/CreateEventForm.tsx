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
        participantLimit: 0
    });
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryId = e.target.value;
        setSelectedCountry(countryId);
        const selectedCountryObj = countries.find(country => country.id === parseInt(countryId));
        if (selectedCountryObj) {
            setFormData({...formData, city_id: 0});
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const createdEvent = await createEvent(formData);
            if (createdEvent) {
                // Event created successfully, you can redirect or show a success message
                console.log("Event created:", createdEvent);
                setMessage({ type: "success", text: "Event created successfully" });
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    //redirect
                    window.location.href = `/my-events`;
                }, 3000);
            } else {
                // Handle error, maybe show an error message to the user
                console.log("Failed to create event");
                setMessage({ type: "error", text: "Error creating event. Please try again later." });
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <label>
                Start Date and Time:
                <input type="datetime-local" name="start_at" value={formData.start_at} onChange={handleChange} />
            </label>
            <label>
                Country:
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </label>
            {selectedCountry && (
                <label>
                    City:
                    <select
                        value={formData.city_id}
                        onChange={(e) => setFormData({ ...formData, city_id: parseInt(e.target.value) })}
                    >
                        <option value="">Select City</option>
                        {countries
                            .find((country) => country.id === parseInt(selectedCountry))
                            ?.cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                    </select>
                </label>
            )}
            <label>
                Category ID:
                <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Participant Limit:
                <input type="number" name="participantLimit" value={formData.participantLimit} onChange={handleChange} />
            </label>
            {showModal && message && <Message type={message.type} text={message.text} />}
            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEventForm;
