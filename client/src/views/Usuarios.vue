<script>
import api from '../lib/axios'

export default {
  data() {
    return {
      nombre: '',
      pin: '',
      DatosRecibidos: []
    };
  },
  methods: {
    async SubirDatos() {
      try {
        const response = await api.post('/usuarios', {
          nombre: this.nombre,
          pin: this.pin
        });
        console.log(response.data);
      } catch (error) {
        console.error('Hubo un error:', error);
      }
    },
    async RecibirDatos() {
      try {
        const response = await api.get('/usuarios'); 
        this.DatosRecibidos = response.data;
        

      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    }
  },
  mounted() {
    this.RecibirDatos(); 
  }
};

</script>

<template>
    <br>
    <div class="container">
        <form @submit.prevent="SubirDatos">
            <input type="text" v-model="nombre" placeholder="Nombre" />
            <input type="text" v-model="pin" placeholder="Pin" />
            <button type="submit">Enviar</button>
        </form>
    </div>

    <br>

    <h2>Datos Obtenidos:</h2>
        
    <div class="container ">
        <div class="col">
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del usuario</th>
                    <th scope="col">Role del usuario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(usuario, index) in DatosRecibidos" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.role }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<style>

</style>