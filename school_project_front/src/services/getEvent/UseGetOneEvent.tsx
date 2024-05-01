import axios from 'axios';
import Event from "../../types/Event.tsx";
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

const useGetOneEvent = (): ((eventId: number) => Promise<Event | null>) => {
    const token = getToken();

    return async (eventId: number): Promise<Event | null> => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}

export default useGetOneEvent;
