import { getToken } from "../authentication/TokenLocalStorageService.tsx";
import axios from "axios";

const useCreateEvent = () => {
    const token = getToken();

    return async (eventData: {
        title: string;
        description?: string;
        start_at: string;
        city_id: number;
        category_id: number;
        participantLimit: number;
    }): Promise<any> => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/event/`, eventData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
}

export default useCreateEvent;
