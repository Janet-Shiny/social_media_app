import axios from 'axios';

export const makereq = axios.create({
  baseURL: 'http://localhost:8800/api',
  withCredentials: true, 
});
