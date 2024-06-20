import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login } from '../services/auth';
import { BitacoraStore } from './bitacora.js'

export const useAuthStore = defineStore('auth', () => {
    const bitacorasStore = BitacoraStore();
    const user = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const token = ref(localStorage.getItem('token') || null);
    const bitacora = ref(localStorage.getItem('bitacora') ? JSON.parse(localStorage.getItem('bitacora')) : null);
    const error = ref(null);

    const loginUser = async (nombre, pin) => {
        try {
            const data = await login(nombre, pin);
 
            user.value = data.user;

            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            
            error.value = null;

            const bitacora_creada = await bitacorasStore.create(nombre);
            console.log(bitacora_creada)

            bitacora.value = bitacora_creada;
            
            localStorage.setItem('bitacora', JSON.stringify(bitacora_creada)); 

        } catch (err) {
            error.value = err.mensaje || 'Error al iniciar sesión';
        }
    };

    const Logout = async () => {
        bitacorasStore.update(bitacora.value.codigo)
        user.value = null;
        token.value = null;
        bitacora.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('bitacora');
    }

    return {
        user,
        token,
        error,
        loginUser,
        Logout
    };
});
