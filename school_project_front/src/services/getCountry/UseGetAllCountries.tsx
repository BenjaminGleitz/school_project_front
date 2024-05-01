import {useEffect, useState} from "react";
import axios from 'axios';
import Country from "../../types/Country.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetAllCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const token = getToken();

    const getCountries = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/country/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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