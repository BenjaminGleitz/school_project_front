import React, { createContext, useContext, useEffect, useState } from "react";
import useGetConnectedUser from "../services/getUser/useGetConnectedUser.tsx";
import User from "../types/User.tsx";

interface UserProviderProps {
    children: React.ReactNode; // Définissez le type de la propriété children
}

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await useGetConnectedUser()();
                setCurrentUser(user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
};
