import Api from './Api';
import { headers } from '../utils';

export default {
  login(credentials) {
    return Api.post('/login', credentials);
  },

  register(credentials) {
    return Api.post('/register', credentials);
  },

  changePassword(username, newPassword, confirmPassword, __token__) {
    return Api.put(
      `/changePassword/${username}`,
      { newPassword, confirmPassword },
      headers(__token__),
    );
  },

  forgotPassword(email) {
    return Api.post('/forgotPassword', { email });
  },

  createPassword(formFields) {
    return Api.post('/createPassword', formFields);
  },
};
