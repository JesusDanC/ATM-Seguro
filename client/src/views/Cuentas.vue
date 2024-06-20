<script>
import { ref, onMounted } from 'vue';
import { CuentasStore } from '../stores/cuentas.js';
import { useAuthStore } from '../stores/auth.js';
import { TransaccionesStore } from '../stores/transacciones.js'

export default {
  setup() {
    const transaccionStore = TransaccionesStore();
    const cuentaStore = CuentasStore();
    const authStore = useAuthStore();
    const transacciones = ref([]);
    const cuentas = ref([]);
    const cuentaGetted = ref([]);
    const nombre = ref('');
    const saldo = ref('');

    onMounted(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await cuentaStore.fetchCuentas(authStore.user.nombre)
        cuentas.value = cuentaStore.allCuentas;
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    }

    const GetTransacciones = async () => {
      try {
        await transaccionStore.fetchTransacciones(cuentaGetted.value.numero_cuenta)
        transacciones.value = transaccionStore.allTransacciones;
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    };
    
    const openModalEdit = async (cuenta) => {
      cuentaGetted.value = cuenta;
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    };

    const openModalDelete = async (cuenta) => {
      cuentaGetted.value = cuenta;
      const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
      myModal.show();
    };

    const openModalAgregar = async () => {
      const myModal = new bootstrap.Modal(document.getElementById('my3Modal'));
      myModal.show();
    };

    const openModalTransacciones = async (cuenta) => {
      cuentaGetted.value = cuenta;
      GetTransacciones();
      const myModal = new bootstrap.Modal(document.getElementById('my4Modal'));
      myModal.show();
    }
    
    const ActualizarCuenta = async () => {
      try {
        const cuentaActualizada = {
          nombre: nombre.value, 
          saldo: saldo.value
        };
        cuentaStore.updateCuenta(cuentaGetted.value.numero_cuenta, cuentaActualizada);
        cuentaGetted.value = [];
        nombre.value = '';
        saldo.value = '';
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const DeleteCuenta = async () => {
      try {
        cuentaStore.deleteCuenta(cuentaGetted.value.numero_cuenta);
        cuentaGetted.value = [];
        const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
        myModal.hide();
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const AgregarCuenta = () => {
      const cuenta = { 
        nombre: nombre.value, 
        saldo: saldo.value
      };
      cuentaStore.createCuenta(authStore.user.nombre, cuenta);
      nombre.value = '';
      saldo.value = ''
      GetData();
    };

    return{
      cuentas,
      openModalEdit,
      openModalDelete,
      openModalAgregar,
      openModalTransacciones,
      ActualizarCuenta,
      DeleteCuenta,
      AgregarCuenta,
      nombre,
      saldo,
      transacciones
    }
  }
}
</script>

<template>
    <br>
    <div class="container ">
        <div class="col">
          <h2>Cuentas:</h2>
            <table class="table table-bordered table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre cuenta</th>
                      <th scope="col">Nombre usuario</th>
                      <th scope="col">Saldo</th>
                      <th scope="col">Transacciones</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(cuenta, index) in cuentas" :key="cuenta.numero_cuenta">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ cuenta.nombre }}</td>
                        <td>{{ cuenta.nombre_usuario }}</td>
                        <td>Lps. {{ cuenta.saldo }}</td>
                        <td class="text-center">
                            <button @click="openModalTransacciones(cuenta)" class="btn btn-outline-secondary">
                              <i class="bi bi-arrow-left-right"></i>
                            </button>
                        </td>
                        <td class="text-center">
                          <button @click="openModalEdit(cuenta)" class="btn btn-outline-secondary">
                            <i class="bi bi-pencil"></i>
                          </button>
                        </td>
                        <td class="text-center">
                          <button @click="openModalDelete(cuenta)" class="btn btn-outline-secondary">
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
            <h5 class="modal-title">Editar Cuenta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre:</label>
                <input type="text" class="form-control" v-model="nombre">
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">saldo:</label>
                <input type="text" class="form-control" v-model="saldo">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="ActualizarCuenta()" type="button" class="btn btn-outline-primary">Guardar</button>
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
              <h5 class="modal-title ">Desea eliminar esta cuenta</h5>
            </div>
            <div class="modal-body text-center">
              <button @click.prevent="DeleteCuenta" type="button" class="btn btn-outline-danger mr-10">Si</button>
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
            <h5 class="modal-title">Crear Cuenta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="Nombre" class="form-label">Nombre:</label>
                <input type="text" class="form-control" v-model="nombre">
              </div>
              <div class="mb-3">
                <label for="Saldo" class="form-label">Saldo:</label>
                <input type="text" class="form-control" v-model="saldo">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="AgregarCuenta()" type="button" class="btn btn-outline-primary">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div>
      <div id="my4Modal" class="modal modal-lg" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Transacciones realizadas</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <table class="table table-bordered table-striped table-hover">
                  <thead class="table-dark">
                      <tr>
                      <th scope="col">#</th>
                      <th scope="col">Cuenta remitente</th>
                      <th scope="col">Cuenta recibe</th>
                      <th scope="col">Monto</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Fecha de valor</th>
                      </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(transaccion, index) in transacciones" :key="transaccion.numero_transaccion">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ transaccion.numero_cuenta_envia }} </td>
                      <td>{{ transaccion.numero_cuenta_recibe }}</td>
                      <td>Lps. {{ transaccion.monto }}</td>
                      <td>{{ transaccion.descripcion }}</td>
                      <td>{{ transaccion.fecha_de_valor }}</td>
                  </tr>
                  </tbody>
              </table>
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