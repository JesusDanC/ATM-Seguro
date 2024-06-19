import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login } from '../services/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const token = ref(localStorage.getItem('token') || null);
    const error = ref(null);

    const saveUser = async (userToSave) => {
        localStorage.setItem('user', JSON.stringify(userToSave));
    }

    const loginUser = async (nombre, pin) => {
        try {
            const data = await login(nombre, pin);
            
            console.log(data.user)
            console.log(data.token)
 
            user.value = data.user;
            saveUser(data.user);

            localStorage.setItem('token', data.token);
            error.value = null;
        } catch (err) {
            error.value = err.mensaje || 'Error al iniciar sesión';
        }
    };

    const Logout = async () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    return {
        user,
        token,
        error,
        loginUser,
        Logout
    };
});
