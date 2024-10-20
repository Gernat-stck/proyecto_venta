import { useState } from 'react';
import axios from 'axios';

// Creamos una función que devuelve una instancia de Axios configurada
const createAxiosInstance = () => {
    const apiUrl = import.meta.env.VITE_URL_BASE;

    return axios.create({
        baseURL: apiUrl, // URL base para todas las solicitudes
        timeout: 5000, // Tiempo de espera para las solicitudes (en milisegundos)
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        withCredentials: true, // Aseguramos que las credenciales se envíen

    });
};

// Hook personalizado para manejar solicitudes DELETE
const useDeleteRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authToken = localStorage.getItem("token");


    const deleteData = async (url) => {
        setLoading(true);
        try {
            const axiosInstance = createAxiosInstance();
            await axiosInstance.delete(url, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return { deleteData, loading, error };
};

export default useDeleteRequest;
