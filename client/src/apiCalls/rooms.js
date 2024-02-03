import { axiosInstance } from "./index";

export const createRoom = async (payload) => {
    const response = await axiosInstance('post', '/api/users/room', payload);
    return response;
}
export const getAllRoom = async (payload) => {
    const response = await axiosInstance('get', '/api/users/room', payload);
    return response;
}

export const getRoom = async (roomId) => {
    const response = await axiosInstance('get', `/api/users/room/${roomId}`, roomId);
    return response;
}