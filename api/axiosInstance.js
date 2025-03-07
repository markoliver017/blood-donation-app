import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateToken, validateToken } from '@api/auth';
// import { API_TOKEN } from '@env';
const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCMSwiZW1haWwiOiJ0ZXN0dXNlckBlbWFpbC5jb20iLCJpYXQiOjE3NDEzMTkzNDV9.v4MpFMXNq7L7USZm8ZGrxKLEEDXbVV_uSf-ldkJRmUM';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // const token = await AsyncStorage.getItem('API_TOKEN');
        const token = API_TOKEN;
        console.log('API_TOKEN:', API_TOKEN);
        if (token) {
            config.headers.Authorization = `${API_TOKEN}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
