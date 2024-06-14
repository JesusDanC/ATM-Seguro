import api from '../lib/axios';

export const apiBitacora = {
    getBitacoras() {
      return api.get('/bitacora');
    },
    createBitacora(nombre_usuario, bitacora) {
      return api.post(`/bitacora/${nombre_usuario}`, bitacora);
    },
    updateBitacora(codigo, bitacora) {
      return api.put(`/bitacora/${codigo}`, bitacora);
    },
    deleteBitacora(codigo) {
      return api.delete(`/bitacora/${codigo}`);
    }
  };