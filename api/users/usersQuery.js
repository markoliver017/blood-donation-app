import axiosInstance from '@api/axiosInstance';
import axios from 'axios';

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const storeUser = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const response = await axiosInstance({
            method: 'post',
            url: '/users',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('store user success', response);
        return {
            error: false,
            msg: 'New User has been successfully created!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (user_id, data) => {
    try {
        const response = await axiosInstance({
            method: 'put',
            url: `/users/${user_id}`,
            data: data,
        });
        return {
            error: false,
            msg: 'User has been successfully updated!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const updateUserPhoto = async (user_id, data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axiosInstance({
            method: 'put',
            url: `/users/${user_id}/files`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return {
            error: false,
            msg: response.data.message,
            filePath: response.data.filePath,
        };
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (user_id) => {
    try {
        const response = await axiosInstance({
            method: 'delete',
            url: `/users/${user_id}`,
        });
        console.log('handleUserDeletion success', response);
        return {
            error: false,
            msg: 'User has been successfully deleted!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};
