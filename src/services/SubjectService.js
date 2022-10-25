import Api from './Api';
import { headers } from '../utils';

export default {
  getAllSubjects(__token__) {
    return Api.get(`/subjects`, headers(__token__));
  },

  addSubject(data, __token__) {
    return Api.post('/subject/save', data, headers(__token__));
  },

  deleteSubject(id, __token__) {
    return Api.delete(`/subject/delete/${id}`, headers(__token__));
  },
};
