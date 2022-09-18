import Api from './Api';
import { headers } from '../utils';

export default {
  getRandomEmojis(__token__) {
    return Api.get('/emojis/random', headers(__token__));
  },
};
