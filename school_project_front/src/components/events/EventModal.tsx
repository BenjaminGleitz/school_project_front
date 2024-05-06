// EventModal.tsx
import React, { useEffect, useState } from "react";
import "./css/eventModal.css";
import useGetOneEvent from "../../services/getEvent/UseGetOneEvent.tsx";
import Event from "../../types/Event";
import { getUserId } from "../../services/authentication/TokenLocalStorageService";
import useAddParticipantToEvent from "../../services/getEvent/UseAddParticipantToEvent.tsx";
import useRemoveParticipantFromEvent from "../../services/getEvent/UseRemoveParticipantFromEvent";
import Message from "../messages/Message.tsx";

interface EventModalProps {
    eventId: number;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventModal: React.FC<EventModalProps> = ({ eventId, closeModal, setEvents }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [isParticipant, setIsParticipant] = useState(false); // Indicateur pour savoir si l'utilisateur est un participant
    const [isCreator, setIsCreator] = useState(false); // Indicateur pour savoir si l'utilisateur est le créateur de l'événement
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null); // État pour gérer les messages de succès ou d'erreur
    const getEventById = useGetOneEvent();
    const userIdFromToken = getUserId();
    const { addParticipantToEvent } = useAddParticipantToEvent();
    const { removeParticipantFromEvent } = useRemoveParticipantFromEvent();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);

                // Vérifier si l'utilisateur actuel est le créateur de l'événement
                if (userIdFromToken === eventData?.creator.id) {
                    setIsCreator(true);
                } else {
                    setIsCreator(false);
                }

                // Vérifier si l'utilisateur est un participant de l'événement
                if (userIdFromToken && eventData?.participant.some(participant => participant.id === userIdFromToken)) {
                    setIsParticipant(true);
                } else {
                    setIsParticipant(false);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventId]);

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
                {message && <Message type={message.type} text={message.text} />} {/* Afficher le message */}
                {event ? (
                    <>
                        <p>Event id: {event.id}</p>
                        <p>Title: {event.title}</p>
                        <p>Description: {event.description}</p>
                        <p>Start at: {event.start_at}</p>
                        <p>Participant limit: {event.participantLimit !== null && event.participantLimit}</p>
                        <p>Category: {event.category.title}</p>
                        <p>City: {event.city.name}</p>
                        <p>Country: {event.city.country.name}</p>
                        {!isCreator && (
                            <>
                                {isParticipant ? (
                                    <button onClick={handleLeaveEvent}>Leave Event</button>
                                ) : (
                                    <>
                                        {event.participantLimit !== null && event.participant.length >= event.participantLimit && !isParticipant ? (
                                            <p>Sorry, event is full.</p>
                                        ) : (
                                            <button onClick={handleJoinEvent}>Join Event</button>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default EventModal;