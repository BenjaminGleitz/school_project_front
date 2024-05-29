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
            const response = await axios.get('https://toogether.uno/api/event/my/events/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sortedEvents = response.data.sort((a: Event, b: Event) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setEvents(sortedEvents);
        } catch (error) {
            console.error(error);
            window.location.href = "/login";
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
