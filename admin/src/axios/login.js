import axios from './request'

export const loginUser = (params) => axios.post('/api/login', params);

export const regUser = (params) => axios.post('/api/reguser', params);
