import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jal-ptearanda2023back-production.up.railway.app',
  withCredentials: true,
});

export default instance;
