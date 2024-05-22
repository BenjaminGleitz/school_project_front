import React, {useEffect, useState} from "react";
import "./css/eventModal.css";
import useGetOneEvent from "../../services/getEvent/UseGetOneEvent.tsx";
import Event from "../../types/Event";
import {getUserId} from "../../services/authentication/TokenLocalStorageService";
import useAddParticipantToEvent from "../../services/getEvent/UseAddParticipantToEvent.tsx";
import useRemoveParticipantFromEvent from "../../services/getEvent/UseRemoveParticipantFromEvent";
import Message from "../messages/Message.tsx";
import Loader from "../loader/Loader.tsx";
import useGetEventParticipants from "../../services/getEvent/UseGetEventParticipants.tsx";
import User from "../../types/User";
import {MdDateRange} from "react-icons/md";
import {ImLocation} from "react-icons/im";
import useDeleteOneEvent from "../../services/getEvent/UseDeleteOneEvent.tsx";

interface EventModalProps {
    eventId: number;
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
    setEvents?: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventModal: React.FC<EventModalProps> = ({eventId, closeModal, setEvents}) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isParticipant, setIsParticipant] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
    const [participants, setParticipants] = useState<User[] | null>(null);
    const [showParticipants, setShowParticipants] = useState(false);
    const getEventById = useGetOneEvent();
    const userIdFromToken = getUserId();
    const {addParticipantToEvent} = useAddParticipantToEvent();
    const {removeParticipantFromEvent} = useRemoveParticipantFromEvent();
    const getEventParticipants = useGetEventParticipants();
    const deleteOneEvent = useDeleteOneEvent();

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData.event);

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
            setLoading(false);
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

        return new Date(dateString).toLocaleString("en-EN", options);
    };

    const handleJoinEvent = async () => {
        try {
            await addParticipantToEvent(eventId);
            setIsParticipant(true);
            setMessage({type: "success", text: "You have successfully joined the event."});
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } catch (error) {
            console.error('Error joining event:', error);
            setMessage({type: "error", text: "Error joining the event. Please try again later."});
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    };

    const handleLeaveEvent = async () => {
        try {
            await removeParticipantFromEvent(eventId);
            setIsParticipant(false);
            setMessage({type: "success", text: "You have successfully left the event."});
            if (setEvents) {
                setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            }
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        } catch (error) {
            console.error('Error leaving event:', error);
            setMessage({type: "error", text: "Error leaving the event. Please try again later."});
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    };

    const handleGetEventParticipants = async () => {
        try {
            const {participants} = await getEventParticipants(eventId);
            if (participants) {
                setParticipants(participants);
                setShowParticipants(true);
            } else {
                setMessage({type: "error", text: "Error getting participants."});
            }
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error getting participants:', error);
            setMessage({type: "error", text: "Error getting participants. Please try again later."});
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }

    const handleBackToEventDetails = () => {
        setShowParticipants(false);
    }

    const handleDeleteEvent = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");
        if (!confirmDelete) {
            return; // If the user cancels, do nothing
        }

        try {
            const { success, message } = await deleteOneEvent(eventId);
            if (success) {
                setMessage({ type: "success", text: message });
                if (setEvents) {
                    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
                }
            } else {
                setMessage({ type: "error", text: message });
            }
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error deleting event:', error);
            setMessage({ type: "error", text: "Error deleting the event. Please try again later." });
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };


    return (
        <div className="event-modal">
            <div className="event-modal-content">
                {isCreator && <button className={"deleteButton"} onClick={handleDeleteEvent}>Delete</button>}
                <button className={"closeButton"} onClick={closeModal}>Close</button>
                {message && <Message type={message.type} text={message.text}/>}
                {loading ? (
                    <Loader/>
                ) : showParticipants ? (
                    <>
                        <button onClick={handleBackToEventDetails}>Back to Event Details</button>
                        <h2>Participants</h2>
                        {participants && participants.length > 0 ? (
                            <ul>
                                {participants.map(participant => (
                                    <li key={participant.id}>{participant.firstname} {participant.lastname}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No participants found.</p>
                        )}
                    </>
                ) : event ? (
                    <>
                        <div className="event-modal-title">
                            <div className="eventCategory">
                                <p>{event.category.title}</p>
                            </div>
                            <div className="eventTitle">
                                <h2>{event.title}</h2>
                            </div>
                        </div>
                        <div className="eventDescription">
                            <p>{event.description}</p>
                            <p><MdDateRange/> {formatDate(event.start_at)}</p>
                            <p><ImLocation/> {event.city.country.name}, </p>
                            <p>{event.city.name}</p>
                            <p>Created by {event.creator.firstname} {event.creator.lastname}</p>
                            <p>Participant limit: {event.participantLimit !== null && event.participantLimit}</p>
                            {isCreator && <p>You are the event's creator.</p>}
                        </div>
                        {isCreator &&
                            <button className={"updateEventButton"} onClick={() => {
                                window.location.href = `/update-event/${eventId}`;
                            }}>Edit Event
                            </button>
                        }
                        <button className={"showParticipantsButton"} onClick={handleGetEventParticipants}>Show
                            Participants
                        </button>

                        {!isCreator && (
                            <>
                                {isParticipant ? (
                                    <button className={"leaveButton"} onClick={handleLeaveEvent}>Leave Event</button>
                                ) : (
                                    <>
                                        {event.participantLimit !== null && event.participant.length >= event.participantLimit && !isParticipant ? (
                                            <p>Sorry, this event is full.</p>
                                        ) : (
                                            <button className={"joinButton"} onClick={handleJoinEvent}>Join
                                                Event</button>
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
