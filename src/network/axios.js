import axios from 'axios';

// const BASE_URL = `http://127.0.0.1:8000/api`;
const BASE_URL = process.env.REACT_APP_API_URL;

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  async (config) => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${session?.accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios;
