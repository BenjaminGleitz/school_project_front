import {useEffect, useState} from "react";
import axios from 'axios';
import Country from "../../types/Country.tsx";

const useGetAllCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    const getCountries = async () => {
        try {
            const response = await axios.get('https://toogether.uno/api/country/')
            setCountries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    return { countries };
}

export default useGetAllCountries;