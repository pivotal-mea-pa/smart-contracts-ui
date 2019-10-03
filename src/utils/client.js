import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://smart-contracts-api.apps.sandbox.demo1.pocs.pcfs.io/';
} else {
  baseURL = 'https://smart-contracts-api.apps.sandbox.demo1.pocs.pcfs.io/';
}

export default axios.create({
  baseURL: baseURL,
  timeout: 900000
});
