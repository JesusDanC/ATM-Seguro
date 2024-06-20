<script>
import { ref, onMounted } from 'vue';
import { CuentasStore } from '../stores/cuentas.js';
import { TransaccionesStore } from '../stores/transacciones.js'
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const TransaccionStore = TransaccionesStore();
    const CuentaStore = CuentasStore();
    const authStore = useAuthStore();

    const cuentas = ref([]);

    var monto = ref('');
    var numero_cuenta_envia = ref('');
    var numero_cuenta_recibe = ref('');
    var descripcion = ref('');

    onMounted(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await CuentaStore.fetchCuentas(authStore.user.nombre)
        cuentas.value = CuentaStore.allCuentas;
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    }

    const AgregarTransaccion = () => {
      const transaccion = { 
        monto: monto.value, 
        numero_cuenta_envia: numero_cuenta_envia.value,
        numero_cuenta_recibe: numero_cuenta_recibe.value,
        descripcion: descripcion.value
      };
      TransaccionStore.createTransaccion(numero_cuenta_envia.value, transaccion);
      monto.value = '';
      numero_cuenta_envia.value = '';
      numero_cuenta_recibe.value = '';
      descripcion.value = '';
    };

    return{
      cuentas,
      AgregarTransaccion,
      monto,
      numero_cuenta_envia,
      numero_cuenta_recibe,
      descripcion
    }
  }
}
</script>

<template>
    <br>
    <div class="container">
    <form @submit.prevent="AgregarTransaccion()">
      <div class="mb-3">
        <label for="Select" class="form-label">Cuentas</label>
        <select id="Select" class="form-select form-select-sm" v-model="numero_cuenta_envia" >
          <option v-for="cuenta in cuentas" :key="cuenta.numero_cuenta" :value="cuenta.numero_cuenta">
            {{ cuenta.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="cuenta_recibe" class="form-label">Cuenta a la que desea enviar:</label>
        <input type="text" class="form-control" v-model="numero_cuenta_recibe" placeholder="Cuenta a enviar">
      </div>
      <div class="mb-3">
        <label for="monto" class="form-label">Monto:</label>
        <input type="text" class="form-control" v-model="monto" placeholder="Monto">
      </div>
      <div class="form-floating">
        <textarea v-model="descripcion" class="form-control" placeholder="Descripcion" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Descripcion</label>
      </div>
      <br>
      <button type="submit" class="btn btn-outline-dark">Enviar</button>
    </form>
  </div>
</template>

<style>
  .mr-10{
    margin-right: 10px;
  }
</style>