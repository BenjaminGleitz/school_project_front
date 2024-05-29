import {useEffect, useState} from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetAllEventsByFavoriteCityOfCurrentUser = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const token = getToken();
    const [loading, setLoading] = useState<boolean>(true);

    const getEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://toogether.uno/api/event/my/favorite-city/events', {
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
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return { events, loading, refetch: getEvents };
}

export default useGetAllEventsByFavoriteCityOfCurrentUser;
