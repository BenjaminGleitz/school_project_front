// EventCard.tsx
import React, {useState} from "react";
import Event from "../../types/Event";
import EventModal from "./EventModal";
import "./css/eventCard.css";
import { ImLocation } from "react-icons/im";
import '@fontsource/roboto';

interface EventCardProps {
    event: Event;
    setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventCard: React.FC<EventCardProps> = ({event, setEvents}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return new Date(dateString).toLocaleString("fr-FR", options);
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
                <div className="event-card-categorie">
                    <p>{event.category.title}</p>
                </div>
                <div className="event-card-title">
                    <h2>{event.title}</h2>
                </div>
            </div>
            <div className="event-card-details">
                <div className="event-card-details-user">
                    <p>{formatDate(event.start_at)}</p>
                    <p>{event.participantLimit}</p>
                </div>
                <div className="event-card-details-location">
                    <p><ImLocation/> {event.city.country.name}, </p>
                    <p className={"city-name"}>{event.city.name}</p>
                </div>
            </div>
            {isModalOpen && <EventModal eventId={event.id} closeModal={closeModal} setEvents={setEvents}/>}
        </div>
    );
}

export default EventCard;