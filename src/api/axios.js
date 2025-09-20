import axios from 'axios';
import { getAccessToken, setTokens } from '../auth/tokenService';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if(token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(resp => resp, async error => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // try refresh
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return Promise.reject(error);
    try {
      const resp = await axios.post('/api/auth/refresh', { refreshToken });
      setTokens({ accessToken: resp.data.accessToken, refreshToken });
      originalRequest.headers['Authorization'] = 'Bearer ' + resp.data.accessToken;
      return api(originalRequest);
    } catch(e){
      // redirect to login
      window.location = '/login';
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
});

export default api;
