// EventCard.tsx
import React, { useState } from "react";
import Event from "../../types/Event";
import EventModal from "./EventModal";
import "./css/eventCard.css";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour formater la date de l'événement
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        return new Date(dateString).toLocaleDateString("fr-FR", options);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log("close modal");
        setIsModalOpen(false);
    };

    return (
        <div className="event-card" onClick={openModal}>
            <div className="event-card-main-info">
                <h2>{event.title}</h2>
                <p>{event.category.title}</p>
            </div>
            <div className="event-card-details">
                <div className="event-card-details-user">
                    <p>{formatDate(event.start_at)}</p>
                    <p>{event.participantLimit}</p>
                </div>
                <div className="event-card-details-location">
                <p>{event.city.name}</p>
                    <p>{event.city.country.name}</p>
                </div>
            </div>
            {isModalOpen && <EventModal eventId={event.id} closeModal={closeModal}/>}
        </div>
    );
}

export default EventCard;