import City from "./City.tsx";
import Country from "./Country.tsx";
import Category from "./Category.tsx";
import User from "./User.tsx";

interface Event {
    id: number;
    title: string;
    description: string | null;
    city: City;
    category: Category;
    start_at: string;
    createdAt: string;
    country: Country;
    creator: User;
    participant: User[];
    participantLimit: number | null;
}

export default Event;