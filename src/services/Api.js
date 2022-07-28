import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://rschat-ws-back.herokuapp.com/api/v1'
    : 'http://127.0.0.1:8080/api/v1',
});

export default Api;
