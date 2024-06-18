import api from '../lib/axios';

export const apiUsuario = {
    getUsers() {
      return api.get(`/usuarios`);
    },
    createUser(usuario) {
      return api.post(`/usuarios`, {usuario});
    },
    updateUser(nombre, usuario) {
      return api.put(`/usuarios/${nombre}`, {usuario});
    },
    deleteUser(nombre) {
      return api.delete(`/usuarios/${nombre}`);
    }
  };