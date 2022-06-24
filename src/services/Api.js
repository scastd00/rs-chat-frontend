import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://spring-chat-backend.herokuapp.com/api/v1'
    : 'http://127.0.0.1:8080/api/v1',
});

export default Api;
