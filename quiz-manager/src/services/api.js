import axios from 'axios';

let baseURL = 'http://localhost:5000/';

const config = {
  timeout: 4000,
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const Api = axios.create(config);
export default Api;
