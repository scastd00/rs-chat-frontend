import Api from './Api';
import { headers } from '../utils';

export default {
  login(credentials) {
    return Api.post('/login', credentials);
  },

  logout(__token__, fromAllSessions) {
    return Api.post('/logout', { fromAllSessions }, headers(__token__));
  },

  register(credentials) {
    return Api.post('/register', credentials);
  },

  forgotPassword(email) {
    return Api.post('/forgotPassword', { email });
  },

  createPassword(formFields) {
    return Api.post('/createPassword', formFields);
  },
};
