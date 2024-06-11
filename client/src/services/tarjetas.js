import api from '../lib/axios';

export const apiTarjetas = {
    getTarjetas(numero_cuenta) {
      return api.get(`/cuentas/${numero_cuenta}`);
    },
    createTarjeta(numero_cuenta, tarjeta) {
      return api.post(`/cuentas/${numero_cuenta}`, tarjeta);
    },
    updateTarjeta(numero_tarjeta, tarjeta) {
      return api.put(`/cuentas/${numero_tarjeta}`, tarjeta);
    },
    deleteTarjeta(numero_tarjeta) {
      return api.delete(`/cuentas/${numero_tarjeta}`);
    }
  };