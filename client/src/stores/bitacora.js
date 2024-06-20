import { defineStore } from 'pinia';
import { apiBitacora } from '../services/bitacora';

export const BitacoraStore = defineStore('bitacora', {
  state: () => ({
    bitacoras: []
  }),
  getters: {
    allBitacoras: state => state.bitacoras
  },
  actions: {
    async fetchBitacoras() {
      const response = await apiBitacora.getBitacoras();
      this.bitacoras = response.data;
    },
    async create(nombre_usuario) {
      const response = await apiBitacora.createBitacora(nombre_usuario);
      this.bitacoras.push(response.data.bitacora);
      return response.data.bitacora
    },
    async update(codigo) {
      const response = await apiBitacora.updateBitacora(codigo);
      const index = this.bitacoras.findIndex(u => u.codigo === codigo);
      if (index !== -1) {
        this.bitacoras.splice(index, 1, response.data);
      }
    },
    async delete(codigo) {
      await apiBitacora.deleteBitacora(codigo);
      this.bitacoras = this.bitacoras.filter(bitacora => bitacora.codigo !== codigo);
    }
  }
});