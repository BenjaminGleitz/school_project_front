import { getToken } from "../authentication/TokenLocalStorageService.tsx";
import Event from "../../types/Event.tsx";
import axios from "axios";

const useUpdateEvent = () => {
    const token = getToken();

    return async (eventId: number, updatedEvent: Partial<Event>): Promise<Event | null> => {
        try {
            if (!eventId) {
                return null;
            }
            const response = await axios.patch(`https://toogether.uno/api/event/${eventId}`, {
                ...updatedEvent,
                city: updatedEvent.city ? updatedEvent.city.id : null,
                category: updatedEvent.category ? updatedEvent.category.id : null
            }, {
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

export default useUpdateEvent;