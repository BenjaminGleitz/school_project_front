import {useEffect, useState} from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";

const useGetAllEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/event/');
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return { events };
}

export default useGetAllEvents;