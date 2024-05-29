import {getToken, getUserId} from "../authentication/TokenLocalStorageService.tsx";
import User from "../../types/User.tsx";
import axios from "axios";

const useGetConnectedUser = () => {
    const token = getToken();
    const userId = getUserId();

    return async (): Promise<User | null> => {
        try {
            if (!userId) {
                return null;
            }
            const response = await axios.get(`https://toogether.uno/api/user/${userId}`, {
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

export default useGetConnectedUser;