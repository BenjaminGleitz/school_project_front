import axios from 'axios';
import Event from "../../types/Event.tsx";
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

const useGetOneEvent = (): ((eventId: number) => Promise<{ event: Event | null, loading: boolean }>) => {
    const token = getToken();

    return async (eventId: number): Promise<{ event: Event | null, loading: boolean }> => {
        let loading = true;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loading = false;
            return { event: response.data, loading };
        } catch (error) {
            console.error(error);
            loading = false;
            return { event: null, loading };
        }
    };
}

export default useGetOneEvent;