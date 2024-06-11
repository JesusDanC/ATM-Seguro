import api from '../lib/axios';

export const apiServicios = {
    getServicios(nombre_usuario) {
      return api.get(`/servicios/${nombre_usuario}`);
    },
    createServicio(nombre_usuario, servicio) {
      return api.post(`/servicios/${nombre_usuario}`, servicio);
    },
    updateServicio(id_servicio, servicio) {
      return api.put(`/servicios/${id_servicio}`, servicio);
    },
    deleteServicio(id_servicio) {
      return api.delete(`/servicios/${id_servicio}`);
    }
  };