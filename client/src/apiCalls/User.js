import { axiosInstance } from "./index";

export const logOutUser = async (payload) => {
    const response = await axiosInstance('post', '/api/users/logout', payload);
    return response;
}
export const getUser = async (userId) => {
    const response = await axiosInstance('get', `/api/users/user/${userId}`);
    return response;
}
export const editUserProfile = async (payload) => {
    const response = await axiosInstance('post', `/api/users/edit-profile`, payload);
    return response;
}