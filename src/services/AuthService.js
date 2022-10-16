import Api from './Api';

export default {
  login(credentials) {
    return Api.post('/login', credentials);
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
