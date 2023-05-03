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

  getIdByUsername(username, __token__) {
    return Api.get(`/user/id/${username}`, headers(__token__));
  },

  deleteUser(id, __token__) {
    return Api.delete(`/user/delete/${id}`, headers(__token__));
  },

  getStats(username, __token__) {
    return Api.get(`/user/stats/${username}`, headers(__token__));
  },

  friendSwitch(username, friendUsername, __token__) {
    return Api.post(`/user/friend`, { username, friendUsername }, headers(__token__));
  },

  inviteUserToChat(username, invitesTo, chatKey, __token__) {
    return Api.post(`/user/invite`, { username, invitesTo, chatKey }, headers(__token__));
  }
};
