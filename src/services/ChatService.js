import Api from './Api';
import { headers } from '../utils';

export default {
  getChatMetadata(type, id, __token__) {
    return Api.get(`/chat/metadata/${type.toUpperCase()}/${id}`, headers(__token__));
  },

  getChatContents(type, id, __token__) {
    return Api.get(`/chat/content/${type.toUpperCase()}/${id}`, headers(__token__));
  },
};
