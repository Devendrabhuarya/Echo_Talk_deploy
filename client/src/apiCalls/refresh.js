import { axiosInstance } from "./index";

export const refresh = async (payload) => {
    const response = await axiosInstance('get', '/api/users/refresh', payload);
    return response;
}