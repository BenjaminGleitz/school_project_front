import { useState, useCallback } from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

type Filters = {
    country: string; // Obligatoire
    city?: string;
    category?: string;
    date?: string;
}

const useGetEventsFiltered = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const token = getToken();
    const [loading, setLoading] = useState<boolean>(true);

    const getFilteredEvents = useCallback(async (filters: Filters) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/event/filter/event', filters, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEvents(response.data);
            console.log("response.data : ", response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    }, [token]);

    return { events, loading, getFilteredEvents };
}

export default useGetEventsFiltered;