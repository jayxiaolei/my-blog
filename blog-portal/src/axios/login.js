import axios from './request'

export const loginUser = (params) => axios.post('/api/login', params);