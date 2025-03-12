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

// export const storeUser = async (data) => {
//     console.log('storeUser', data);
//     try {
//         const formData = new FormData();
//         for (const key in data) {
//             formData.append(key, data[key]);
//         }
//         console.log('forrrmdata', formData);
//         const response = await axiosInstance.post('/users', formData, {
//             headers: 'multipart/form-data',
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error storing user:', error);
//         throw error;
//     }
// };

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
        console.log('errorerrorerrorerror', error);
        throw error;
        // console.error('Error uploading user:', error);
        // return {
        //     error: true,
        //     msg: error.response.data.errors
        // }
    }
};
