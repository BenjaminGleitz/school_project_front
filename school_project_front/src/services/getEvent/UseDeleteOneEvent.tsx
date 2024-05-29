import axios from 'axios';
import { getToken } from "../authentication/TokenLocalStorageService";

const useDeleteOneEvent = (): ((eventId: number) => Promise<{ success: boolean, message: string }>) => {
    const token = getToken();

    return async (eventId: number): Promise<{ success: boolean, message: string }> => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return { success: true, message: 'Event deleted successfully' };
        } catch (error: any) {
            console.error('Error deleting event:', error);
            window.location.href = "/login";
            return { success: false, message: error.response?.data?.error || 'Error deleting event' };
        }
    };
}

export default useDeleteOneEvent;
