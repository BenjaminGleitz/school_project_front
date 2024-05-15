import {useEffect, useState} from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetAllEventsByFavoriteCityOfCurrentUser = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const token = getToken();
    const [loading, setLoading] = useState<boolean>(true);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/event/my/favorite-city/events', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const sortedEvents = response.data.sort((a: Event, b: Event) => {
                return new Date(a.start_at).getTime() - new Date(b.start_at).getTime();
            });
            setEvents(sortedEvents);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return { events, loading};
}

export default useGetAllEventsByFavoriteCityOfCurrentUser;