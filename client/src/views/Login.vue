<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const nombre = ref('');
    const pin = ref('');
    const { error, loginUser } = authStore;

    const handleSubmit = async () => {
      await loginUser(nombre.value, pin.value);
    };

    return {
      nombre,
      pin,
      error,
      handleSubmit
    };
  }
};
</script>

<template>
    <div class="container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleSubmit">
        <div>
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nombre" id="nombre" required>
        </div>
        <div>
            <label for="pin">PIN:</label>
            <input type="password" v-model="pin" id="pin" required>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p v-if="error">{{ error }}</p>

        </form>
    </div>
</template>

<style>

</style>
