import Api from './Api';
import { headers } from '../utils';

export default {
  getChatInfo(id, __token__) {
    return Api.get(`/chats/info/${id}`, headers(__token__));
  },

  getChatContents(id, __token__) {
    return Api.get(`/chat/content/${id}`, headers(__token__));
  },

  sendTextMessage(message, chatId, __token__) {
    return Api.post(`/chat/send/${chatId}`, message, headers(__token__));
  },

  getAllChatsOfUser(username, __token__) {
    return Api.get(`/chats/${username}`, headers(__token__));
  },
};
