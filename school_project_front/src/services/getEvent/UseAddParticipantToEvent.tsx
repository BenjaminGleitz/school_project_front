import { useState } from "react";
import axios, { AxiosError } from 'axios'; // Importez AxiosError pour obtenir un type sûr pour les erreurs Axios
import { getToken } from "../authentication/TokenLocalStorageService.tsx";

const useAddParticipantToEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<unknown> | null>(null); // Ajustez le type de l'erreur
    const token = getToken();

    const addParticipantToEvent = async (eventId: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/event/${eventId}/participate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                setError(error);
            }
            console.error("Error adding participant to event:", error);
            throw error;
        }
    };

    return { addParticipantToEvent, loading, error };
}

export default useAddParticipantToEvent;
