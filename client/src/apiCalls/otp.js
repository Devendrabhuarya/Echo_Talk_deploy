import { axiosInstance } from "./index";

export const sendOtp = async (payload) => {
    const response = await axiosInstance('post', '/api/users/phone', payload);
    return response;
}

export const verifyOtp = async (payload) => {
    const response = await axiosInstance('post', '/api/users/verify', payload);
    return response;
}

