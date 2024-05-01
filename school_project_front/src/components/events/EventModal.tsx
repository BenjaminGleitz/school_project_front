import React, { useEffect, useState } from "react";
import "./css/eventModal.css";
import useGetOneEvent from "../../services/getEvent/UseGetOneEvent.tsx";
import Event from "../../types/Event";
import { getUserId } from "../../services/authentication/TokenLocalStorageService";
import useAddParticipantToEvent from "../../services/getEvent/UseAddParticipantToEvent.tsx";
import useRemoveParticipantFromEvent from "../../services/getEvent/UseRemoveParticipantFromEvent";

interface EventModalProps {
    eventId: number;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EventModal: React.FC<EventModalProps> = ({ eventId, closeModal }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [isParticipant, setIsParticipant] = useState(false); // Indicateur pour savoir si l'utilisateur est un participant
    const [isCreator, setIsCreator] = useState(false); // Indicateur pour savoir si l'utilisateur est le créateur de l'événement
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
            await addParticipantToEvent(eventId); // Appeler la fonction pour ajouter l'utilisateur à l'événement
            setIsParticipant(true);
            console.log('User joined event successfully');
        } catch (error) {
            console.error('Error joining event:', error);
        }
    };

    const handleLeaveEvent = async () => {
        // Supprimer l'utilisateur de la liste des participants de l'événement
        try {
            await removeParticipantFromEvent(eventId); // Appeler la fonction pour supprimer l'utilisateur de l'événement
            setIsParticipant(false);
            console.log('User left event successfully');
        } catch (error) {
            console.error('Error leaving event:', error);
        }
    };

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
                        <p>Participant limit: {event.participantLimit !== null && event.participantLimit}</p>
                        <p>Category: {event.category.title}</p>
                        <p>City: {event.city.name}</p>
                        <p>Country: {event.city.country.name}</p>
                        {/* Afficher les boutons uniquement si l'utilisateur n'est pas le créateur de l'événement */}
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
