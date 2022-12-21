import Api from './Api';
import { headers } from '../utils';

export default {
  getAllTeachers(__token__) {
    return Api.get('/teachers', headers(__token__));
  },

  getTeacherDegrees(id, __token__) {
    return Api.get(`/teacher/degrees/${id}`, headers(__token__));
  },

  getTeacherSubjects(id, __token__) {
    return Api.get(`/teacher/subjects/${id}`, headers(__token__));
  }
}
