import Api from './Api';
import { headers } from '../utils';

export default {
  getBadges(userId, __token__) {
    return Api.get(`/user/badges/${userId}`, headers(__token__));
  },
};
