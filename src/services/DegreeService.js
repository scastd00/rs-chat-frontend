import Api from './Api';
import { headers } from '../utils';

export default {
  getAllDegrees(__token__) {
    return Api.get(`/degrees`, headers(__token__));
  },

  getDegreeByName(name, __token__) {
    return Api.get(`/degree/${name}`, headers(__token__));
  },

  addDegree(data, __token__) {
    return Api.post('/degree/save', data, headers(__token__));
  },

  deleteDegree(id, __token__) {
    return Api.delete(`/degree/delete/${id}`, headers(__token__));
  },
};
