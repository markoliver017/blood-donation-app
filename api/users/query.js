import axiosInstance from '@api/axiosInstance';
import axios from 'axios';

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const storeUser = async (data) => {
    console.log('storeUser', data);
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        console.log('forrrmdata', formData);
        const response = await axiosInstance.post('/users', formData, {
            headers: 'multipart/form-data',
        });
        return response.data;
    } catch (error) {
        console.error('Error storing user:', error);
        throw error;
    }
};

export const storeUser1 = async (data) => {
    console.log('uploadUserssss', data);
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        console.log('forrrmdata', formData);
        const response = await axiosInstance({
            method: 'post',
            // baseURL: 'http://localhost:5000',
            url: '/users',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading user:', error);
        throw error;
    }
};
