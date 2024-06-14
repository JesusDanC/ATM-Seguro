import { defineStore } from 'pinia';
import { apiTarjetas } from '../services/tarjetas';

export const TarjetasStore = defineStore('tarjeta', {
  state: () => ({
    tarjetas: []
  }),
  getters: {
    allTarjetas: state => state.tarjetas
  },
  actions: {
    async fetchTarjetas(numero_cuenta) {
      const response = await apiTarjetas.getTarjetas(numero_cuenta);
      this.tarjetas = response.data;
    },
    async createTarjeta(numero_cuenta, tarjeta) {
      console.log(numero_cuenta)
      const response = await apiTarjetas.createTarjeta(numero_cuenta, tarjeta);
      this.tarjetas.push(response.tarjetas);
    },
    async updateTarjeta(numero_tarjeta, tarjeta) {
      const response = await apiTarjetas.updateTarjeta(numero_tarjeta, tarjeta);
      const index = this.tarjetas.findIndex(u => u.numero_tarjeta === numero_tarjeta);
      if (index !== -1) {
        this.tarjetas.splice(index, 1, response.data);
      }
    },
    async deleteTarjeta(numero_tarjeta) {
      await apiTarjetas.deleteTarjeta(numero_tarjeta);
      this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.numero_tarjeta !== numero_tarjeta);
    }
  }
});