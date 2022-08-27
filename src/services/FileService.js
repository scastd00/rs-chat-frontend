import Api from './Api';
import { headers } from '../utils';

export default {
  uploadFile(file, __token__) {
    return Api.post('/upload', file, headers(__token__));
  },
};
