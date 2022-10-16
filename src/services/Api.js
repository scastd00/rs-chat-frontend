import axios from 'axios';
import { DEV_HOST, PROD_HOST } from '../utils/constants';

const Api = axios.create({
  baseURL: import.meta.env.PROD
    ? `https://${PROD_HOST}/api/v1`
    : `https://${DEV_HOST}/api/v1`,
});

export default Api;
