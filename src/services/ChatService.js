import Api from './Api';
import { headers } from '../utils';

export default {
  getChatInfo(id, __token__) {
    return Api.get(`/chats/info/${id}`, headers(__token__));
  },

  getAllChatsOfUser(username, __token__) {
    return Api.get(`/chats/${username}`, headers(__token__));
  },

  connectTo(chatKey, userId, __token__) {
    return Api.post(`/chat/connect/${chatKey}`, { userId }, headers(__token__));
  },

  getAllUsersOfChat(chatId, __token__) {
    return Api.get(`/chat/users/${chatId}`, headers(__token__));
  },

  leaveChat(chatId, userId, __token__) {
    return Api.post(`/chat/leave/${chatId}`, { userId }, headers(__token__));
  },
};
