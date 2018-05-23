import axios from 'axios';
import querystring from 'querystring';
import * as config from '../config.js'

var ax = axios.create({
  baseURL: config.BASE_API
})

ax.interceptors.request.use(config => {
  if (
    config.method === 'patch' ||
    config.method === 'post' ||
    config.method === 'put' ||
    config.method === 'delete'
  ) {
    config.data = querystring(config.data);
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// ax.interceptors.response.use(response => {
//   return response
// }, error => {
//   return Promise.reject(error)
// })


export default ax;