import { defineStore } from 'pinia';
import { apiCuentas } from '../services/cuentas';

export const CuentasStore = defineStore('cuenta', {
  state: () => ({
    cuentas: []
  }),
  getters: {
    allCuentas: state => state.cuentas
  },
  actions: {
    async fetchCuentas(nombre_usuario) {
      const response = await apiCuentas.getCuentas(nombre_usuario);
      this.cuentas = response.data;
    },
    async createCuenta(nombre_usuario, cuenta) {
      const response = await apiCuentas.createCuenta(nombre_usuario, cuenta);
      this.cuentas.push(response.cuentas);
    },
    async updateCuenta(numero_cuenta, cuenta) {
      const response = await apiCuentas.updateCuenta(numero_cuenta, cuenta);
      const index = this.cuentas.findIndex(u => u.numero_cuenta === numero_cuenta);
      if (index !== -1) {
        this.cuentas.splice(index, 1, response.data);
      }
    },
    async deleteCuenta(numero_cuenta) {
      await apiCuentas.deleteCuenta(numero_cuenta);
      this.cuentas = this.cuentas.filter(cuenta => cuenta.numero_cuenta !== numero_cuenta);
    }
  }
});