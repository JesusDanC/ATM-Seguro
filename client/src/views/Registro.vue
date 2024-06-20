<script>
import { ref } from 'vue';
import { UsuariosStore } from '../stores/usuario.js';

export default {
  setup() {
    const usuarioStore = UsuariosStore();
    const nombre = ref('');
    const pin = ref('');
    
    const AgregarUsuario = () => {
      const usuario = { 
        nombre: nombre.value, 
        pin: pin.value
      };
      usuarioStore.createUser(usuario);
      nombre.value = '';
      pin.value = ''
    };

    return {
      nombre,
      pin,
      AgregarUsuario
    };
  }
};

</script>

<template>
  <form name="login-form" class="login-form"  @submit.prevent="AgregarUsuario">  
          <h3>Registro</h3>
          <div class="mb-3">
                <label for="Nombre" class="login-label">Nombre</label>
                <input class="login-input" id="Nombre" type="text" v-model="nombre" placeholder="Nombre" required>
            </div>
          <div class="mb-3"> 
                <label for="Pin" class="login-label">Pin</label>
                <input class="login-input" id="Pin" type="password" v-model="pin" placeholder="Pin" required/>
          </div>

          <button class="login-button btn btn-outline-dark" type="submit">
            Registrarse
          </button>
        
          <RouterLink class="create-account" to="/Login">Ya tengo una cuenta</RouterLink>
        </form>
</template>

<style>

</style>
