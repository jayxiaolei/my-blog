import axios from './request';

export const loginUser = (params) => axios.post('/api/blog/login', params);

export const regUser = (params) => axios.post('/api/blog/reguser', params);
