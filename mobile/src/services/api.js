import axios from 'axios';

const api = axios.create({
  //change to ip from test computer
  baseURL: 'ip'
});

export default api;
