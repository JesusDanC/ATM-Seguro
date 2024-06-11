import api from '../lib/axios';

export const apiTransacciones = {
    getTransacciones(numero_cuenta_envia) {
      return api.get(`/transacciones/${numero_cuenta_envia}`);
    },
    createTransaccion(numero_cuenta_envia, transacccion) {
      return api.post(`/transacciones/${numero_cuenta_envia}`, transacccion);
    },
    updateTransaccion(numero_transaccion, transacccion) {
      return api.put(`/transacciones/${numero_transaccion}`, transacccion);
    },
    deleteTransaccion(numero_transaccion) {
      return api.delete(`/transacciones/${numero_transaccion}`);
    }
  };