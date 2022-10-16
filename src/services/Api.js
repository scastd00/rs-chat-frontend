import axios from 'axios';
import { DEV_HOST, PROD_HOST } from '../utils/constants';

const Api = axios.create({
  baseURL: import.meta.env.PROD
    ? `http://${PROD_HOST}/api/v1`
    : `http://${DEV_HOST}/api/v1`,
});

export default Api;
