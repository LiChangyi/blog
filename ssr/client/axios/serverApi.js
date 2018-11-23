import axios from 'axios';
import api from './api';

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7777'
});
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export default api(instance);
