import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://spring-chat-backend.herokuapp.com/api/v1',
});

export default Api;
