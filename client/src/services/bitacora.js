import api from '../lib/axios';

export const apiBitacora = {
    getBitacoras() {
      return api.get('/bitacora');
    },
    createBitacora(nombre_usuario) {
      return api.post(`/bitacora/${nombre_usuario}`);
    },
    updateBitacora(codigo) {
      return api.put(`/bitacora/${codigo}`);
    },
    deleteBitacora(codigo) {
      return api.delete(`/bitacora/${codigo}`);
    }
  };