import Api from './Api';
import { headers } from '../utils';

export default {
  getAllSubjects(__token__) {
    return Api.get(`/subjects`, headers(__token__));
  },

  addSubject(data, __token__) {
    return Api.post('/subject/save', data, headers(__token__));
  },
};
