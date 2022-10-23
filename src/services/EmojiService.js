import Api from './Api';
import { headers } from '../utils';

export default {
  getRandomEmojis(numberOfEmojis, __token__) {
    return Api.get(`/emojis/random/${numberOfEmojis}`, headers(__token__));
  },

  getEmojiContainsString(string, __token__) {
    return Api.get(`/emojis/${string}`, headers(__token__));
  },

  getEmojisByCategory(category, __token__) {
    return Api.get(`/emojis/category/${category}`, headers(__token__));
  },

  getEmojisGroupedByCategory(__token__) {
    return Api.get('/emojis/grouped', headers(__token__));
  },
};
