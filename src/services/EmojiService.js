import Api from './Api';
import { headers } from '../utils';

export default {
  getRandomEmojis(__token__) {
    return Api.get('/emojis/random', headers(__token__));
  },

  getEmojiContainsString(string, __token__) {
    return Api.get(`/emojis/${string}`, headers(__token__));
  },
};
