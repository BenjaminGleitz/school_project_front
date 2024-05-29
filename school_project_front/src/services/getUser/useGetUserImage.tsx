import axios from 'axios';
import { getToken } from "../authentication/TokenLocalStorageService";

const useGetUserImage = (): ((userId: number) => Promise<{ imageUrl: string | null, loading: boolean }>) => {
    const token = getToken();

    return async (userId: number): Promise<{ imageUrl: string | null, loading: boolean }> => {
        let loading = true;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/image`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            loading = false;
            return { imageUrl: response.data, loading };
        } catch (error) {
            console.error(error);
            loading = false;
            return { imageUrl: null, loading };
        }
    };
}

export default useGetUserImage;
