// tokenUtils.js
import axiosInstance from '@api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const generateToken = async () => {
    try {
        const response = await axiosInstance.post('/user/generate-token');
        const token = response.data.token;
        await AsyncStorage.setItem('jwtToken', token);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

export const validateToken = async () => {
    try {
        const response = await axiosInstance.get('/user/validateToken');
        return response.data;
    } catch (error) {
        console.error('Error validating token:', error);
        throw error;
    }
};
