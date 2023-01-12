import Api from './Api';
import { headers } from '../utils';

export default {
  getAllLogs(__token__) {
    return Api.get('/logs', headers(__token__));
  }
}
