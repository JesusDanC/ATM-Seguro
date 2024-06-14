import { defineStore } from 'pinia';
import { apiBitacora } from '../services/bitacora';

export const ServiciosStore = defineStore('bitacora', {
  state: () => ({
    bitacoras: []
  }),
  getters: {
    allServicios: state => state.bitacoras
  },
  actions: {
    async fetchBitacoras() {
      const response = await apiBitacora.getBitacoras();
      this.bitacoras = response.data;
    },
    async createBitacora(nombre_usuario, bitacora) {
      const response = await apiBitacora.createBitacora(nombre_usuario, bitacora);
      this.bitacoras.push(response.bitacoras);
    },
    async updateBitacora(codigo, bitacora) {
      const response = await apiBitacora.updateBitacora(codigo, bitacora);
      const index = this.bitacoras.findIndex(u => u.codigo === codigo);
      if (index !== -1) {
        this.bitacoras.splice(index, 1, response.data);
      }
    },
    async deleteBitacora(codigo) {
      await apiBitacora.deleteBitacora(codigo);
      this.bitacoras = this.bitacoras.filter(bitacora => bitacora.codigo !== codigo);
    }
  }
});