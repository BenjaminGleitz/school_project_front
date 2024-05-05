import {useEffect, useState} from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetEventsCreatedByCurrentUser = () => {
    const [eventsCreated, setEvents] = useState<Event[]>([]);
    const token = getToken();
    const [loading, setLoading] = useState<boolean>(true);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/event/my/events/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return { eventsCreated, loading};
}

export default useGetEventsCreatedByCurrentUser;