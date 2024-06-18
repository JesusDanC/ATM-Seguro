<script>
import { ref, onMounted } from 'vue';
import { UsuariosStore } from '../stores/usuario.js';

export default {
  setup() {
    const usuarioStore = UsuariosStore();
    const usuarios = ref([]);
    const userGetted = ref([]);
    const nombre = ref('');
    const pin = ref('');

    onMounted(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await usuarioStore.fetchUsers()
        usuarios.value = usuarioStore.allUsers;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    const openModalEdit = async (usuario) => {
      userGetted.value = usuario;
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    };

    const openModalDelete = async (usuario) => {
      userGetted.value = usuario;
      const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
      myModal.show();
    };
    
    const ActualizarUsuario = async () => {
      try {
        const usuarioActualizado = {
          nombre: nombre.value, 
          pin: pin.value
        };
        usuarioStore.updateUser(userGetted.value.nombre, usuarioActualizado);
        userGetted.value = [];
        nombre.value = '';
        pin.value = '';
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    const DeleteUsuario = async () => {
      try {
        usuarioStore.deleteUser(userGetted.value.nombre);
        userGetted.value = [];
        const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
        myModal.hide();
      } catch (error) {
        console.log(error)
      }
      GetData();
    };

    return{
      usuarios,
      openModalEdit,
      openModalDelete,
      ActualizarUsuario,
      DeleteUsuario,
      nombre,
      pin
    }
  }
}
</script>

<template>
    <br>
    <div class="container ">
        <div class="col">
          <h2>Usuarios:</h2>
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Role</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(usuario, index) in usuarios" :key="usuario.nombre">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.role }}</td>
                        <td>
                          <button @click="openModalEdit(usuario)" class="btn btn-outline-secondary">
                            <i class="bi bi-pencil"></i>
                          </button>
                        </td>
                        <td>
                          <button @click="openModalDelete(usuario)" class="btn btn-outline-secondary">
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>

    <div>
      <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre:</label>
                <input type="text" class="form-control" v-model="nombre">
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Pin:</label>
                <input type="password" class="form-control" v-model="pin">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="ActualizarUsuario()" type="button" class="btn btn-outline-primary">Guardar</button>
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
              <h5 class="modal-title ">Desea eliminar este usuario</h5>
            </div>
            <div class="modal-body text-center">
              <button @click.prevent="DeleteUsuario" type="button" class="btn btn-outline-danger mr-10">Si</button>
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">No</button>
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