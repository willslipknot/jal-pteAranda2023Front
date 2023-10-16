import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://containers-us-west-88.railway.app:5586',
  withCredentials: true,
});

export default instance;
