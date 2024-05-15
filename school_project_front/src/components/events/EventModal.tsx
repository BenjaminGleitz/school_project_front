// EventModal.tsx
import React, { useEffect, useState } from "react";
import "./css/eventModal.css";
import useGetOneEvent from "../../services/getEvent/UseGetOneEvent.tsx";
import Event from "../../types/Event";
import { getUserId } from "../../services/authentication/TokenLocalStorageService";
import useAddParticipantToEvent from "../../services/getEvent/UseAddParticipantToEvent.tsx";
import useRemoveParticipantFromEvent from "../../services/getEvent/UseRemoveParticipantFromEvent";
import Message from "../messages/Message.tsx";
import Loader from "../loader/Loader.tsx";

interface EventModalProps {
    eventId: number;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventModal: React.FC<EventModalProps> = ({ eventId, closeModal, setEvents }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Set initial loading state to true
    const [isParticipant, setIsParticipant] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const getEventById = useGetOneEvent();
    const userIdFromToken = getUserId();
    const { addParticipantToEvent } = useAddParticipantToEvent();
    const { removeParticipantFromEvent } = useRemoveParticipantFromEvent();

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true); // Set loading to true before fetching the event
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData.event); // set the event state to eventData.event instead of eventData

                if (userIdFromToken === eventData.event?.creator.id) {
                    setIsCreator(true);
                } else {
                    setIsCreator(false);
                }

                if (userIdFromToken && eventData.event?.participant.some(participant => participant.id === userIdFromToken)) {
                    setIsParticipant(true);
                } else {
                    setIsParticipant(false);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
            setLoading(false); // Set loading to false after fetching the event
        };

        fetchEvent();
    }, [eventId]);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        };

        return new Date(dateString).toLocaleString("fr-FR", options);
    };

    const handleJoinEvent = async () => {
        try {
            await addParticipantToEvent(eventId);
            setIsParticipant(true);
            setMessage({ type: "success", text: "You have successfully joined the event." });
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error joining event:', error);
            setMessage({ type: "error", text: "Error joining the event. Please try again later." });
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    const handleLeaveEvent = async () => {
        try {
            await removeParticipantFromEvent(eventId);
            setIsParticipant(false);
            setMessage({ type: "success", text: "You have successfully left the event." });
            if (setEvents) {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            }
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error leaving event:', error);
            setMessage({ type: "error", text: "Error leaving the event. Please try again later." });
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    return (
        <div className="event-modal">
            <div className="event-modal-content">
                <button onClick={closeModal}>Close</button>
                {message && <Message type={message.type} text={message.text} />}
                {loading ? (
                    <Loader />
                ) : event ? (
                    <>
                        <p>Event id: {event.id}</p>
                        <p>Title: {event.title}</p>
                        <p>Description: {event.description}</p>
                        <p>commence le : {formatDate(event.start_at)}</p>
                        <p>Participant limit: {event.participantLimit !== null && event.participantLimit}</p>
                        <p>Category: {event.category.title}</p>
                        <p>City: {event.city.name}</p>
                        <p>Country: {event.city.country.name}</p>
                        <p>Creator: {event.creator.email}</p>
                        <p>{formatDate(event.createdAt)}</p>
                        {isCreator && <p>You are the event's creator.</p>}
                        {isCreator &&
                            <button onClick={() => {
                                window.location.href = `/update-event/${eventId}`;
                            }}>Edit Event</button>
                        }

                        {!isCreator && (
                            <>
                                {isParticipant ? (
                                    <button onClick={handleLeaveEvent}>Leave Event</button>
                                ) : (
                                    <>
                                        {event.participantLimit !== null && event.participant.length >= event.participantLimit && !isParticipant ? (
                                            <p>Sorry,this event is full.</p>
                                        ) : (
                                            <button onClick={handleJoinEvent}>Join Event</button>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <p>Unable to load event.</p>
                )}
            </div>
        </div>
    );
}

export default EventModal;