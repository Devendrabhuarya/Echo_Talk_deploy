import { axiosInstance } from "./index";

export const activate = async (payload) => {
    const response = await axiosInstance('post', '/api/users/activate', payload);
    return response;
}