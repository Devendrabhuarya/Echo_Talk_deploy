import axios from "axios";
import { axiosInstance } from './index'
const api = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// Interceptors
api.interceptors.response.use(
    (config) => {
        console.log('config');
        return config;
    },
    async (error) => {
        console.log('config');
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);