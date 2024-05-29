import {useEffect, useState} from "react";
import axios from 'axios';
import Category from "../../types/Category.tsx";
import {getToken} from "../authentication/TokenLocalStorageService.tsx";

const useGetAllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const token = getToken();

    const getCategories = async () => {
        try {
            const response = await axios.get('https://toogether.uno/api/category/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return { categories };
}

export default useGetAllCategories;