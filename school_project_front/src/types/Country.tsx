import City from "./City.tsx";

interface Country {
    id: number;
    name: string;
    cities: City[];
}

export default Country;
