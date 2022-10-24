import Api from './Api';
import { headers } from '../utils';

export default {
  openedSessions(username, __token__) {
    return Api.get(`/sessions/${username}`, headers(__token__));
  },

  joinToChat(userId, chatCode, __token__) {
    return Api.post(`/chat/join/${chatCode}`, { userId }, headers(__token__));
  },

  createUser(user, __token__) {
    return Api.post('/user/save', { user }, headers(__token__));
  },

  getAll(__token__) {
    return Api.get('/users', headers(__token__));
  },
};
