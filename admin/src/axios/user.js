import axios from './request'

export const getUserList = () => axios.get('/api/users');

export const delUser = (params) => axios.post('/api/deluser', params);
