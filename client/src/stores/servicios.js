import { defineStore } from 'pinia';
import { apiServicios } from '../services/servicios';

export const ServiciosStore = defineStore('servicio', {
  state: () => ({
    servicios: []
  }),
  getters: {
    allServicios: state => state.servicios
  },
  actions: {
    async fetchServicios(nombre_usuario) {
      const response = await apiServicios.getServicios(nombre_usuario);
      this.servicios = response.data;
    },
    async createServicio(nombre_usuario, servicio) {
      const response = await apiServicios.createServicio(nombre_usuario, servicio);
      this.servicios.push(response.servicios);
    },
    async updateServicio(id_servicio, servicio) {
      const response = await apiServicios.updateServicio(id_servicio, servicio);
      const index = this.servicios.findIndex(u => u.id_servicio === id_servicio);
      if (index !== -1) {
        this.servicios.splice(index, 1, response.data);
      }
    },
    async deleteServicio(id_servicio) {
      await apiServicios.deleteServicio(id_servicio);
      this.servicios = this.servicios.filter(servicio => servicio.id_servicio !== id_servicio);
    }
  }
});