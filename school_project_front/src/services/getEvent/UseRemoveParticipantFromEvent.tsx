import { useState } from "react";
import axios, { AxiosError } from 'axios';
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

const useRemoveParticipantFromEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<unknown> | null>(null);
    const token = getToken();

    const removeParticipantFromEvent = async (eventId: number) => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`http://127.0.0.1:8000/api/event/${eventId}/remove-participation`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLoading(false);
            console.log("Participant removed successfully");
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
            }
            console.error("Error removing participant from event:", error);
            throw error;
        }
    };

    return { removeParticipantFromEvent, loading, error };
}

export default useRemoveParticipantFromEvent;
