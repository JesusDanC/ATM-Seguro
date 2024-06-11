import api from '../lib/axios';

export const login = async (nombre, pin) => {
    try {
        const response = await api.post('/login', { nombre, pin });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const verifyToken = async (token) => {
    try {
        const response = await api.get('/token', {
            headers: { 'token': token }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
