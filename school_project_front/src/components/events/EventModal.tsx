// EventModal.tsx
import React, { useEffect, useState } from "react";
import "./css/eventModal.css";
import useGetOneEvent from "../../services/getEvent/UseGetOneEvent.tsx";
import Event from "../../types/Event";

interface EventModalProps {
    eventId: number;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EventModal: React.FC<EventModalProps> = ({ eventId, closeModal }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const getEventById = useGetOneEvent();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventId]); // Retirer getEventById du tableau de dépendances

    return (
        <div className="event-modal">
            <div className="event-modal-content">
                <button onClick={closeModal}>Close</button>
                {event ? (
                    <>
                        <p>Event id: {event.id}</p>
                        <p>Title: {event.title}</p>
                        <p>Description: {event.description}</p>
                        <p>Start at: {event.start_at}</p>
                        <p>Participant limit: {event.participantLimit}</p>
                        <p>Category: {event.category.title}</p>
                        <p>City: {event.city.name}</p>
                        <p>Country: {event.city.country.name}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default EventModal;