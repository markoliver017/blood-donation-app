import axiosInstance from '@api/axiosInstance';

export const getAllRoles = async () => {
    try {
        const response = await axiosInstance.get('/roles');
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
