import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:1231' : 'http://101.200.152.251:1231',
    timeout: 5000,
});

service.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('x-token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('x-token');
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject();
    },
);

service.interceptors.response.use(
    (response) => {
        if (response.status === 200 && response.data.status === 200) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject();
    },
);

export default service;
