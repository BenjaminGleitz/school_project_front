import City from "./City.tsx";

interface User {
    id: number;
    email: string;
    gender: string;
    nationality: string;
    birthdate: string;
    roles: string[];
    eventsCreated: Event[];
    events: Event[];
    firstname: string;
    lastname: string;
    createdAt: string;
    updatedAt: string | null;
    favoriteCity: City | null;
    image: string | null;
    description: string | null;
}

export default User;