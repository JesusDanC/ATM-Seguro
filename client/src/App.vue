<script>
export default {
  data() {
    return {
      nombre: '',
      pin: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: this.nombre,
            pin: this.pin,
          }),
        });
        const data = await response.json();
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
  },
};

</script>

<template>
  <div class="container">
    <center><h1>Login</h1></center>
    <form >
      <input
        v-model="nombre"
        type="text"
        class="form-control my-2"
        placeholder="nombre"

      />
      <input
        v-model="pin"
        type="text"
        class="form-control my-2"
        placeholder="pin"

      />
      <center><button @click.prevent="login">Iniciar sesión</button></center>
    </form>
  </div>
</template>

<style>

</style>
