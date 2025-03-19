import axiosInstance from '@api/axiosInstance';

export const getAllRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const storeRole = async (data) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: '/roles',
            data: data,
        });
        console.log('store roles success', response);
        return {
            error: false,
            msg: 'New Role has been successfully created!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (role_id, data) => {
    try {
        const response = await axiosInstance({
            method: 'put',
            url: `/roles/${role_id}`,
            data: data,
        });
        return {
            error: false,
            msg: 'Role has been successfully updated!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};
