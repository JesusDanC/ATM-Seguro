<script>
import { useAuthStore } from '../stores/auth';
import { ref, onMounted } from 'vue';
import { ServiciosStore } from '../stores/servicios';
import { CuentasStore } from '../stores/cuentas.js';

export default {
  setup() {
    const servicioStore = ServiciosStore();
    const authStore = useAuthStore();
    const cuentaStore = CuentasStore();

    const servicios = ref([]);
    const cuentas = ref([]);
    const servicioGetted = ref([]);

    const nombre_servicio = ref('');
    const numero_cuenta_usuario = ref('')
    const monto = ref('');

    onMounted(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await servicioStore.fetchServicios(authStore.user.nombre)
        servicios.value = servicioStore.allServicios;

        await cuentaStore.fetchCuentas(authStore.user.nombre)
        cuentas.value = cuentaStore.allCuentas;
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    }
    
    const openModalEdit = async (servicio) => {
      servicioGetted.value = servicio;
      console.log(servicioGetted.value.id_servicio);
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    };

    const openModalDelete = async (servicio) => {
      servicioGetted.value = servicio;
      const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
      myModal.show();
    };

    const openModalAgregar = async () => {
      const myModal = new bootstrap.Modal(document.getElementById('my3Modal'));
      myModal.show();
    };
    
    const ActualizarServicio = async () => {
      try {
        const servicioActualizado = {
          nombre_servicio: nombre_servicio.value, 
          numero_cuenta_usuario: numero_cuenta_usuario.value,
          monto: monto.value
        };
        servicioStore.updateServicio(servicioGetted.value.id_servicio, servicioActualizado);

        servicioGetted.value = [];
        nombre_servicio.value = '';
        numero_cuenta_usuario.value = '';
        monto.value = '';
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const DeleteServicio = async () => {
      try {
        servicioStore.deleteServicio(servicioGetted.value.id_servicio);
        servicioGetted.value = [];
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const AgregarServicio = () => {
      const servicio = {
          nombre_servicio: nombre_servicio.value, 
          numero_cuenta_usuario: numero_cuenta_usuario.value,
          monto: monto.value
        };
      servicioStore.createServicio(authStore.user.nombre, servicio);
      nombre_servicio.value = '';
      numero_cuenta_usuario.value = '';
      monto.value = '';
      GetData();
    };

    return{
      servicios,
      cuentas,
      openModalEdit,
      openModalDelete,
      openModalAgregar,
      ActualizarServicio,
      DeleteServicio,
      AgregarServicio,
      nombre_servicio,
      monto,
      numero_cuenta_usuario
    }
  }
}
</script>

<template>
    <br>
    <div class="container ">
        <div class="col">
          <h2>Servicios:</h2>
            <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre del servicio</th>
                      <th scope="col">Numero cuenta</th>
                      <th scope="col">Monto pagado</th>
                      <th scope="col">Fecha de pago</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(servicio, index) in servicios" :key="servicio.id_servicio">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ servicio.nombre_servicio }}</td>
                        <td>{{ servicio.numero_cuenta_usuario }}</td>
                        <td>Lps. {{ servicio.monto }}</td>
                        <td>{{ servicio.fecha_pago }}</td>
                        <td class="text-center">
                          <button @click="openModalEdit(servicio)" class="btn btn-outline-secondary">
                            <i class="bi bi-pencil"></i>
                          </button>
                        </td>
                        <td class="text-center">
                          <button @click="openModalDelete(servicio)" class="btn btn-outline-secondary">
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn btn-outline-secondary" @click="openModalAgregar()">Agregar</button>
    </div>
    
    <br>

    <div>
      <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Servicio</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre del servicio:</label>
                <input type="text" class="form-control" v-model="nombre_servicio">
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Monto a pagar:</label>
                <input type="text" class="form-control" v-model="monto">
              </div>
              <div class="mb-3">
                <label for="Select" class="form-label">Cuentas</label>
                <select id="Select" class="form-select form-select-sm" v-model="numero_cuenta_usuario" >
                  <option v-for="cuenta in cuentas" :key="cuenta.numero_cuenta" :value="cuenta.numero_cuenta">
                    {{ cuenta.nombre }}
                  </option>
                </select>
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="ActualizarServicio()" type="button" class="btn btn-outline-primary">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div>
      <div id="my2Modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content d-flex justify-content-center align-items-center">
            <div class="modal-header">
              <h5 class="modal-title ">Desea eliminar este pago</h5>
            </div>
            <div class="modal-body text-center">
              <button @click.prevent="DeleteServicio()" type="button" class="btn btn-outline-danger mr-10">Si</button>
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div id="my3Modal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Pagar servicio</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre del servicio:</label>
                <input type="text" class="form-control" v-model="nombre_servicio">
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Monto a pagar:</label>
                <input type="text" class="form-control" v-model="monto">
              </div>
              <div class="mb-3">
                <label for="Select" class="form-label">Cuentas</label>
                <select id="Select" class="form-select form-select-sm" v-model="numero_cuenta_usuario" >
                  <option v-for="cuenta in cuentas" :key="cuenta.numero_cuenta" :value="cuenta.numero_cuenta">
                    {{ cuenta.nombre }}
                  </option>
                </select>
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="AgregarServicio()" type="button" class="btn btn-outline-primary">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style>
  .mr-10{
    margin-right: 10px;
  }
</style>