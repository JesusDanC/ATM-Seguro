import api from '../lib/axios';

export const apiCuentas = {
    getCuentas(nombre_usuario) {
      return api.get(`/cuentas/${nombre_usuario}`);
    },
    createCuenta(nombre_usuario, cuenta) {
      return api.post(`/cuentas/${nombre_usuario}`, cuenta);
    },
    updateCuenta(numero_cuenta, cuenta) {
      return api.put(`/cuentas/${numero_cuenta}`, cuenta);
    },
    deleteCuenta(numero_cuenta) {
      return api.delete(`/cuentas/${numero_cuenta}`);
    }
  };