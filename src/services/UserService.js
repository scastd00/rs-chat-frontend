import Api from './Api';
import { headers } from '../utils';

export default {
  openedSessions(username, __token__) {
    return Api.get(`/sessions/${username}`, headers(__token__));
  }
};
