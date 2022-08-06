import Api from './Api';
import { headers } from '../utils';

export default {
  getAllDegrees(__token__) {
    return this.getDegreeByName("all", __token__);
  },

  getDegreeByName(name, __token__) {
    return Api.get(`/degrees/${name}`, headers(__token__));
  },

  addDegree(data, __token__) {
    return Api.post('/degrees/add', data, headers(__token__));
  },
};
