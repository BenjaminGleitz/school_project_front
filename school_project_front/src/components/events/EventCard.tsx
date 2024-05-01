import React, { useState } from "react";
import Event from "../../types/Event";
import EventModal from "./EventModal"; // Importez le composant du modal
import "./css/eventCard.css";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true); // Fonction pour ouvrir le modal
    };

    const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Arrête la propagation de l'événement de clic
        setIsModalOpen(false); // Ferme le modal
    };



    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        return new Date(dateString).toLocaleDateString("fr-FR", options);
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
                    <p>{event.country.name}</p>
                </div>
            </div>
            {isModalOpen && <EventModal event={event} closeModal={closeModal}/>}
        </div>
    );
}

export default EventCard;
