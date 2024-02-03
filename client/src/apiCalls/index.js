// Import axios
import axios from "axios";

// Export your axios instance function
export const axiosInstance = async (method, endpoint, payload) => {
    try {
        console.log(payload);
        return await axios({
            method,
            url: endpoint,
            data: payload,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Access-Control-Allow-Origin":'*',
                "Accept":'*/*'
            },
        });
    } catch (error) {
        return error;
    }
};

// Define your interceptor functions
const logRequest = (config) => {
    console.log("Request data:", config.data);
    return config;
};

const logResponse = (response) => {
    console.log("Response data:", response.data);
    return response;
};

const logError = async (error) => {
    const originalRequest = error.config;
    if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._isRetry
    ) {
        originalRequest.isRetry = true;
        try {
            await axiosInstance('get', '/api/users/refresh')

            return axios.request(originalRequest);
        } catch (err) {
            console.log(err.message);
        }
    }
    throw error;
};

// Attach your interceptor functions to your axios instance
// axios.interceptors.request.use(logRequest, logError);
axios.interceptors.response.use(logResponse, logError);

