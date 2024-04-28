import {useEffect, useState} from "react";
import axios from 'axios';
import Event from "../../types/Event.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetAllEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const token = getToken();

    const getEvents = async () => {
        try {
            console.log(token)
            const response = await axios.get('http://127.0.0.1:8000/api/event/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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