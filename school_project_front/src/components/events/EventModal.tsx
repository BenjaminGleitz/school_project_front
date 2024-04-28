import React from "react";
import Event from "../../types/Event";
import "./css/eventModal.css";

interface EventModalProps {
    event: Event;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, closeModal }) => {
    return (
        <div className="event-modal">
            <div className="event-modal-content">
                <h2>{event.title}</h2>
                <p>{event.category.title}</p>
                <p>{event.start_at}</p>
                <p>{event.participantLimit}</p>
                <p>{event.city.name}</p>
                <p>{event.country.name}</p>
                <button onClick={closeModal}>Fermer</button> {/* Bouton pour fermer le modal */}
            </div>
        </div>
    );
};

export default EventModal;
