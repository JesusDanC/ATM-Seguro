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
      router.push('/Home')
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
    <form class="login-form"  @submit.prevent="handleSubmit">  
          <h3>Login</h3>
          <div class="mb-3" >
            <label class="login-label" for="name">Nombre</label>
            <input class="login-input" id="name" type="text" v-model="nombre" placeholder="Nombre" required/>
          </div>
          <div class="mb-3">
            <label class="login-label" for="pin">Pin</label>
            <input class="login-input" id="pin" type="password" v-model="pin" placeholder="Pin" required/>
          </div>
          <button class="login-button btn btn-outline-dark" type="submit">
            Login
          </button>
          <RouterLink class="create-account" to="/Registro">Crear cuenta</RouterLink>
          <div v-if="error" class="error-message">{{ error }}</div>
        </form>
</template>

<style>
.login-form {
  font-family:'Times New Roman', Times, serif;
  color: #ffffff;
  max-width: 400px;
  margin: 90px auto;
  padding: 60px;
  background: linear-gradient(to left, hsla(256, 73%, 51%, 0.823), #b14ff3bb);
  border-radius: 5px;
  background-size: cover;
  box-shadow: 40px 30px 50px rgba(0, 0, 0, 0.1);
}

.mb-3 {
  margin-bottom: 55px;
}

.login-label {
  display: block;
  margin-bottom: 5px;
}

.login-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif; 
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  color: rgb(34, 1, 36);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #80a7d1;
 
}

.create-account {
  position: center; 
  color: #ffffff; 
  font-weight: bold; 
  text-decoration: underline; 
}
</style>