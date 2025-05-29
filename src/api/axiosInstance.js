import axios from 'axios';
import store from '../store/store';
import { logoutUser } from '../store/actions/clientActions';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newTokenFromBody = response.data?.token;
    const newTokenFromHeader = response.headers['x-new-token'];

    const finalNewToken = newTokenFromBody || newTokenFromHeader;

    if (finalNewToken && finalNewToken !== localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', finalNewToken);
    }
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        console.warn("Axios Interceptor: Unauthorized (401/403) request. Logging out.");
        store.dispatch(logoutUser(null));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;