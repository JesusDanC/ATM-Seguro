import { defineStore } from 'pinia';
import { apiUsuario } from '../services/usuario';

export const UsuariosStore = defineStore('usuario', {
  state: () => ({
    usuarios: []
  }),
  getters: {
    allUsers: state => state.usuarios
  },
  actions: {
    async fetchUsers() {
      const response = await apiUsuario.getUsers();

      const users = response.data.map(usuario => ({
        nombre: usuario.nombre,
        role: usuario.role
      }));
      
      this.usuarios = users;
    },
    async createUser(usuario) {
      const response = await apiUsuario.createUser(usuario);
      this.usuarios.push(response.usuarios);
    },
    async updateUser(nombre, usuario) {
      const response = await apiUsuario.updateUser(nombre, usuario);
      const index = this.usuarios.findIndex(u => u.nombre === nombre);
      if (index !== -1) {
        this.usuarios.splice(index, 1, response.data);
      }
    },
    async deleteUser(nombre) {
      await apiUsuario.deleteUser(nombre);
      this.usuarios = this.usuarios.filter(usuario => usuario.nombre !== nombre);
    }
  }
});
