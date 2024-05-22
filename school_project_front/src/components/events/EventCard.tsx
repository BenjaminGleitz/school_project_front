import React, {useState} from "react";
import Event from "../../types/Event";
import EventModal from "./EventModal";
import "./css/eventCard.css";
import {ImLocation} from "react-icons/im";
import '@fontsource/roboto';
import { MdOutlineCalendarMonth } from "react-icons/md";

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

        return new Date(dateString).toLocaleString("en-EN", options);
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
                    <p> { event.category.title } </p>
                </div>
            </div>
            <div className="event-card-details">
                <div className="event-card-details-user">
                    <h2>{event.title}</h2>
                    <p><MdOutlineCalendarMonth /> {formatDate(event.start_at)}</p>
                    <p><ImLocation/> {event.city.country.name}, {event.city.name}</p>
                </div>
                <div className="event-card-details-location">
                    <p>{event.participant?.length ?? 0} out of {event.participantLimit} people</p>
                </div>
            </div>
            {isModalOpen && <EventModal eventId={event.id} closeModal={closeModal} setEvents={setEvents}/>}
        </div>
    );
}

export default EventCard;
