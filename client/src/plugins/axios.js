import axios from 'axios';
import { encode } from 'querystring';
import config from '../config';


axios.defaults.baseURL = config.BASE_URL;
axios.defaults.transformRequest = [function(data, headers) {
  return encode(data);
}];

export default ({ app, store, redirect }) => {

  axios.interceptors.response.use(response => {
    return response.data;
  }, function (error) {
    if (error.response && error.response.status === 401) {
      redirect('/login')
    }
    return Promise.reject(error);
  });

}