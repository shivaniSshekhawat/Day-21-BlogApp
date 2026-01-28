import axios from 'axios';

const api = axios.create({
  baseURL: 'https://day-21-blog-app-qw1l.vercel.app/api',
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
