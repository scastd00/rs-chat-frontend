import Api from './Api';
import { headers } from '../utils';

export default {
  getAllGroups(__token__) {
    return Api.get('/groups', headers(__token__));
  },

  addGroup(data, __token__) {
    return Api.post('/group/save', data, headers(__token__));
  },

  deleteGroup(id, __token__) {
    return Api.delete(`/group/delete/${id}`, headers(__token__));
  },
};
