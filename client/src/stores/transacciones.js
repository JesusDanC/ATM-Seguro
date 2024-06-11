import { defineStore } from 'pinia';
import { apiTransacciones } from '../services/transacciones';

export const TransaccionesStore = defineStore('transaccion', {
  state: () => ({
    transacciones: []
  }),
  getters: {
    allTransacciones: state => state.transacciones
  },
  actions: {
    async fetchTransacciones(numero_cuenta_envia) {
      const response = await apiTransacciones.getTransacciones(numero_cuenta_envia);
      this.transacciones = response.data;
    },
    async createTransaccion(numero_cuenta_envia, transaccion) {
      const response = await apiTransacciones.createTransaccion(numero_cuenta_envia, transaccion);
      this.transacciones.push(response.transacciones);
    },
    async updateTransaccion(numero_transaccion, transaccion) {
      const response = await apiTransacciones.updateTransaccion(numero_transaccion, transaccion);
      const index = this.transacciones.findIndex(u => u.numero_transaccion === numero_transaccion);
      if (index !== -1) {
        this.transacciones.splice(index, 1, response.data);
      }
    },
    async deleteTransaccion(numero_transaccion) {
      await apiTransacciones.deleteTransaccion(numero_transaccion);
      this.transacciones = this.transacciones.filter(transaccion => transaccion.numero_transaccion !== numero_transaccion);
    }
  }
});