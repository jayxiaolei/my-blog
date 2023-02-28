import axios from './request'

export const getUserList = () => axios.get('/my/users');

export const delUser = (params) => axios.post('/my/deluser', params);
