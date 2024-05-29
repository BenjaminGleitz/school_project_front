import {jwtDecode} from "jwt-decode";
import User from "../../types/User.tsx";

const TOKEN_KEY = 'authToken';

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getUser = (): User | null => {
    const token = getToken();
    if (!token) {
        return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.username;
}

export const getUserId = (): number | null => {
    const token = getToken();
    if (!token) {
        return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.id;
};