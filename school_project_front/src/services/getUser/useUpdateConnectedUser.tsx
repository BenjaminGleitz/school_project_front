import { getToken, getUserId } from "../authentication/TokenLocalStorageService.tsx";
import User from "../../types/User.tsx";
import axios from "axios";

const useUpdateConnectedUser = () => {
    const token = getToken();
    const userId = getUserId();

    return async (updatedUser: Partial<User>): Promise<User | null> => {
        try {
            if (!userId) {
                return null;
            }
            const response = await axios.patch(`http://127.0.0.1:8000/api/user/${userId}`, {
                ...updatedUser,
                favoriteCity: updatedUser.favoriteCity ? updatedUser.favoriteCity.id : null
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

export default useUpdateConnectedUser;
