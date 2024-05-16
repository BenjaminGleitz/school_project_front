import { useParams, useNavigate } from "react-router-dom";
import Message from "../../messages/Message.tsx";
import React, { useEffect, useState } from "react";
import useGetAllCountries from "../../../services/getCountry/UseGetAllCountries.tsx";
import useGetAllCategories from "../../../services/getCategory/useGetAllCategories.tsx";
import useGetOneEvent from "../../../services/getEvent/UseGetOneEvent.tsx";
import useUpdateEvent from "../../../services/getEvent/UseUpdateEvent.tsx";
import { useUser } from "../../../contexts/UserContext.tsx";
import Loader from "../../loader/Loader.tsx";
import "./createEventForm.css";
import "./updateEvent.css";

const UpdateEventForm: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { countries } = useGetAllCountries();
    const { categories } = useGetAllCategories();
    const getEvent = useGetOneEvent();
    const updateEvent = useUpdateEvent();
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const connectedUser = useUser();
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return;
            try {
                const { event, loading } = await getEvent(parseInt(eventId));
                if (event) {
                    if (connectedUser && connectedUser.id !== event.creator.id) {
                        navigate("/my-events");
                        setMessage({ type: "error", text: "You are not the organizer of this event." });
                        return;
                    }
                    let date = new Date(event.start_at);
                    let formattedDate = date.toISOString().slice(0,16);
                    setFormData({
                        title: event.title,
                        description: event.description || "",
                        start_at: formattedDate,
                        city_id: event.city.id,
                        category_id: event.category.id,
                        participantLimit: event.participantLimit || 0
                    });
                    const selectedCountryObj = countries.find(country => country.cities.some(city => city.id === event.city.id));
                    if (selectedCountryObj) {
                        setSelectedCountry(selectedCountryObj.id.toString());
                    }
                    setLoading(loading);
                    setIsAllowed(true);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEvent();
    }, [eventId, countries, connectedUser, navigate]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_at: "",
        city_id: 0,
        category_id: 0,
        participantLimit: 0
    });
    const [selectedCountry, setSelectedCountry] = useState<string>("");
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
        setLoading(true);
        if (!eventId) {
            console.error("Event ID is missing.");
            return;
        }
        try {
            const updatedEvent = await updateEvent(parseInt(eventId), formData);
            if (updatedEvent) {
                setMessage({ type: "success", text: "Event updated successfully." });
                setTimeout(() => {
                    setMessage(null);
                    navigate("/my-events");
                }, 3000);
            } else {
                setMessage({ type: "error", text: "Error updating event." });
            }
        } catch (error) {
            console.error("Error updating event:", error);
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        setLoading(false);
    };

    return (
        <div className={"form-container"}>
            {loading ? (
                <Loader/>
            ) : isAllowed ? (
                <form onSubmit={handleSubmit}>
                    <div className={"form-input"}>
                        <label>
                            Title:
                            <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={"form-input"}>
                        <label>
                            Description:
                            <textarea name="description" value={formData.description} onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={"form-input"}>
                        <label>
                            Start Date:
                            <input type="datetime-local" name="start_at" value={formData.start_at}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                    <div className={"form-input"}>
                        <label>
                            <span>Country:</span>
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
                                <span>City:</span>
                                <select
                                    value={formData.city_id}
                                    onChange={(e) => setFormData({...formData, city_id: parseInt(e.target.value)})}
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
                    </div>
                    <div className={"form-input"}>
                        <label>
                            Category:
                            <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className={"form-input"}>
                        <label>
                            Participant Limit:
                            <input type="number" name="participantLimit" value={formData.participantLimit}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                    {message && <Message type={message.type} text={message.text}/>}
                    <button type="submit">Update Event</button>
                </form>
            ) : null}
        </div>
    );
};

export default UpdateEventForm;