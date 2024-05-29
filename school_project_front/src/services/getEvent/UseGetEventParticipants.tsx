import axios from 'axios';
import User from "../../types/User.tsx";
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

const useGetEventParticipants = (): (eventId: number) => Promise<{ participants: User[] | null, loading: boolean }> => {
    const token = getToken();

    return async (eventId: number): Promise<{ participants: User[] | null, loading: boolean }> => {
        let loading = true;
        try {
            const response = await axios.get(`https://toogether.uno/api/event/${eventId}/participants`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loading = false;
            return { participants: response.data, loading };
        } catch (error) {
            console.error(error);
            loading = false;
            return { participants: null, loading };
        }
    };
}

export default useGetEventParticipants;
