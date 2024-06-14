import api from '../lib/axios';

export const apiTarjetas = {
    getTarjetas(numero_cuenta) {
      return api.get(`/tarjetas/${numero_cuenta}`);
    },
    createTarjeta(numero_cuenta, tarjeta) {
      return api.post(`/tarjetas/${numero_cuenta}`, tarjeta);
    },
    updateTarjeta(numero_tarjeta, tarjeta) {
      return api.put(`/tarjetas/${numero_tarjeta}`, tarjeta);
    },
    deleteTarjeta(numero_tarjeta) {
      return api.delete(`/tarjetas/${numero_tarjeta}`);
    }
  };