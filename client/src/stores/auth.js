import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, verifyToken } from '../services/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null);
    const error = ref(null);

    const loginUser = async (nombre, pin) => {
        try {
            const data = await login(nombre, pin);
            user.value = data.usuario_buscado;
            token.value = data.token;
            localStorage.setItem('token', data.token);
            error.value = null;
        } catch (err) {
            error.value = err.mensaje || 'Error al iniciar sesión';
        }
    };

    const checkAuth = async () => {
        if (token.value) {
            try {
                const data = await verifyToken(token.value);
                user.value = data.usuario;
            } catch (err) {
                token.value = null;
                localStorage.removeItem('token');
                user.value = null;
            }
        }
    };

    return {
        user,
        token,
        error,
        loginUser,
        checkAuth
    };
});
