import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

export const setupAxiosInterceptors = (store) => {
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
          console.warn("Axios Interceptor: Unauthorized/Forbidden request. Logging out.");
          store.dispatch({ type: 'LOGOUT_USER' });
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;