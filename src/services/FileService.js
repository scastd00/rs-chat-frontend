import Api from './Api';
import { headers } from '../utils';

export default {
  uploadFile(file, userId, __token__) {
    return Api.post('/upload', { file, userId }, headers(__token__));
  },
};
