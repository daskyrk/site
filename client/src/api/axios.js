import axios from 'axios';
import { encode } from 'querystring';
import * as config from '../config';

var ax = axios.create({
  baseURL: config.BASE_API,
  transformRequest: [function (data, headers) {
    return encode(data);
  }],
});

ax.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

// vuex plugin
// export function autoLoading(namespace) {
//   return store => {
//     ax.interceptors.request.use(config => {
//       store.commit(`${namespace}/FETCH_ART_START`)
//       return config;
//     }, error => {
//       return Promise.reject(error);
//     })

//     ax.interceptors.response.use(response => {
//       store.commit(`${namespace}/FETCH_ART_END`)
//       return response;
//     }, error => {
//       return Promise.reject(error)
//     })
//   }
// }

export default ax;
