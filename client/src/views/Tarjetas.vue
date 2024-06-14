<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { CuentasStore } from '../stores/cuentas.js';
import { TarjetasStore } from '../stores/tarjetas.js';

export default {
  setup() {
    const TarjetaStore = TarjetasStore();
    const CuentaStore = CuentasStore();
    const authStore = useAuthStore();
    
    const cuentas = ref([]);
    const tarjetas = ref([]);

    const cuentaGetted = ref([]);
    const tarjetaGetted = ref([]);
    
    const cvv = ref('');

    onMounted(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await CuentaStore.fetchCuentas(authStore.user.nombre)
        cuentas.value = CuentaStore.allCuentas;

        for (const cuenta of cuentas.value) {
          await GetTarjetas(cuenta.numero_cuenta);
        }
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    }

    const GetTarjetas = async (numero_cuenta) => {
      await TarjetaStore.fetchTarjetas(numero_cuenta);
      tarjetas.value = {
        ...tarjetas.value,
        [numero_cuenta]: TarjetaStore.allTarjetas,
      };

    }

    const openModalEdit = async (tarjeta) => {
      tarjetaGetted.value = tarjeta;
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    };

    const openModalDelete = async (tarjeta) => {
      tarjetaGetted.value = tarjeta;
      const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
      myModal.show();
    };

    const openModalAgregar = async (tarjeta) => {
      cuentaGetted.value = tarjeta;
      const myModal = new bootstrap.Modal(document.getElementById('my3Modal'));
      myModal.show();
    };
    
    const ActualizarTarjeta = async () => {
      try {
        const tarjetaActualizada = {
            cvv: cvv.value
        };
        await TarjetaStore.updateTarjeta(tarjetaGetted.value.numero_tarjeta, tarjetaActualizada);
        tarjetaGetted.value = [];
        cvv.value = '';
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const DeleteTarjeta = async () => {
      try {
        await TarjetaStore.deleteTarjeta(tarjetaGetted.value.numero_tarjeta);
        tarjetaGetted.value = [];
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const AgregarTarjeta = () => {
      try {
        const tarjeta = { 
          cvv: cvv.value
        };
        TarjetaStore.createTarjeta(cuentaGetted.value.numero_cuenta, tarjeta);
        cvv.value = '';
      } catch (error) {
        console.log(error);
      }
      GetData();
    };

    const tarjetasPorCuenta = (numero_cuenta) => {
      return tarjetas.value[numero_cuenta] || [];      
    };

    return{
      cuentas,
      tarjetas,
      openModalEdit,
      openModalDelete,
      openModalAgregar,
      ActualizarTarjeta,
      DeleteTarjeta,
      AgregarTarjeta,
      cvv,
      tarjetasPorCuenta
    }
  }
}
</script>

<template>
    <br>
    <div class="container">
      <template v-for="cuenta in cuentas" :key="cuenta.numero_cuenta">
        <h3>Nombre de la cuenta: {{ cuenta.nombre }}</h3>
        <div class="col">
          <h4>Tarjetas</h4>
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">CVV</th>
                <th scope="col">Fecha creacion</th>
                <th scope="col">Fecha vencimiento</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tarjeta, index) in tarjetasPorCuenta(cuenta.numero_cuenta)" :key="tarjeta.numero_tarjeta">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ tarjeta.cvv }}</td>
                <td>{{ tarjeta.fecha_creacion }}</td>
                <td>{{ tarjeta.fecha_vencimiento }}</td>
                <td>
                  <button @click="openModalEdit(tarjeta)" class="btn btn-outline-secondary">
                    <i class="bi bi-pencil"></i>
                  </button>
                </td>
                <td>
                  <button @click="openModalDelete(tarjeta)" class="btn btn-outline-secondary">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn btn-outline-secondary" @click="openModalAgregar(cuenta)">Agregar</button>
        <br>
        <br>
        <br>
      </template> 
    </div>
    
    <br>

    <div>
      <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Tarjeta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">CVV:</label>
                <input type="text" class="form-control" v-model="cvv">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="ActualizarTarjeta()" type="button" class="btn btn-outline-primary">Guardar</button>
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
              <h5 class="modal-title ">Desea eliminar esta tarjeta</h5>
            </div>
            <div class="modal-body text-center">
              <button @click.prevent="DeleteTarjeta()" type="button" class="btn btn-outline-danger mr-10">Si</button>
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
            <h5 class="modal-title">Crear Tarjeta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="Nombre" class="form-label">CVV:</label>
                <input type="text" class="form-control" v-model="cvv">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="AgregarTarjeta()" type="button" class="btn btn-outline-primary">Guardar</button>
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